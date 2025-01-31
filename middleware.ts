import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;
  const path = request.nextUrl.pathname;

  // Allow logout without redirect
  if (path === "/api/logout") {
    return NextResponse.next();
  }

  // Jika mencoba akses halaman login tapi sudah login
  if (path.startsWith("/login")) {
    if (role) {
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
    return NextResponse.next();
  }

  // Proteksi halaman admin
  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Proteksi halaman kasir
  if (path.startsWith("/kasir") && role !== "kasir") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect root path ke login jika belum login
  if (path === "/" && !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

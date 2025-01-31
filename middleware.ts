// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;
  const path = request.nextUrl.pathname;

  // Redirect berdasarkan role
  if (path === "/") {
    if (role) {
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Proteksi route
  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/kasir") && role !== "kasir") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

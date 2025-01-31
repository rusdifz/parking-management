import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/auth/login", request.url));
  response.cookies.delete("role");
  return response;
}

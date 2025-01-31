import { NextResponse } from "next/server";
import { getUsers } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Validasi input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password harus diisi" },
        { status: 400 }
      );
    }

    const users = await getUsers();
    const user = users.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase().trim() &&
        u.password === password.trim()
    );

    if (!user) {
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      role: user.role,
    });

    response.cookies.set({
      name: "role",
      value: user.role,
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

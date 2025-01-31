"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Role = "admin" | "kasir" | null;

export async function login(role: Role) {
  const cookieStore = await cookies();
  cookieStore.set("role", role || "", {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  // Redirect berdasarkan role
  if (role === "admin") {
    redirect("/admin");
  } else if (role === "kasir") {
    redirect("/kasir");
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("role");
  redirect("/auth/login");
}

export async function getCurrentRole(): Promise<Role> {
  const cookieStore = cookies();
  return ((await cookieStore).get("role")?.value as Role) || null;
}

export async function protectRoute(allowedRoles: Role[]) {
  const role = await getCurrentRole();

  if (!role || !allowedRoles.includes(role)) {
    redirect("/auth/login");
  }
}

// Mock user database
export async function getUsers() {
  return [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "kasir", password: "kasir123", role: "kasir" },
  ];
}

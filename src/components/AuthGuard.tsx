"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentRole } from "@/lib/auth";

export default function AuthGuard({
  allowedRoles,
}: {
  allowedRoles: string[];
}) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const role = await getCurrentRole();

      // Jika belum login atau role tidak sesuai
      if (!role || !allowedRoles.includes(role)) {
        router.push("/auth/login");
      }
    };

    checkAuth();
  }, [allowedRoles, router]);

  return null;
}

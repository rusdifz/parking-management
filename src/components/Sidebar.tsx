"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gradient-to-b from-purple-600 to-blue-600 text-white min-h-screen p-4">
      <div className="mb-8 p-2">
        <h2 className="text-2xl font-bold">Parking System</h2>
        <p className="text-sm opacity-75">Admin Dashboard</p>
      </div>

      <nav className="space-y-1">
        <Link
          href="/admin"
          className={`flex items-center p-3 rounded-lg transition-colors ${
            pathname === "/admin"
              ? "bg-white text-purple-600"
              : "hover:bg-white/10"
          }`}
        >
          🚗 Daftar Kendaraan
        </Link>
      </nav>
    </div>
  );
}

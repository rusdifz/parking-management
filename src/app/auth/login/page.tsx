"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login gagal");
        return;
      }

      // Redirect langsung tanpa perlu reload
      if (data.role === "admin") {
        window.location.href = "/admin";
      } else if (data.role === "kasir") {
        window.location.href = "/kasir";
      }
    } catch (err) {
      setError("Tidak dapat terhubung ke server");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96 animate-slide-in"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🚗 Parking System
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center"
        >
          Login
        </button>
      </form>
    </div>
  );
}

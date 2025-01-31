import { ReactNode } from "react";

export default function KasirLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-600">
            Kasir Parking System
          </h1>
          <form action="/api/logout" method="post">
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

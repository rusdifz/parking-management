"use client";
import Sidebar from "@/components/Sidebar";
import AuthGuard from "@/components/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthGuard allowedRoles={["admin"]} />

      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 bg-gray-100">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-cyan-600">
                Admin Parking System
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
          {children}
        </main>
      </div>
    </>
  );
}

// "use client";
// import AuthGuard from "@/components/AuthGuard";
// import Sidebar from "@/components/Sidebar";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <AuthGuard allowedRoles={["admin"]} />
//       <div className="flex min-h-screen">
//         <Sidebar />
//         <main className="flex-1 bg-gray-100">{children}</main>
//       </div>
//     </>
//   );
// }

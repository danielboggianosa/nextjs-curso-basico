import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Dashboard",
  description: "Panel de control del usuario",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="bg-white dark:bg-gray-800 shadow">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/profile"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Perfil
                </Link>
              </li>
              <li>
                <button
                  className="text-red-600 hover:text-red-800 dark:hover:text-red-400 font-semibold"
                  type="button"
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
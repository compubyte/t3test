"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashBoard() {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <>
        <h1>DashBoard Page!</h1>
        <Link
          href="/api/auth/signout"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          Cerrar sesión
        </Link>
      </>
    </ProtectedRoute>
  );
}

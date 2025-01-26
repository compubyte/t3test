"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { LogOut, Shapes } from "lucide-react";
import { signOut } from "next-auth/react";

export default function DashBoard() {
  return (
    <>
      <div className="mb-72"></div>
      <Button
        asChild
        className="rounded-xl bg-gray-600 px-5 py-5 font-semibold no-underline transition hover:bg-gray-900"
      >
        <Link href="/dashboard/categorias">
          <span className="flex items-center space-x-2">
            <Shapes size={24} />
            <span>Categorías</span>
          </span>
        </Link>
      </Button>
      <Button
        asChild
        className="rounded-xl bg-gray-600 px-5 py-5 font-semibold no-underline transition hover:bg-gray-900"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <span className="flex items-center space-x-2">
          <LogOut size={24} />
          <span>Cerrar sesión</span>
        </span>
      </Button>
    </>
  );
}

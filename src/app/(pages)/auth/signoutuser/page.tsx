"use client";

import { signOut } from "next-auth/react";

export default function SignOutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">Has cerrado sesión</h1>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Volver al inicio
      </button>
    </div>
  );
}

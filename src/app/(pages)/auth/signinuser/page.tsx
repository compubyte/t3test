"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">Inicia sesión</h1>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      >
        Iniciar sesión con GitHub
      </button>
    </div>
  );
}

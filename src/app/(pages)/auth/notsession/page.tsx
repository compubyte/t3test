"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { useSession } from "next-auth/react";

export default function NotSession() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <ShieldAlert className="mx-auto h-24 w-24 text-red-500" />
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
            Acceso Restringido
          </h2>
          <p className="mt-2 text-sm font-semibold text-gray-600">
            No tienes autorización para acceder a esta página.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          {/* <Button asChild> */}
          {/* <Link
            href="/"
            className="rounded-full bg-blue-300 px-10 py-3 font-semibold no-underline transition hover:bg-blue-500"
          >
            Volver a la página de inicio
          </Link> */}
          {/* </Button> */}

          <div className="flex space-x-4">
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-blue-200 px-10 py-3 font-semibold no-underline transition hover:bg-blue-300"
            >
              {session ? "Volver al dashboard" : "Ir al inicio"}
            </Link>
            {/* {session?.user && (
              <Link
                href="/dashboard"
                className="rounded-full bg-violet-200 px-10 py-3 font-semibold no-underline transition hover:bg-violet-300"
              >
                Volver al dashboard
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

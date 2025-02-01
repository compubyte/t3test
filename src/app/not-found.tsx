"use client"; // Asegúrate de marcar este componente como del lado del cliente

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloudOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react"; // Importa useSession

export default function Custom404() {
  const { data: session, status } = useSession(); // Obtén la sesión y su estado

  // Define la ruta a la que redirigir
  const redirectPath = session ? "/dashboard" : "/";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 text-center sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              <CloudOff className="mx-auto mb-2 h-16 w-16" />
              Error 404
            </CardTitle>
            <CardDescription>
              ¡Oops! La página que busca no existe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <Button asChild>
                <Link href={redirectPath}>Aceptar</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

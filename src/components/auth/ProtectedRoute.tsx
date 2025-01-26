"use client"; // Asegúrate de marcar este componente como del lado del cliente

import { LoadingSpinner } from "@/app/_components/_generics/LoadingSpinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Espera a que la sesión se cargue
    if (!session) {
      router.push("/auth/notsession"); // Redirige a la página de inicio si no hay sesión
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <LoadingSpinner />; // Muestra un mensaje de carga mientras se verifica la sesión
  }

  if (!session) {
    return null; // No renderiza nada si no hay sesión (ya que se redirige)
  }

  return <>{children}</>; // Renderiza el contenido protegido si hay sesión
}

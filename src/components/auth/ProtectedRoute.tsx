"use client"; // Asegúrate de marcar este componente como del lado del cliente

import { LoadingSpinner } from "@/app/_components/_generics/LoadingSpinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Estado adicional para controlar la verificación

  useEffect(() => {
    if (status === "loading") return; // Espera a que la sesión se cargue

    if (status === "unauthenticated" || !session) {
      router.push("/auth/notsession"); // Redirige si no hay sesión
    } else {
      setIsCheckingAuth(false); // Finaliza la verificación si hay sesión
    }
  }, [session, status, router]);

  // Muestra un spinner mientras se verifica la autenticación
  if (status === "loading" || isCheckingAuth) {
    return <LoadingSpinner />;
  }

  // No renderiza nada si no hay sesión (ya que se redirige)
  if (!session) {
    return null;
  }

  // Renderiza el contenido protegido si hay sesión
  return <>{children}</>;
}

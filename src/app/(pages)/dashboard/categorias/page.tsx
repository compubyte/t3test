"use client";
export const dynamic = "force-dynamic";

import { ListadoCategorias } from "@/app/_components/categorias/ListadoCategorias";
import ErrorBoundary from "@/app/_components/ErrorBoundary";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Categorias() {
  return (
    <>
      <h1>CATEGORIAS PAGE</h1>
      <Button>Volver</Button>

      {/* Envuelve ListadoCategorias en Error Boundary y Suspense */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <ListadoCategorias />
        </Suspense>
      </ErrorBoundary>

      <Button asChild>
        <Link href="/dashboard">Volver</Link>
      </Button>
    </>
  );
}

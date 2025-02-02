"use client";

import { RowClickProvider } from "@/app/_components/_generics/RowClickProvider";
import ListadoCategorias from "@/app/_components/categorias/ListadoCategorias";
import ErrorBoundary from "@/app/_components/ErrorBoundary";
import { LoadingSpinner } from "@/app/_components/_generics/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Suspense, useEffect, useState } from "react";
import WindowTitleBar from "@/app/_components/_generics/WindowsTitleBar";

export default function Categorias() {
  const [listaCategorias, { refetch }] =
    api.categorias.getList.useSuspenseQuery();

  useEffect(() => {
    console.log("listaCategorias", listaCategorias);
  }, [listaCategorias]);

  // Función para recargar los datos
  const handleRecargarLista = async () => {
    await refetch(); // Recarga los datos usando refetch
  };

  return (
    <>
      {/* Envuelve TablaCategorias en Error Boundary y Suspense */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <RowClickProvider>
            <div className="temas mb-4 flex items-center justify-normal space-x-4">
              <div className="temas-contenedor m-auto w-10/12 rounded border-2 p-4 shadow">
                <WindowTitleBar title="Manejo de categorías" />
                <ListadoCategorias listaCategorias={listaCategorias} />
              </div>
            </div>
          </RowClickProvider>
        </Suspense>
      </ErrorBoundary>

      {/* Butones */}

      <Button onClick={handleRecargarLista}>Recargar datos</Button>
    </>
  );
}

// import { api } from "@/trpc/react";
// import TablaCategorias from "./TablaCategorias";
// import { RowClickProvider } from "./RowClickProvider";

// export function ListadoCategorias() {
//   return (

//   );
// }

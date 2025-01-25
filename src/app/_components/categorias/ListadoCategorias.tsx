"use client";

import { api } from "@/trpc/react";
import TablaCategorias from "./TablaCategorias";
import { RowClickProvider } from "./RowClickProvider";

export function ListadoCategorias() {
  const [listaCategorias] = api.categorias.getList.useSuspenseQuery();

  return (
    <div className="mb-4 flex items-center justify-normal space-x-4">
      <div className="m-auto w-10/12 rounded border-2 bg-white p-4 shadow">
        <RowClickProvider>
          <TablaCategorias listaCategorias={listaCategorias} />
        </RowClickProvider>
      </div>
    </div>
  );
}

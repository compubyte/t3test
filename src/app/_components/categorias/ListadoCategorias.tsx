"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import TablaCategorias from "./TablaCategorias";

export function ListadoCategorias() {
  const [listaCategorias] = api.categorias.getList.useSuspenseQuery();
  // Estado para la fila seleccionada
  const [selectedRow, setSelectedRow] = useState(0);

  // Seleccionar
  const handleRowClick = (id: number) => {
    setSelectedRow(id); // Actualiza el estado de la fila seleccionada
  };

  return (
    <div className="mb-4 flex items-center justify-normal space-x-4">
      <div className="m-auto w-10/12 rounded border-2 bg-white p-4 shadow">
        <TablaCategorias
          listaCategorias={listaCategorias}
          selectedRow={selectedRow}
          handleRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}

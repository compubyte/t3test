"use client";

import { createContext, useContext, useState } from "react";
import { api } from "@/trpc/react"; // Importa la API tRPC
import type { categoriaFullSchema } from "@/server/models/modelos";
import type { z } from "zod";

// ********** Tipos **********
type objCategoria = z.infer<typeof categoriaFullSchema>;

// ********** Contexto **********
interface CategoriasContextProps {
  listaCategorias: objCategoria[];
  selectedCategoria: objCategoria | null;
  setSelectedCategoria: (category: objCategoria | null) => void;
  refetchCategorias: () => void | Promise<void>;
}

const CategoriasContext = createContext<CategoriasContextProps | undefined>(
  undefined,
);

export function UsuariosProvider({ children }: { children: React.ReactNode }) {
  const [listaCategorias, { refetch }] =
    api.categorias.getList.useSuspenseQuery();

  const [selectedCategoria, setSelectedCategoria] =
    useState<objCategoria | null>(null);

  const refetchCategorias = async () => {
    await refetch();
  };

  return (
    <CategoriasContext.Provider
      value={{
        listaCategorias: listaCategorias ?? [],
        selectedCategoria,
        setSelectedCategoria,
        refetchCategorias,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
}

export function useCategoriaContext() {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error(
      "useCategoriasContext debe usarse dentro de un CategoriasProvider",
    );
  }
  return context;
}

"use client";

import { createContext, useContext, useState } from "react";
import { api } from "@/trpc/react"; // Importa la API tRPC
import type { Categoria } from "@/server/models/modelos";

interface CategoriasContextProps {
  listaCategorias: Categoria[];
  selectedCategoria: Categoria | null;
  setSelectedCategoria: (category: Categoria | null) => void;
  refetchCategorias: () => void;
}

const CategoriasContext = createContext<CategoriasContextProps | undefined>(
  undefined,
);

export function CategoriasProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [listaCategorias, { refetch }] =
    api.categorias.getList.useSuspenseQuery();

  // const {
  //   data: listaCategorias,
  //   refetch,
  //   isLoading,
  //   error,
  // } = api.categorias.getList.useQuery();

  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(
    null,
  );

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

export function useCategoryContext() {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error(
      "useCategoriasContext debe usarse dentro de un CategoriasProvider",
    );
  }
  return context;
}

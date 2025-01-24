"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function ListadoCategorias() {
  const [listaCategorias] = api.categorias.getList.useSuspenseQuery();
  // Estado para la fila seleccionada
  const [selectedRow, setSelectedRow] = useState(0);
  // Filtro
  const [filtro, setFiltro] = useState<string>("");
  const [patternFiltro, setPatternFiltro] = useState<string>("");

  // Seleccionar
  const handleRowClick = (id: number) => {
    setSelectedRow(id); // Actualiza el estado de la fila seleccionada
  };

  //Limpiar filtro
  const handleClearFilter = async () => {
    setFiltro("");
    setPatternFiltro("");
  };

  //Filtrar
  const handleFilter = async () => {
    setPatternFiltro(filtro);
  };

  const utils = api.useUtils();
  const [name, setName] = useState("");
  // const createPost = api.post.create.useMutation({
  //   onSuccess: async () => {
  //     await utils.post.invalidate();
  //     setName("");
  //   },
  // });

  return (
    <div className="w-10/12 p-4">
      <div>{selectedRow}</div>
      <div className="mb-4 flex items-center justify-normal space-x-4">
        <div className="mb-4">
          <label className="block font-medium">Filtro</label>
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>
        <button
          type="button"
          onClick={handleClearFilter}
          className="rounded bg-cyan-500 px-4 py-2 text-white"
        >
          Limpiar
        </button>
        <button
          type="button"
          onClick={handleFilter}
          className="rounded bg-purple-500 px-4 py-2 text-white"
        >
          Filtrar
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
              Id
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">
              Nombre
            </th>
          </tr>
        </thead>
        <tbody>
          {listaCategorias && listaCategorias.length > 0 ? (
            listaCategorias.map((item) => (
              <tr
                key={item.id}
                className={`cursor-pointer ${selectedRow === item.id ? "bg-blue-100" : ""}`}
                //className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(item.id)}
              >
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {item.id}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {item.nombre}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="py-4 text-center">
                No se encontraron datos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

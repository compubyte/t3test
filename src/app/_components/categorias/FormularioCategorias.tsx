"use client";

import { useState } from "react";
//import { api } from "@/trpc/react";

export function FormularioCategorias() {
  const [id, setId] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");

  //Eliminar
  const handleDelete = async () => {
    if (id === 0) {
      alert("Por favor, selecciona un item a eliminar.");
      return;
    }
    const confirmed = confirm(`¿Seguro que desea eliminar el Id ${id}?`);
    if (!confirmed) return;
    try {
      //await deleteMutation.mutateAsync({ id: id }); // Llamada al procedimiento `delete`
      setId(0); // Reinicia el estado del cliente seleccionado
      setNombre("");
    } catch (error) {
      alert("Hubo un error al eliminar. Por favor, intente nuevamente.");
      console.error(error);
    }
  };

  // Guardar
  const handleSave = async () => {
    try {
      if (!nombre) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      if (id === 0) {
        const confirmed = confirm(
          `¿Estás seguro de que deseas guardar el nuevo cliente?`,
        );
        if (!confirmed) return;
      } else {
        const confirmed = confirm(
          `¿Estás seguro de que deseas actualizar el cliente con Id ${id}?`,
        );
        if (!confirmed) return;
      }
      /* await saveMutation.mutateAsync({
        id,
        nombre,
      }); */
      //await handleClear; // Reinicia el estado del cliente seleccionado
    } catch (error) {
      alert("Error al guardar el cliente. Intenta nuevamente.");
      console.error(error);
    }
  };

  //Limpiar
  const handleClear = async () => {
    setId(0);
    setNombre("");
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="block font-medium">Id</label>
        <input
          type="number"
          value={id || ""}
          onChange={(e) => setId(Number(e.target.value))}
          className="w-full rounded border p-2"
          disabled
        />
      </div>
      <div>
        <label className="block font-medium">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleSave}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          Eliminar
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="rounded bg-orange-500 px-4 py-2 text-white"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}

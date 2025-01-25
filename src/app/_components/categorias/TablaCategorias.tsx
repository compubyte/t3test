"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import Paginacion from "../Paginacion";

interface Categoria {
  id: number;
  nombre: string;
}

interface TablaCategoriasProps {
  listaCategorias: Categoria[];
  selectedRow: number | null;
  handleRowClick: (id: number) => void;
}

export default function TablaCategorias({
  listaCategorias,
  selectedRow,
  handleRowClick,
}: TablaCategoriasProps) {
  const [filteredCategorias, setFilteredCategorias] =
    useState<Categoria[]>(listaCategorias);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const filtered = listaCategorias.filter((categoria) =>
      categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCategorias(filtered);
    setCurrentPage(1);
    handleRowClick(0); // Para borrar selección de fila de grilla
  }, [searchTerm, listaCategorias]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategorias.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Aquí deberías cargar los datos para la nueva página
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    // Aquí deberías recargar los datos con el nuevo número de elementos por página
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <p>{selectedRow}</p>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Nombre</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <TableRow
                  key={item.id}
                  className={`cursor-pointer ${selectedRow === item.id ? "bg-muted" : ""}`}
                  onClick={() => handleRowClick(item.id)}
                >
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.nombre}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
                  No se encontraron datos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Paginacion
        totalItems={filteredCategorias.length}
        initialItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        handleRowClick={handleRowClick}
      />
    </div>
  );
}

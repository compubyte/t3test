"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowUpZA, FilterX, ListOrdered } from "lucide-react";
import { Card } from "@/components/ui/card";
import Paginator from "../_generics/Paginator";
import ActionsCard from "../_generics/ActionsCard";
import { useCategoryContext } from "@/app/(contexts)/CategoriasContext";
import type { Categoria } from "@/server/models/modelos";
// import { useSession } from "next-auth/react";
// import { LoadingSpinner } from "../_generics/LoadingSpinner";

interface Column {
  key: "id" | "nombre";
  label: string;
}

const columns: Column[] = [
  { key: "id", label: "Id" },
  { key: "nombre", label: "Nombre" },
];

export default function ListadoCategorias() {
  //const { data: session, status } = useSession(); // Se usa aquí o no ????????
  const { listaCategorias, setSelectedCategoria, selectedCategoria } =
    useCategoryContext();
  const [filteredData, setFilteredData] = useState(listaCategorias);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>();
  const [sortDirection, setSortDirection] = useState<string | null>();

  //if (status === "loading") return <LoadingSpinner />;

  const handleRowClick = (item: Categoria | null) => {
    // Elegirlo 2 veces anula selección
    setSelectedCategoria(selectedCategoria?.id === item?.id ? null : item);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setFilter(value);
    const filtered = listaCategorias.filter(
      (item) =>
        item.id.toString().includes(value) ||
        item.nombre.toUpperCase().includes(value),
    );
    setFilteredData(filtered);
    setCurrentPage(1);
    setSelectedCategoria(null);
  };

  const handleSort = (columnKey: keyof Categoria) => {
    if (sortColumn === columnKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
    setSelectedCategoria(null);
  };

  const sortedData = (sortColumn as keyof Categoria)
    ? [...filteredData].sort((a, b) => {
        if (sortDirection === "asc") {
          return a[sortColumn as keyof Categoria] >
            b[sortColumn as keyof Categoria]
            ? 1
            : -1;
        } else {
          return a[sortColumn as keyof Categoria] <
            b[sortColumn as keyof Categoria]
            ? 1
            : -1;
        }
      })
    : filteredData;

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedCategoria(null);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    setSelectedCategoria(null);
  };

  const handleClearFilter = () => {
    if (filter.length > 0) {
      setFilter("");
      setFilteredData(listaCategorias);
      setCurrentPage(1);
      setSelectedCategoria(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex w-full items-center">
        <Card className="temas-contenedor ml-auto flex w-full flex-wrap items-center gap-2 p-3 shadow-lg">
          Id seleccionado: {selectedCategoria?.id} - {selectedCategoria?.nombre}
          {/* Componente ActionsCard */}
          <ActionsCard selectedRow={selectedCategoria?.id ?? null} />
          <div className="flex w-full min-w-[50%] items-center gap-2">
            <Input
              placeholder="Filtrar categorías..."
              value={filter}
              onChange={handleFilter}
              className="max-w-lg flex-1"
            />
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleClearFilter}
            >
              <FilterX className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
      <div className="min-h-96">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead
                    key={column.key}
                    className={`text-base font-semibold ${index === 0 ? "w-28" : ""}`}
                  >
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => handleSort(column.key)}
                    >
                      <span>{column.label}</span>
                      {sortColumn === column.key ? (
                        sortDirection === "asc" ? (
                          <ArrowDownAZ className="h-4 w-4" />
                        ) : (
                          <ArrowUpZA className="h-4 w-4" />
                        )
                      ) : (
                        <ListOrdered className="h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow
                  key={item.id}
                  //className={`cursor-pointer ${selectedRow === item.id ? "bg-muted" : ""} text-base`}
                  className={`cursor-pointer ${selectedCategoria?.id === item.id ? "bg-muted" : ""} text-base`}
                  onClick={() => handleRowClick(item)}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nombre}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Componente Paginator */}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        totalItems={filteredData.length}
      />
    </div>
  );
}

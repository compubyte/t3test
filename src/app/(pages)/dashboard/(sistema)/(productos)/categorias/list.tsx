"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import Paginator from "@/app/_components/_generics/Paginator";
import { useCategoriaContext } from "@/app/(pages)/dashboard/(sistema)/(productos)/categorias/context";
import type { Categoria } from "@/server/models/modelos";
import ActionsCrud from "@/app/_components/_generics/ActionsCrud";
import FormCrudCategorias from "@/app/(pages)/dashboard/(sistema)/(productos)/categorias/crud";
import { CustomToasterValidation } from "@/app/_components/_generics/CustomToaster";

interface Column {
  key: "id" | "nombre";
  label: string;
}

const columns: Column[] = [
  { key: "id", label: "Id" },
  { key: "nombre", label: "Nombre" },
];

export default function ListadoCategorias() {
  const {
    listaCategorias,
    setSelectedCategoria,
    selectedCategoria,
    refetchCategorias,
  } = useCategoriaContext();
  const [filteredData, setFilteredData] = useState(listaCategorias);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>();
  const [sortDirection, setSortDirection] = useState<string | null>();
  // para el Dialog
  const [dialogCrudOpen, setDialogCrudOpen] = useState(false);
  const [dialogCrudMode, setDialogCrudMode] = useState<
    "agregar" | "editar" | "detalle" | "eliminar" | "recargar"
  >("agregar");
  const inputRef = useRef<HTMLInputElement>(null); // Referencia al input

  // Manejo de mayúsculas en Inputs. Guarda posición del cursor
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.target;
    // Guarda la posición del cursor antes de actualizar el valor
    const cursorPosition = selectionStart;
    // Convierte el texto a mayúsculas
    const nuevoValor = value.toUpperCase();
    // Veo a que input aplicar
    if (e.target.name === "filtro") {
      setFilter(nuevoValor);
    }
    // Restaura la posición del cursor después de actualizar el valor
    if (inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current!.setSelectionRange(cursorPosition, cursorPosition);
      });
    }
  };

  // Definir filtrar con useCallback
  const filtrar = useCallback(() => {
    const filtered = listaCategorias.filter(
      (item) =>
        item.id.toString().includes(filter) ||
        item.nombre.toUpperCase().includes(filter),
    );
    setFilteredData(filtered);
    setCurrentPage(1);
    setSelectedCategoria(null);
  }, [filter]); // Dependencias de filtrar

  useEffect(() => {
    setFilteredData(listaCategorias);
  }, [listaCategorias]);

  useEffect(() => {
    filtrar();
  }, [filter, filtrar]);

  const handleAction = async (
    mode: "agregar" | "editar" | "detalle" | "eliminar" | "recargar",
  ) => {
    // Validación inicial
    if (
      !selectedCategoria &&
      (mode === "editar" || mode === "detalle" || mode === "eliminar")
    ) {
      CustomToasterValidation(
        "No ha seleccionado ningún elemento de la lista.",
      );
      return;
    }

    // Actualización del estado según el modo
    switch (mode) {
      case "agregar":
        handleRowClick(null); // Deseleccionar categoría
        setSelectedCategoria(null);
        setDialogCrudMode(mode);
        setDialogCrudOpen(true);
        break;

      case "editar":
      case "detalle":
      case "eliminar":
        setDialogCrudMode(mode);
        setDialogCrudOpen(true);
        break;

      case "recargar":
        handleRowClick(null); // Deseleccionar categoría
        setSelectedCategoria(null);
        await refetchCategorias(); // Esperar a que se complete la recarga
        break;

      default:
        break;
    }
  };

  //if (status === "loading") return <LoadingSpinner />;

  const handleRowClick = (item: Categoria | null) => {
    // Elegirlo 2 veces anula la selección
    setSelectedCategoria(selectedCategoria?.id === item?.id ? null : item);
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
      // filtrar();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex w-full items-center">
        <Card className="temas-contenedor ml-auto flex w-full flex-wrap items-center gap-2 p-3 shadow-lg">
          {/* Componente ActionsCard */}
          <ActionsCrud
            selectedRow={selectedCategoria?.id ?? null}
            onAction={handleAction}
          />
          <div className="flex w-full min-w-[50%] items-center gap-2">
            <Input
              name="filtro"
              placeholder="Filtrar categorías..."
              value={filter}
              onChange={handleChangeInput}
              //onChange={handleFilter}
              className="max-w-lg flex-1"
              ref={inputRef}
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

      {/* Dialog para agregar, editar, ver, eliminar o recargar categorías */}
      <FormCrudCategorias
        isOpen={dialogCrudOpen}
        onClose={() => setDialogCrudOpen(false)}
        mode={dialogCrudMode}
        //categoria={selectedCategoria}
      />
    </div>
  );
}

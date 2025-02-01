// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import Paginacion from "../_generics/Paginacion";
// import { useRowClick } from "../_generics/RowClickProvider";
// import ActionCard from "../_generics/ActionCard";
// import { Card } from "@/components/ui/card";

// interface Categoria {
//   id: number;
//   nombre: string;
// }

// interface TablaCategoriasProps {
//   listaCategorias: Categoria[];
// }

// export default function TablaCategorias({
//   listaCategorias,
// }: TablaCategoriasProps) {
//   const [filteredCategorias, setFilteredCategorias] =
//     useState<Categoria[]>(listaCategorias);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const { handleRowClick, selectedRow } = useRowClick();

//   useEffect(() => {
//     const filtered = listaCategorias.filter((categoria) =>
//       categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
//     );
//     setFilteredCategorias(filtered);
//     setCurrentPage(1);
//     handleRowClick(0);
//   }, [searchTerm, listaCategorias]);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredCategorias.slice(
//     indexOfFirstItem,
//     indexOfLastItem,
//   );

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     // Aquí deberías cargar los datos para la nueva página
//   };

//   const handleItemsPerPageChange = (newItemsPerPage: number) => {
//     setItemsPerPage(newItemsPerPage);
//     // Aquí deberías recargar los datos con el nuevo número de elementos por página
//   };

//   return (
//     <div className="space-y-2">
//       <div className="flex w-full items-center">
//         <Card className="ml-auto flex w-full flex-wrap items-center gap-2 p-3 shadow-lg">
//           <ActionCard />
//           <Input
//             type="text"
//             placeholder="Buscar..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="max-w-lg"
//           />
//         </Card>
//       </div>
//       <p>{selectedRow}</p>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[100px]">Id</TableHead>
//               <TableHead>Nombre</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentItems.length > 0 ? (
//               currentItems.map((item) => (
//                 <TableRow
//                   key={item.id}
//                   className={`cursor-pointer ${selectedRow === item.id ? "bg-muted" : ""}`}
//                   onClick={() => handleRowClick(item.id)}
//                 >
//                   <TableCell className="font-medium">{item.id}</TableCell>
//                   <TableCell>{item.nombre}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={2} className="h-24 text-center">
//                   No se encontraron datos.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <Paginacion
//         totalItems={filteredCategorias.length}
//         initialItemsPerPage={itemsPerPage}
//         onPageChange={handlePageChange}
//         onItemsPerPageChange={handleItemsPerPageChange}
//       />
//     </div>
//   );
// }

"use client";

import type React from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDownAZ,
  ArrowUpZA,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  FilterX,
  ListOrdered,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import ActionCard from "../_generics/ActionCard";
import Paginacion from "../_generics/Paginacion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Categoria {
  id: number;
  nombre: string;
}

interface TablaCategoriasProps {
  listaCategorias: Categoria[];
}

type SortDirection = "asc" | "desc" | null;

interface Column {
  key: "id" | "nombre";
  label: string;
}

const columns: Column[] = [
  { key: "id", label: "Id" },
  { key: "nombre", label: "Nombre" },
];

export default function TablaCategorias({
  listaCategorias,
}: TablaCategoriasProps) {
  const [data, setData] = useState(listaCategorias);
  const [filteredData, setFilteredData] = useState(listaCategorias);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");
  // const [sortColumn, setSortColumn] = useState<"id" | "nombre">("id");
  // const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [sortColumn, setSortColumn] = useState<string | null>();
  const [sortDirection, setSortDirection] = useState<string | null>();
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      // Always show first page
      pageNumbers.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );
      // Show ellipsis if necessary
      if (currentPage > 3) {
        pageNumbers.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
      // Show current page and surrounding pages
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
      // Show ellipsis if necessary
      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
      // Always show last page
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    // Sin resultados en la lista
    if (filteredData.length == 0) {
      pageNumbers.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => handlePageChange(1)} isActive={true}>
            {1}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return pageNumbers;
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = data.filter(
      (item) =>
        item.id.toString().includes(value) ||
        item.nombre.toLowerCase().includes(value),
    );
    setFilteredData(filtered);
    setCurrentPage(1);
    setSelectedRow(0);
  };

  // const handleSort = (column: "id" | "nombre") => {
  //   if (sortColumn === column) {
  //     setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortColumn(column);
  //     setSortDirection("asc");
  //   }
  // };

  const handleSort = (columnKey: keyof Categoria) => {
    if (sortColumn === columnKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        // Al presionar por tercera vez, se limpia la ordenación
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  // const sortedData = [...filteredData].sort((a, b) => {
  //   if (sortDirection === "asc") {
  //     return a[sortColumn] > b[sortColumn] ? 1 : -1;
  //   } else {
  //     return a[sortColumn] < b[sortColumn] ? 1 : -1;
  //   }
  // });

  // Ordenar datos solo si hay una columna seleccionada
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
    : filteredData; // Si no hay ordenación, se usa el estado original

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleRowClick = (id: number) => {
    setSelectedRow(id === selectedRow ? null : id);
  };

  const handleClearFilter = () => {
    if (filter.length > 0) {
      setFilter("");
      setFilteredData(listaCategorias);
      setCurrentPage(1);
      setSelectedRow(0);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex w-full items-center">
        <Card className="temas-contenedor ml-auto flex w-full flex-wrap items-center gap-2 p-3 shadow-lg">
          <ActionCard />
          <div>
            <Input
              placeholder="Filtrar categorías..."
              value={filter}
              onChange={handleFilter}
              className="temas max-w-lg"
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
        {/* alto mínimo tablas de datos - Paginador abajo */}
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
                  className={`cursor-pointer ${selectedRow === item.id ? "bg-muted" : ""} text-base`}
                  onClick={() => handleRowClick(item.id)}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nombre}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* PAGINADOR */}

      {/* <div className="flex items-center justify-between"> */}
      <div className="flex w-full flex-col sm:flex-row sm:space-x-0 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Items:{" "}
            {filteredData.length == 0 ? "Sin resultados" : filteredData.length}
          </span>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-center space-x-1">
            <Pagination>
              <PaginationContent>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mr-2"
                >
                  Anterior
                </Button>
                {renderPageNumbers()}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages == 0}
                  className="ml-2"
                >
                  Siguiente
                </Button>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Página: {currentPage} de {totalPages == 0 ? 1 : totalPages}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {pageSize} por página
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[5, 10, 20, 50, 100].map((size) => (
                <DropdownMenuItem
                  key={size}
                  onSelect={() => handlePageSizeChange(size)}
                >
                  {size} por página
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* FIN PAGINADOR */}
      {selectedRow && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Id seleccionado: {selectedRow}
          </p>
          {/* Aquí puedes agregar botones o acciones adicionales basadas en la fila seleccionada */}
        </div>
      )}
    </div>
  );
}

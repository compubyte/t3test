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

interface Model {
  id: number;
  nombre: string;
}

interface TablaCategoriasProps {
  listaCategorias: Model[];
}

interface Column {
  key: "id" | "nombre";
  label: string;
}

const columns: Column[] = [
  { key: "id", label: "Id" },
  { key: "nombre", label: "Nombre" },
];

export default function ListadoCategorias({
  listaCategorias,
}: TablaCategoriasProps) {
  const [filteredData, setFilteredData] = useState(listaCategorias);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>();
  const [sortDirection, setSortDirection] = useState<string | null>();
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleSelectedRowChange = (id: number | null) => {
    setSelectedRow(id);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = listaCategorias.filter(
      (item) =>
        item.id.toString().includes(value) ||
        item.nombre.toLowerCase().includes(value),
    );
    setFilteredData(filtered);
    setCurrentPage(1);
    setSelectedRow(0);
  };

  const handleSort = (columnKey: keyof Model) => {
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
  };

  const sortedData = (sortColumn as keyof Model)
    ? [...filteredData].sort((a, b) => {
        if (sortDirection === "asc") {
          return a[sortColumn as keyof Model] > b[sortColumn as keyof Model]
            ? 1
            : -1;
        } else {
          return a[sortColumn as keyof Model] < b[sortColumn as keyof Model]
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
          Id seleccionado: {selectedRow}
          {/* Componente ActionsCard */}
          <ActionsCard
            selectedRow={selectedRow}
            onSelectedRowChange={handleSelectedRowChange}
          />
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

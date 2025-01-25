"use client";

import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginacionProps {
  totalItems: number;
  initialItemsPerPage?: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  handleRowClick: (id: number) => void;
}

export default function Paginacion({
  totalItems,
  initialItemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  handleRowClick,
}: PaginacionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalItems / itemsPerPage),
  );

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
    handleRowClick(0); // Para borrar selección de fila de grilla
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = Number.parseInt(value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
    onItemsPerPageChange(newItemsPerPage);
    handleRowClick(0); // Para borrar selección de fila de grilla
  };

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
    return pageNumbers;
  };

  return (
    <div className="flex w-full flex-col sm:flex-row sm:space-x-0 sm:space-y-0">
      {/* Select ItemsPerPage */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-center space-x-1">
          <span className="text-sm text-muted-foreground">
            Filas por página:
          </span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder={itemsPerPage} />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50, 100].map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-center space-x-1">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {renderPageNumbers()}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      {/* Page number of */}
      <div className="flex-1 p-4">
        <div className="flex flex-col items-center space-y-1">
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </span>
          <span className="text-sm text-muted-foreground">
            Elementos: {totalItems}
          </span>
        </div>
      </div>
    </div>
  );
}

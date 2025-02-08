"use client"; // Asegúrate de que este componente sea del lado del cliente

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Edit,
  Trash2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  SquareChartGantt,
} from "lucide-react";

type Operacion = "agregar" | "editar" | "detalle" | "eliminar" | "recargar";

interface ActionsCrudProps {
  selectedRow: number | null;
  onAction: (operation: Operacion) => void;
}

export default function ActionsCrud({ onAction }: ActionsCrudProps) {
  const [isOpenAcordeon, setIsOpenAcordeon] = useState(false);

  // Función para alternar el acordeón
  const toggleAcordeon = () => {
    setIsOpenAcordeon(!isOpenAcordeon);
  };

  const handleOptionClick = (operacion: Operacion) => {
    onAction(operacion as Operacion);
    if (isOpenAcordeon) {
      setIsOpenAcordeon(false); // Cierra el acordeón al hacer clic en una opción
    }
  };

  return (
    <div className="ml-auto flex w-full flex-col items-start justify-center gap-1 tam-700:flex-row">
      {/* Botón para alternar el acordeón en pantallas pequeñas */}
      <Button
        variant="outline"
        onClick={toggleAcordeon}
        className="flex items-center gap-2 tam-700:hidden"
      >
        {isOpenAcordeon ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
        Acciones
      </Button>

      {/* Grupo de botones */}
      <div
        className={`${isOpenAcordeon ? "flex" : "hidden"} w-auto flex-col gap-1 tam-700:flex tam-700:w-auto tam-700:flex-row`}
      >
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => handleOptionClick("agregar")}
        >
          <PlusCircle className="h-4 w-4" />
          Agregar
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => handleOptionClick("editar")}
        >
          <Edit className="h-4 w-4" />
          Editar
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => handleOptionClick("detalle")}
        >
          <SquareChartGantt className="h-4 w-4" />
          Detalle
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => handleOptionClick("eliminar")}
        >
          <Trash2 className="h-4 w-4" />
          Eliminar
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => handleOptionClick("recargar")}
        >
          <RefreshCw className="h-4 w-4" />
          Recargar
        </Button>
      </div>
    </div>
  );
}

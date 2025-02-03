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
import CustomAlertDialog from "./CustomAlertDialog";

interface ActionsCardProps {
  selectedRow: number | null;
}

export default function BotonesAcordeon({ selectedRow }: ActionsCardProps) {
  // Estado para controlar si el acordeón está abierto
  const [isOpen, setIsOpen] = useState(false);
  // Alerts Dialogs
  const [isDialogNoIdSelected, setIsDialogNoIdSelected] = useState(false);

  const handleConfirmDialogNoIdSelected = () => {
    setIsDialogNoIdSelected(false); // Cierra el diálogo
  };

  // Función para alternar el acordeón
  const toggleAcordeon = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (operacion: string) => {
    // Ver si tengo un Row Seleccionado según la acción que quiera hacer **********
    switch (operacion) {
      case "Agregar":
        console.log("Opción seleccionada: Agregar");
        break;
      case "Editar":
        console.log("Opción seleccionada: Editar");
        break;
      case "Detalle":
        console.log("Opción seleccionada: Detalle");
        break;
      case "Eliminar":
        console.log("Opción seleccionada: Eliminar");
        if (!selectedRow) {
          setIsDialogNoIdSelected(true);
        } else {
          console.log("ELIMINO ???");
        }
        break;
      case "Recargar":
        console.log("Opción seleccionada: Recargar");
        break;
      default:
        console.log("Opción no reconocida");
        break;
    }
    setIsOpen(false); // Cierra el acordeón al hacer clic en una opción
  };

  return (
    <div className="ml-auto flex w-full flex-col items-start justify-center gap-1 tam-700:flex-row">
      {/* Botón para alternar el acordeón en pantallas pequeñas */}
      <Button
        variant="outline"
        onClick={toggleAcordeon}
        className="flex items-center gap-2 tam-700:hidden"
      >
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
        Acciones
      </Button>

      {/* Grupo de botones */}
      <div
        className={`${isOpen ? "flex" : "hidden"} w-auto flex-col gap-1 tam-700:flex tam-700:w-auto tam-700:flex-row`}
      >
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => handleOptionClick("Agregar")}
        >
          <PlusCircle className="h-4 w-4" />
          Agregar
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => handleOptionClick("Editar")}
        >
          <Edit className="h-4 w-4" />
          Editar
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => handleOptionClick("Detalle")}
        >
          <SquareChartGantt className="h-4 w-4" />
          Detalle
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => handleOptionClick("Eliminar")}
        >
          <Trash2 className="h-4 w-4" />
          Eliminar
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => handleOptionClick("Recargar")}
        >
          <RefreshCw className="h-4 w-4" />
          Recargar
        </Button>
      </div>

      {/* AlertDialog: elemento no seleccionado */}
      <CustomAlertDialog
        isOpen={isDialogNoIdSelected}
        onOpenChange={setIsDialogNoIdSelected}
        title="No ha seleccionado ningún elemento de la lista."
        description="Esta acción no puede procesarse sin seleccionar algún elemento."
        onConfirm={handleConfirmDialogNoIdSelected}
        //onCancel={handleCancelDialogAuthCredentials} // Pasa la función de cancelar
        confirmText="Aceptar"
        //cancelText="Cerrar" // Personaliza el texto del botón de cancelar
      />
    </div>
  );
}

"use client";

import { X } from "lucide-react"; // Importa el icono de cerrar (X) de Lucide
import CustomAlertDialog from "./CustomAlertDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface WindowsTitleBarProps {
  title: string;
}

export default function WindowTitleBar({ title }: WindowsTitleBarProps) {
  //const [isDialogVolverAlMenu, setIsDialogVolverAlMenu] = useState(false);

  const router = useRouter();

  // const handleConfirmDialogVolverAlMenu = () => {
  //   setIsDialogVolverAlMenu(false); // Cierra el diálogo
  //   router.push("/dashboard"); // Regresa al menú
  // };

  // const handleCancelDialogVolverAlMenu = () => {
  //   setIsDialogVolverAlMenu(false); // Cierra el diálogo
  // };

  return (
    <div className="temas -mt-1 mb-2 flex h-8 w-full border-spacing-1 items-center rounded-sm border border-gray-700 px-2 dark:border-gray-400">
      {/* Título de la página */}
      <div className="flex-1">
        <span className="text-lg font-bold">{title}</span>
      </div>

      {/* Botón de cerrar (X) */}
      <Button
        className="flex h-6 w-6 items-center justify-center rounded-sm bg-gray-500 hover:bg-red-400 hover:text-white"
        aria-label="Cerrar"
        onClick={() => router.push("/dashboard")}
        //onClick={() => setIsDialogVolverAlMenu(true)}
      >
        <X className="h-4 w-4" />
      </Button>

      {/* AlertDialog: Cerrar y volver al menú? */}
      {/* <CustomAlertDialog
        isOpen={isDialogVolverAlMenu}
        onOpenChange={setIsDialogVolverAlMenu}
        title="¿Salir la página actual?"
        description="Esta acción cierra la página actual y lo deja en el menú principal."
        onConfirm={handleConfirmDialogVolverAlMenu}
        onCancel={handleCancelDialogVolverAlMenu} // Pasa la función de cancelar
        confirmText="Si"
        cancelText="No" // Personaliza el texto del botón de cancelar
      /> */}
    </div>
  );
}

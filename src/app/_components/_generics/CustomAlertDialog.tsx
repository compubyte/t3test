"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CustomAlertDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string; // Título del diálogo
  description?: string; // Descripción del diálogo
  onCancel?: () => void; // Función que se ejecuta al cancelar (opcional)
  onConfirm: () => void; // Función que se ejecuta al confirmar
  confirmText?: string;
  cancelText?: string;
}

export default function CustomAlertDialog({
  isOpen,
  onOpenChange,
  title,
  description = "",
  onConfirm,
  onCancel,
  confirmText = "Aceptar",
  cancelText,
}: CustomAlertDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText && (
            <AlertDialogCancel onClick={onCancel}>
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

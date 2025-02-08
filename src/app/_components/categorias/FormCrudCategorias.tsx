"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useCategoriaContext } from "@/app/(contexts)/CategoriasContext";
import {
  CustomToasterSuccess,
  CustomToasterValidation,
} from "../_generics/CustomToaster";
import CustomAlertDialog from "../_generics/CustomAlertDialog";

interface FormCrudCategoriasProps {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
}

export default function FormCrudCategorias({
  isOpen,
  onClose,
  mode,
}: FormCrudCategoriasProps) {
  const [id, setId] = useState<number | undefined>(0);
  const [nombre, setNombre] = useState<string | undefined>("");
  const { selectedCategoria, refetchCategorias, setSelectedCategoria } =
    useCategoriaContext();
  const [title, setTitle] = useState(""); // Para el mensaje
  const [description, setDescription] = useState(""); // Para el mensaje
  const [isAlertDialog, setIsAlertDialog] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // Referencia al input

  // Manejo de mayúsculas en Inputs. Guarda posición del cursor
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: string,
  ) => {
    const { value, selectionStart, selectionEnd } = e.target;
    // Guarda la posición del cursor antes de actualizar el valor
    const cursorPosition = selectionStart;
    // Convierte el texto a mayúsculas
    const nuevoValor = value.toUpperCase();
    // Veo a que input aplicar
    if (e.target.name === "nombre") {
      setNombre(nuevoValor);
    }
    // Restaura la posición del cursor después de actualizar el valor
    if (inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current!.setSelectionRange(cursorPosition, cursorPosition);
      });
    }
  };

  useEffect(() => {
    if (!selectedCategoria) {
      Limpiar();
    } else {
      setId(selectedCategoria.id);
      setNombre(selectedCategoria.nombre);
    }
  }, [selectedCategoria]);

  // ###### Crud operations
  const agregarCategoriaMutation = api.categorias.agregar.useMutation();
  const editarCategoriaMutation = api.categorias.editar.useMutation();
  const eliminarCategoriaMutation = api.categorias.eliminar.useMutation();

  const agregarCategoria = async (nombre: string) => {
    try {
      await agregarCategoriaMutation.mutateAsync({ nombre });
      await refetchCategorias();
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
    }
  };

  const editarCategoria = async (id: number, nombre: string) => {
    try {
      await editarCategoriaMutation.mutateAsync({
        id,
        nombre,
      });
      await refetchCategorias();
    } catch (error) {
      console.error("Error al editar la categoría:", error);
    }
  };

  const eliminarCategoria = async (id: number) => {
    try {
      await eliminarCategoriaMutation.mutateAsync({ id });
      await refetchCategorias();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  // AlertDialog Respuesta SI estoy seguro
  const handleConfirmAlertDialog = async () => {
    if (mode === "agregar") {
      await agregarCategoria(nombre!.trim().toUpperCase());
      setIsAlertDialog(false);
      CustomToasterSuccess("Nueva categoría agregada con éxito.");
    }
    if (mode === "editar") {
      await editarCategoria(id!, nombre!.trim().toUpperCase());
      setIsAlertDialog(false);
      CustomToasterSuccess("Datos de la categoría actualizados.");
    }
    if (mode === "eliminar") {
      await eliminarCategoria(id!);
      setIsAlertDialog(false);
      CustomToasterSuccess("Categoría eliminada exitosamente.");
    }
    setSelectedCategoria(null);
    Limpiar();
    onClose();
  };

  // AlertDialog Respuesta NO
  const handleCancelAlertDialog = () => {
    setIsAlertDialog(false); // Cierra el diálogo
  };

  // Dialog Cancelar
  const handleCancelDialog = () => {
    if (mode === "agregar") {
      Limpiar();
    }
    if (selectedCategoria) {
      setId(selectedCategoria.id);
      setNombre(selectedCategoria.nombre);
    }
    onClose();
  };

  // Dialog Guardar, Salir o Eliminar -> Puede llamar a AlertDialog de confirmación
  const handleConfirmDialog = async () => {
    // Validación (ver si mejora con Zod *****************)
    if (mode === "agregar" || mode === "editar") {
      if (!nombre?.trim()) {
        CustomToasterValidation("El nombre no puede quedar vacío.");
        return;
      }
    }

    if (mode === "agregar") {
      setTitle("¿Agregar la nueva categoría?");
    }

    if (mode === "editar") {
      setTitle("Editar los datos de la categoría?");
    }

    if (mode === "detalle") {
      onClose();
    }

    if (mode === "eliminar") {
      setTitle("¿Eliminar la categoría?");
    }

    if (mode === "agregar" || mode === "editar" || mode === "eliminar") {
      setIsAlertDialog(true); // AlertDialog de confirmación
    }
  };

  function Limpiar() {
    setId(0);
    setNombre("");
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          // Evita que el Dialog se cierre al hacer clic fuera
          if (!open) {
            return;
          }
          onClose();
        }}
      >
        {/* <Dialog modal={true} open={isOpen} onOpenChange={onClose}> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">
              {mode === "agregar" && "Agregar categoría"}
              {mode === "editar" && "Editar categoría"}
              {mode === "detalle" && "Detalles de la categoría"}
              {mode === "eliminar" && "Eliminar categoría"}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="block font-medium">Id</label>
              <Input
                type="number"
                name="id"
                value={mode === "agregar" ? 0 : id}
                onChange={(e) => setId(Number(e.target.value))}
                className="w-full rounded border p-2"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium">Nombre</label>
              <Input
                type="text"
                name="nombre"
                value={nombre}
                onChange={(e) => handleChangeInput(e, "nombre")}
                //onChange={(e) => setNombre(e.target.value.toUpperCase())}
                className="w-full rounded border p-2"
                disabled={mode === "detalle" || mode === "eliminar"}
                required
                ref={inputRef}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                onClick={handleCancelDialog}
                variant="outline"
              >
                {mode === "detalle" ? "Salir" : "Cancelar"}
              </Button>
              {mode !== "detalle" && (
                <Button
                  type="button"
                  variant={mode === "eliminar" ? "destructive" : "default"}
                  onClick={handleConfirmDialog}
                >
                  {mode === "eliminar" ? "Eliminar" : "Guardar"}
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* AlertDialog: Confirm/Cancel */}
      <CustomAlertDialog
        isOpen={isAlertDialog}
        onOpenChange={setIsAlertDialog}
        title={title}
        description={description}
        onConfirm={handleConfirmAlertDialog} // Pasar el argumento aquí
        onCancel={handleCancelAlertDialog} // Pasa la función de cancelar
        confirmText="Si"
        cancelText="No" // Personaliza el texto del botón de cancelar
      />
    </>
  );
}

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
import { LoadingSpinnerMini } from "../_generics/LoadingSpinner";
import { X } from "lucide-react";

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
  //const [description, setDescription] = useState(""); // Para el mensaje
  const [isAlertDialog, setIsAlertDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // Referencia al input

  // Manejo de mayúsculas en Inputs. Guarda posición del cursor
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.target;
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
    setIsLoading(true); // Activar el estado de carga
    try {
      await agregarCategoriaMutation.mutateAsync({ nombre });
      await refetchCategorias();
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
    } finally {
      setIsLoading(false); // Desactivar el estado de carga
    }
  };

  const editarCategoria = async (id: number, nombre: string) => {
    setIsLoading(true); // Activar el estado de carga
    try {
      await editarCategoriaMutation.mutateAsync({
        id,
        nombre,
      });
      await refetchCategorias();
    } catch (error) {
      console.error("Error al editar la categoría:", error);
    } finally {
      setIsLoading(false); // Desactivar el estado de carga
    }
  };

  const eliminarCategoria = async (id: number) => {
    setIsLoading(true); // Activar el estado de carga
    try {
      await eliminarCategoriaMutation.mutateAsync({ id });
      await refetchCategorias();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    } finally {
      setIsLoading(false); // Desactivar el estado de carga
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
      setTitle("¿Editar los datos de la categoría?");
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
        <DialogContent className="temas temas-contenedor">
          <DialogHeader>
            <DialogTitle className="text-xl">
              <div className="temas -mt-1 mb-2 flex h-8 w-full border-spacing-1 items-center rounded-sm border border-gray-700 px-2 dark:border-gray-400">
                {/* Título de la página */}
                <div className="flex-1">
                  <span className="text-xl font-bold">
                    {mode === "agregar" && "Agregar categoría"}
                    {mode === "editar" && "Editar categoría"}
                    {mode === "detalle" && "Detalle categoría"}
                    {mode === "eliminar" && "Eliminar categoría"}
                  </span>
                </div>
                {/* Botón de cerrar (X) */}
                <Button
                  className="flex h-6 w-6 items-center justify-center rounded-sm bg-gray-500 hover:bg-red-400 hover:text-white"
                  aria-label="Cerrar"
                  onClick={handleCancelDialog}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
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
                onChange={handleChangeInput}
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
                disabled={isLoading} // Deshabilitar el botón mientras se carga
              >
                {mode === "detalle" ? "Salir" : "Cancelar"}
              </Button>
              {mode !== "detalle" && (
                <Button
                  type="button"
                  variant={mode === "eliminar" ? "destructive" : "default"}
                  onClick={handleConfirmDialog}
                  disabled={isLoading} // Deshabilitar el botón mientras se carga
                >
                  {isLoading ? (
                    <LoadingSpinnerMini /> // Mostrar el spinner si isLoading es true
                  ) : mode === "eliminar" ? (
                    "Eliminar"
                  ) : (
                    "Guardar"
                  )}
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
        //description={description}
        onConfirm={handleConfirmAlertDialog} // Pasar el argumento aquí
        onCancel={handleCancelAlertDialog} // Pasa la función de cancelar
        confirmText="Si"
        cancelText="No" // Personaliza el texto del botón de cancelar
      />
    </>
  );
}

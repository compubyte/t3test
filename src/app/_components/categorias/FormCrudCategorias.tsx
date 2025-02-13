"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useCategoriaContext } from "@/app/(contexts)/CategoriasContext";
import {
  CustomToasterError,
  CustomToasterSuccess,
  CustomToasterValidation,
} from "../_generics/CustomToaster";
import CustomAlertDialog from "../_generics/CustomAlertDialog";
import { LoadingSpinnerMini } from "../_generics/LoadingSpinner";
import { X } from "lucide-react";
import { validCategoria } from "@/app/(validations)/validCategoria";
import { categoriaFullSchema } from "@/server/models/modelos";
import { z } from "zod";

// ********** Props **********
interface FormCrudCategoriasProps {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
}

// ********** Estado formulario **********
type FormState = z.infer<typeof categoriaFullSchema>;

// ********** Estado diálogo confirmación **********
interface AlertDialogState {
  title: string;
  description: string;
  isOpen: boolean;
}

export default function FormCrudCategorias({
  isOpen,
  onClose,
  mode,
}: FormCrudCategoriasProps) {
  const [formState, setFormState] = useState<FormState>({
    id: 0,
    nombre: "",
  });
  const [alertDialogState, setAlertDialogState] = useState<AlertDialogState>({
    title: "",
    description: "",
    isOpen: false,
  });
  const { selectedCategoria, refetchCategorias, setSelectedCategoria } =
    useCategoriaContext();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // Referencia a Input

  // ********** Títulos **********
  type ModeType = "agregar" | "editar" | "detalle" | "eliminar";

  const titles: Record<ModeType, string> = {
    agregar: "Agregar categoría",
    editar: "Editar categoría",
    detalle: "Detalle categoría",
    eliminar: "Eliminar categoría",
  };

  // Manejo de mayúsculas en Inputs. Guarda posición del cursor
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.target;
    // Guarda la posición del cursor antes de actualizar el valor
    const cursorPosition = selectionStart;
    // Convierte el texto a mayúsculas
    const nuevoValor = value.toUpperCase();
    // Veo a que input aplicar
    if (e.target.name === "nombre") {
      setFormState({ ...formState, nombre: nuevoValor });
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
      setFormState({ id: 0, nombre: "" });
    } else {
      setFormState({
        id: selectedCategoria.id,
        nombre: selectedCategoria.nombre,
      });
    }
  }, [selectedCategoria]);

  // ###### Crud operations
  const agregarCategoriaMutation = api.categorias.agregar.useMutation();
  const editarCategoriaMutation = api.categorias.editar.useMutation();
  const eliminarCategoriaMutation = api.categorias.eliminar.useMutation();

  const agregarCategoria = async (formData: FormState) => {
    setIsLoading(true); // Activar el estado de carga
    const result = await agregarCategoriaMutation.mutateAsync({
      nombre: formData.nombre!,
    });
    if (result.success) {
      // Todo salió bien
      await refetchCategorias();
      setIsLoading(false); // Desactivar el estado de carga
      return true;
    } else {
      // Error de conflicto unique
      if (result.error?.code === "CONFLICT") {
        CustomToasterValidation(result.error.message);
      }
      // Error de validación de Zod
      else if (result.error?.code === "VALIDATION_ERROR") {
        CustomToasterValidation(result.error.message);
      }
      // Error interno del servidor
      else if (result.error?.code === "INTERNAL_SERVER_ERROR") {
        CustomToasterError(result.error.message);
      }
      // Error por defecto
      else {
        CustomToasterError("Ocurrió un error inesperado");
      }
    }
    setIsLoading(false);
    return false;
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
      const result = await agregarCategoria(formState);
      if (result) {
        setAlertDialogState({
          ...alertDialogState,
          isOpen: false,
        });
        CustomToasterSuccess("Categoría agregada correctamente.");
      } else {
        return;
      }
    }
    if (mode === "editar") {
      await editarCategoria(
        formState.id!,
        formState.nombre!.trim().toUpperCase(),
      );
      setAlertDialogState({
        ...alertDialogState,
        isOpen: false,
      });
      CustomToasterSuccess("Datos de la categoría actualizados.");
    }
    if (mode === "eliminar") {
      await eliminarCategoria(formState.id!);
      setAlertDialogState({
        ...alertDialogState,
        isOpen: false,
      });
      CustomToasterSuccess("Categoría eliminada exitosamente.");
    }
    setSelectedCategoria(null);
    Limpiar();
    onClose();
  };

  // AlertDialog Respuesta NO
  const handleCancelAlertDialog = () => {
    setAlertDialogState({
      ...alertDialogState,
      isOpen: false,
    }); // Cierra el diálogo
  };

  // Dialog Cancelar
  const handleCancelDialog = () => {
    if (mode === "agregar") {
      Limpiar();
    }
    if (selectedCategoria) {
      setFormState({
        id: selectedCategoria.id,
        nombre: selectedCategoria.nombre,
      });
    }
    onClose();
  };

  // Dialog Guardar, Salir o Eliminar -> Puede llamar a AlertDialog de confirmación
  const handleConfirmDialog = async () => {
    if (mode === "agregar" || mode === "editar") {
      const validation = validCategoria({ nombre: formState.nombre });
      if (!validation.success) {
        CustomToasterValidation(validation.error.message); // Mostrar el mensaje de validación
        return;
      }
    }

    if (mode === "agregar") {
      setAlertDialogState({
        title: "Agregar categoría",
        description: "¿Está seguro de que desea agregar la nueva categoría?",
        isOpen: true,
      });
    }

    if (mode === "editar") {
      setAlertDialogState({
        title: "Editar categoría",
        description:
          "¿Está seguro de que desea editar los datos de la categoría?",
        isOpen: true,
      });
    }

    if (mode === "detalle") {
      onClose();
    }

    if (mode === "eliminar") {
      setAlertDialogState({
        title: "Eliminar categoría",
        description: "¿Está seguro de que desea eliminar la categoría?",
        isOpen: true,
      });
    }
  };

  function Limpiar() {
    setFormState({ id: 0, nombre: "" });
  }

  return (
    <>
      <Dialog open={isOpen} modal={true}>
        <DialogOverlay className="bg-black/1" />
        {/* Quito botón X por defecto y habilito tecla ESC */}
        <DialogContent
          className="temas temas-contenedor border-2 border-white [&>button[aria-label='Close']]:hidden [&>button]:hidden"
          onEscapeKeyDown={handleCancelDialog}
        >
          <DialogHeader>
            <DialogTitle className="text-xl">
              <div className="temas -mt-1 mb-2 flex h-8 w-full border-spacing-1 items-center rounded-sm border border-gray-700 px-2 dark:border-gray-400">
                {/* Barra de título con botón cerrar */}
                <div className="flex-1">
                  <span className="text-xl font-bold">
                    {titles[mode as ModeType]}
                  </span>
                </div>
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
                value={mode === "agregar" ? 0 : formState.id}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    id: Number(e.target.value),
                  })
                }
                className="w-full rounded border p-2"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium">Nombre</label>
              <Input
                type="text"
                name="nombre"
                value={formState.nombre}
                onChange={handleChangeInput}
                className="w-full rounded border p-2"
                disabled={mode === "detalle" || mode === "eliminar"}
                required
                autoComplete="off"
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
        isOpen={alertDialogState.isOpen}
        onOpenChange={(open) =>
          setAlertDialogState({
            ...alertDialogState,
            isOpen: open,
          })
        }
        title={alertDialogState.title}
        description={alertDialogState.description}
        onConfirm={handleConfirmAlertDialog}
        onCancel={handleCancelAlertDialog}
        confirmText="Si"
        cancelText="No" // Personaliza el texto del botón de cancelar
      />
    </>
  );
}

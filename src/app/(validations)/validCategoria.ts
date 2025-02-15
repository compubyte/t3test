import {
  categoriaFullSchema,
  categoriaInsertSchema,
} from "@/server/models/modelos";
import type { Categoria, NuevaCategoria } from "@/server/models/modelos";

// Función para validar los datos CREATE
export function validCategoriaCreate(input: NuevaCategoria) {
  const validation = categoriaInsertSchema.safeParse(input);
  if (!validation.success) {
    console.log(validation.error.errors);
    return {
      success: false as const,
      error: {
        code: "VALIDATION_ERROR",
        message: validation.error.errors[0]?.message ?? "Error de validación",
      },
    };
  }
  return { success: true as const, data: validation.data };
}

// Función para validar los datos EDIT
export function validCategoriaEdit(input: Categoria) {
  const validation = categoriaFullSchema.safeParse(input);
  if (!validation.success) {
    console.log(validation.error.errors);
    return {
      success: false as const,
      error: {
        code: "VALIDATION_ERROR",
        message: validation.error.errors[0]?.message ?? "Error de validación",
      },
    };
  }
  return { success: true as const, data: validation.data };
}

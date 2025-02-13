import { categoriaInsertSchema } from "@/server/models/modelos";

// Función para validar los datos
export function validCategoria(input: unknown) {
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

import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { tablaCategorias } from "@/server/db/schema";
import { z } from "zod";

// Modelo para SELECT (datos completos)
export type Categoria = InferSelectModel<typeof tablaCategorias>;

// Modelo para INSERT (sin ID porque lo genera la DB)
export type NuevaCategoria = InferInsertModel<typeof tablaCategorias>;

// Zod Schema INSERT categoría
export const categoriaInsertSchema: z.ZodType<Omit<Categoria, "id">> = z.object(
  {
    nombre: z
      .string()
      .trim()
      .min(1, "El nombre no puede estar vacío")
      .max(50, "El nombre no puede exceder los 50 caracteres"),
  },
);

// Zod Schema FULL categoría
export const categoriaFullSchema: z.ZodType<Categoria> = z.object({
  id: z.number(),
  nombre: z
    .string()
    .trim()
    .min(1, "El nombre no puede estar vacío")
    .max(50, "El nombre no puede exceder los 50 caracteres"),
});

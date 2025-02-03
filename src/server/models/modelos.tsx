import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { tablaCategorias } from "@/server/db/schema";

// Modelo para SELECT (datos completos)
export type Categoria = InferSelectModel<typeof tablaCategorias>;

// Modelo para INSERT (sin ID porque lo genera la DB)
export type NuevaCategoria = InferInsertModel<typeof tablaCategorias>;

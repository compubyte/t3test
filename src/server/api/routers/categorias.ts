import {
  createTRPCRouter,
  //protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { tablaCategorias } from "@/server/db/schema";
import { categoriaInsertSchema } from "@/server/models/modelos";
import { validCategoria } from "@/app/(validations)/validCategoria";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const categoriasRouter = createTRPCRouter({
  getList: publicProcedure.query(async ({ ctx }) => {
    try {
      // Verifica que el cliente de la base de datos exista
      if (!ctx.db?.query) {
        console.error("Database client is not available in the context.");
        throw new Error("Database client is not available in the context.");
      }
      // Obtén la lista de categorías
      const listaCategorias = await ctx.db.query.tablaCategorias.findMany({
        orderBy: (tablaCategorias, { asc }) => [asc(tablaCategorias.id)],
      });
      // Retorna un arreglo vacío si no hay categorías
      return listaCategorias;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories. Please try again later.");
    }
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() })) // Validar que el ID sea un número
    .query(async ({ ctx, input }) => {
      try {
        // Verifica que el cliente de la base de datos exista
        if (!ctx.db?.query) {
          console.error("Database client is not available in the context.");
          throw new Error("Database client is not available in the context.");
        }
        // Obtén la categoría por su ID
        const categoria = await ctx.db.query.tablaCategorias.findFirst({
          where: eq(tablaCategorias.id, input.id),
        });
        // Si no se encuentra la categoría, lanza un error
        if (!categoria) {
          throw new Error("Category not found.");
        }
        // Retorna la categoría encontrada
        return categoria;
      } catch (error) {
        console.error("Error fetching category by ID:", error);
        throw new Error("Failed to fetch category. Please try again later.");
      }
    }),
  agregar: publicProcedure
    .input(categoriaInsertSchema) // Usamos directamente el schema de validación
    .mutation(async ({ ctx, input }) => {
      // Validación manual con Zod
      const validation = validCategoria(input);
      // Si la validación falla, devolvemos el error manualmente
      if (!validation.success) {
        return {
          success: false,
          error: validation.error,
        };
      }
      try {
        // Insertar la nueva categoría en la base de datos
        await ctx.db
          .insert(tablaCategorias)
          .values({ nombre: validation.data.nombre });
        return { success: true, data: validation.data };
      } catch (error: any) {
        // Error con código PostgreSQL para unique constraint
        if (
          error.message?.toLowerCase().includes("unique constraint") ||
          error.code === "23505"
        ) {
          return {
            success: false,
            error: {
              code: "CONFLICT",
              message: `La categoría "${validation.data.nombre}" ya existe`,
            },
          };
        }
        // Error del servidor o por defecto
        return {
          success: false,
          error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Error al agregar la categoría",
          },
        };
      }
    }),
  editar: publicProcedure
    .input(
      z.object({
        id: z.number(), // Validar que el ID sea un número
        nombre: z.string().min(1, "El nombre no puede estar vacío"), // Validar que el nombre no esté vacío
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const categoriaActualizada = await ctx.db
          .update(tablaCategorias)
          .set({ nombre: input.nombre })
          .where(eq(tablaCategorias.id, input.id))
          .returning(); // Devuelve la categoría actualizada
        return categoriaActualizada; // Retornar la categoría actualizada
      } catch (error) {
        console.error("Error updating category:", error);
        throw new Error("Failed to update category. Please try again later.");
      }
    }),
  eliminar: publicProcedure
    .input(z.object({ id: z.number() })) // Validar que el ID sea un número
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .delete(tablaCategorias)
          .where(eq(tablaCategorias.id, input.id));
      } catch (error) {
        console.error("Error deleting category:", error);
        throw new Error("Failed to delete category. Please try again later.");
      }
    }),
});

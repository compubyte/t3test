import {
  createTRPCRouter,
  //protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

// export const categoriasRouter = createTRPCRouter({
//   getList: publicProcedure.query(async ({ ctx }) => {
//     const listaCategorias = await ctx.db.query.tablaCategorias.findMany({
//       orderBy: (tablaCategorias, { asc }) => [asc(tablaCategorias.id)],
//     });
//     return listaCategorias ?? [];
//   }),
// });

export const categoriasRouter = createTRPCRouter({
  // Define un procedimiento público para obtener la lista de categorías
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
  // Define un procedimiento público para obtener una categoría por ID
});

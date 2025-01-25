import { z } from "zod";

import {
  createTRPCRouter,
  //protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
//import { posts } from "@/server/db/schema";

export const categoriasRouter = createTRPCRouter({
  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.insert(posts).values({
  //       name: input.name,
  //       createdById: ctx.session.user.id,
  //     });
  //   }),
  getList: publicProcedure.query(async ({ ctx }) => {
    const listaCategorias = await ctx.db.query.tablaCategorias.findMany({
      orderBy: (tablaCategorias, { asc }) => [asc(tablaCategorias.id)],
    });
    return listaCategorias ?? [];
  }),
});

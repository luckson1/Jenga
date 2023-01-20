import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  // add a category

  add: publicProcedure
    .input(z.object({ name: z.string(), subDepartmentId: z.string() }))
    .mutation(({ input, ctx }) => {
      const { name , subDepartmentId} = input;
      return ctx.prisma.category.create({
        data: { name, subDepartmentId },
      });
    }),

  // fetch all categories

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({
      where: {
        deleted: false
      }
    });
  }),

  // fetch one departemnt
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const { id } = input;
      return ctx.prisma.category.findFirst({
        where: {
          id,
          deleted: false
        },
      });
    }),
  // update a departemnt
  update: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ input, ctx }) => {
      const { id, name } = input;
      return ctx.prisma.category.update({
        where: {
          id,
        },
        data: {
            name
        },
      });
    }),


    //delete a category
 
  delete: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input, ctx }) => {
    const { id} = input;
    return ctx.prisma.category.update({
      where: {
        id,
      },
     data: {
      deleted: true,
     }
    });
  }),
});

import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const UserRouter = createTRPCRouter({
  // add a User

  add: publicProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(({ input, ctx }) => {
      const { name, email } = input;
      return ctx.prisma.user.create({
        data: { name, email },
      });
    }),

  // fetch all Users

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
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
      return ctx.prisma.user.findFirst({
        where: {
          id,
          deleted: false
        },
      });
    }),
  // update a departemnt
  update: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .query(({ input, ctx }) => {
      const { id, name } = input;
      return ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    }),

  //delete a User

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const { id } = input;
      return ctx.prisma.user.update({
        where: {
          id,
        },
       data: {
        deleted: true
       }
      });
    }),
});

import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const departmentRouter = createTRPCRouter({
  // add a department

  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      const { name } = input;
      return ctx.prisma.department.create({
        data: { name },
      });
    }),

  // fetch all departments

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.department.findMany({
      where: {
        deleted: false,
      },
      include: {
        SubDepartment: {
          where: {
            deleted: false,
          },
          include: {
            Category: {
              where: {
                deleted: false,
              },
            },
          },
        },
      },
      
    });
  }),

  // fetch one departemnt
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const { id } = input;
      return ctx.prisma.department.findFirst({
        where: {
          id,
          deleted: false,
        },
        include: {
          SubDepartment: {
            where: {
              deleted: false,
            },
            include: {
              Category: {
                where: {
                  deleted: false,
                },
              },
            },
          },
        },
      });
    }),
  // update a departemnt
  update: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .query(({ input, ctx }) => {
      const { id, name } = input;
      return ctx.prisma.department.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    }),

  //delete a department

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      const { id } = input;
      return ctx.prisma.department.update({
        where: {
          id,
        },
        data: {
          deleted: true,
        },
      });
    }),
});

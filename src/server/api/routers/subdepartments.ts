import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const subDepartmentRouter = createTRPCRouter({
  // add a subDepartment

  add: publicProcedure
    .input(z.object({ name: z.string(),  departmentId: z.string() }))
    .mutation(({ input, ctx }) => {
      const { name,  departmentId } = input;
      return ctx.prisma.subDepartment.create({
        data: { name ,  departmentId},
      });
    }),

  // fetch all subDepartments

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.subDepartment.findMany({
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
      return ctx.prisma.subDepartment.findFirst({
        where: {
          id,
          deleted: false
        },
        include:{
          Category: true
        }
      });
    }),
  // update a departemnt
  update: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .query(({ input, ctx }) => {
      const { id, name } = input;
      return ctx.prisma.subDepartment.update({
        where: {
          id,
        },
        data: {
            name
        },
      });
    }),


    //delete a subDepartment
 
  delete: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input, ctx }) => {
    const { id} = input;
    return ctx.prisma.subDepartment.update({
      where: {
        id,
      },
     data: {
      deleted: true
     }
    });
  }),
});

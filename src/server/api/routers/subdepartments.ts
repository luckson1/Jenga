import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

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

  getAll: publicProcedure.query(async({ ctx }) => {
     const subs= await ctx.prisma.subDepartment.findMany({
      where: {
        deleted: false
      },
      select: {
        name:true,
        id:true,
        department: {
          select: {
            name: true
          }
        }
      }
    });
    if(!subs) throw new TRPCError({code: "NOT_FOUND"})
    return subs
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

import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@prisma/client";

export const productRouter = createTRPCRouter({
  // add a product

  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        brand: z.string().optional(),
        price: z.number(),
        secondHand: z.boolean().optional(),
        width: z.number().optional(),
        length: z.number().optional(),
        height: z.number().optional(),
        departmentId: z.string(),
        subDepartmentId: z.string(),
        categoryId: z.string(),
        productMaterials: z.string().optional(),
        variantType: z.string().optional(),
        variants: z.string().optional(),
      
      })
    )
    .mutation(async ({ input, ctx }) => {
      const {
        name,
        description,
        brand,

        price,
        secondHand,
        width,
        length,
        height,
        categoryId,
        variantType,
        variants,
        productMaterials,
        departmentId,
        subDepartmentId,
      } = input;

      const colors =
        variantType === "colors"
          ? variants?.trim().split(/\s*,\s*/)
          : undefined;
      const sizes =
        variantType === "sizes" ? variants?.trim().split(/\s*,\s*/) : undefined;
      const designs =
        variantType === "designs"
          ? variants?.trim().split(/\s*,\s*/)
          : undefined;
      const configurations =
        variantType === "configurations"
          ? variants?.trim().split(/\s*,\s*/)
          : undefined;

      const materials = productMaterials?.trim().split(/\s*,\s*/);
      const userId=ctx.session?.user?.id
if (userId) {
  
      // create product
      const product = await ctx.prisma.product.create({
        data: {
          name,
          description,
          brand,

          price,
          secondHand,
          width,
          length,
          height,
          categoryId,
          colors,
          designs,
          sizes,
          configurations,
          materials,
          subDepartmentId,
          departmentId,
          
        },
      
      });

      return product;
}
    }),

  // fetch all products

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      where: {
        deleted: false,
      },
    });
  }),

  // fetch one departemnt
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const { id } = input;
      return ctx.prisma.product.findFirst({
        where: {
          id,
          deleted: false,
        },
      });
    }),
  // update a departemnt
  update: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .query(({ input, ctx }) => {
      const { id, name } = input;
      return ctx.prisma.product.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    }),

  //delete a product

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const { id } = input;
      return ctx.prisma.product.update({
        where: {
          id,
        },
        data: {
          deleted: true,
        },
      });
    }),
});

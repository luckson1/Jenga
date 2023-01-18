import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@prisma/client";

export const productRouter = createTRPCRouter({
  // add a product

  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        brand: z.string(),
        url: z.string(),
        price: z.number(),
        state: z.boolean(),
        width: z.number(),
        length: z.number(),
        height: z.number(),
        categoryId: z.string(),
        productMaterial: z.string(),
        variantTypes: z.string(),
        variants: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const {
        name,
        description,
        brand,
        url,
        price,
        state,
        width,
        length,
        height,
        categoryId,
        variantTypes,
        variants,
        productMaterial,
      } = input;

      const colors =
        variantTypes === "colors"
          ? variants.trim().split(/\s*,\s*/)
          : undefined;
      const sizes =
        variantTypes === "sizes" ? variants.trim().split(/\s*,\s*/) : undefined;
      const designs =
        variantTypes === "designs"
          ? variants.trim().split(/\s*,\s*/)
          : undefined;
      const configurations =
        variantTypes === "configurations"
          ? variants.trim().split(/\s*,\s*/)
          : undefined;

      const materials = productMaterial.trim().split(/\s*,\s*/);
      const userId = ctx.session?.user?.id ?? " ";

      // create product
      const product = await ctx.prisma.product.create({
        data: {
          name,
          description,
          brand,
          url,
          price,
          state,
          width,
          length,
          height,
          categoryId,
          colors,
          designs,
          sizes,
          configurations,
          materials,
        },
      });

    


      
      return product
    }),

  // fetch all products

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      where: {
        deleted: false,
      }
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
          deleted:false
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
          deleted: true
        }
      });
    }),
});

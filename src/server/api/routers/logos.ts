import { z } from "zod";
import S3 from "aws-sdk/clients/s3";
import { env } from "../../../env/server.mjs";

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET_KEY,
  region: env.REGION,
  signatureVersion: "v4",
});

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const logoRouter = createTRPCRouter({
  // fetch all logos beloging to a given product

  getAll: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx }) => {
      const userId = ctx.session?.user?.id;
      const logos = await ctx.prisma.logo.findMany({
        where: {
          userId,
          deleted: false,
        },
      });

      // loop through logos to get  metadata from s3 bucket and add the metada to logos
      const extendedlogos = await Promise.all(
        logos.map(async (logo) => {
          return {
            ...logo,
            url: await s3.getSignedUrlPromise("getObject", {
              Bucket: env.BUCKET_NAME,
              Key: `${logo.id}`,
            }),
          };
        })
      );
      return extendedlogos;
    }),

  //fetch all logos belonging to a product and include user data
  logosAndUser: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;

    const logos = await ctx.prisma.logo.findMany({
      where: {
        userId,
        deleted: false,
      },
      include: {
        user: true,
      },
    });

    // loop through logos to get  metadata from s3 bucket and add the metada to logos
    const extendedlogos = await Promise.all(
      logos.map(async (logo) => {
        return {
          ...logo,
          url: await s3.getSignedUrlPromise("getObject", {
            Bucket: env.BUCKET_NAME,
            Key: `${logo.id}`,
          }),
        };
      })
    );
    return extendedlogos;
  }),
  // fetch one logo
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;
      const logo = await ctx.prisma.logo.findFirst({
        where: {
          id,
          deleted: false,
        },
      });
      //  get  metadata from s3 bucket and add the metada to logo
      const url = await s3.getSignedUrlPromise("getObject", {
        Bucket: env.BUCKET_NAME,
        Key: `${logo?.id}`,
      });
      const extendedlogo = { url, ...logo };
      return extendedlogo;
    }),

  //delete a logo

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      const { id } = input;
      return ctx.prisma.logo.update({
        where: {
          id,
        },
        data: {
          deleted: false,
        },
      });
    }),
});

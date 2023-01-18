import { z } from "zod";
import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";
import { env } from "../../../env/server.mjs";

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET_KEY,
  region: env.REGION,
  signatureVersion: "v4",
});

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const imageRouter = createTRPCRouter({

  // create an image
  add: publicProcedure
  .input(z.object({
    productId: z.string()
  }))
  .mutation(async ({ctx, input})=> {
    const {productId}=input
    const userId=ctx.session?.user?.id
    // make entries to image table for the product images
 if (userId) {
  const image = await ctx.prisma.image.create({
    data: {
      userId,
      productId,
    },
  });

    // upload images to s3 bucket
    const Key = `${image.id}`;

    const s3Params = {
      Bucket: env.BUCKET_NAME,
      Key,
      Expires: 60,
    };
  
    const uploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);
    return {image, uploadUrl}
 }


  
  }),
  // fetch all images

  getAll: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx , input}) => {
      const { productId } = input;
      const images = await ctx.prisma.image.findMany({
        where: {
          productId,
          deleted: false
        },
      });

      // loop through images to get  metadata from s3 bucket and add the metada to images
const extendedImages= await Promise.all(images.map(async(image)=> {
    return {
        ...image,
        url: await s3.getSignedUrlPromise("getObject", {
            Bucket: env.BUCKET_NAME,
            Key: `${image.id}`
        })
    }
}));
return extendedImages
    }),

  // fetch one image
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;
      const image = await ctx.prisma.image.findFirst({
        where: {
          id,
          deleted:false
        },
      });
    //  get  metadata from s3 bucket and add the metada to image
      const url = await s3.getSignedUrlPromise("getObject", {
        Bucket: env.BUCKET_NAME,
        Key: `${image?.id}`
    })
    const extendedImage= {url, ...image}
    return extendedImage
    }),


  //delete a image

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      const { id } = input;
      return ctx.prisma.image.update({
        where: {
          id,
        },
        data: {
          deleted: false
        }
      });
    }),
});

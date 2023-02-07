import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
const sellerSchema= z.object({ businessName: z.string().min(1, { message: 'Business Name Required' }),
    streetAddress :z.string().min(1, { message: ' Street Address Required' }),
    location      :z.string().min(1, { message: ' Location Required' }),
    website       :z.string().min(1, { message: 'Website Required' }),
    phoneNumber   :z.number(),
logo:  z.custom<FileList>()})
export const userRouter = createTRPCRouter({
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
// upgrade to seller
addSeller: protectedProcedure
.input(sellerSchema)
.mutation(async ({ctx, input})=> {
  const id=ctx.session.user.id
  const {businessName, location, phoneNumber, streetAddress, website}=input
  const seller= await ctx.prisma.user.update({
    where: {
      id,
     
    },
    data: {
      businessName, website, location, phoneNumber, streetAddress, role: "SELLER"
    }
  })
  return seller
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

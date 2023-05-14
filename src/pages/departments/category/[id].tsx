import React from "react";
import Product from "../../../components/display/Product";
import Comingsoon from "../../../components/comingsoon";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import Head from "next/head";

const prisma = new PrismaClient();

export async function getStaticPaths() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
    },
  });
  const paths = categories.map((category) => ({
    params: { id: category.id },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id as string;
  const category = await prisma.category.findUniqueOrThrow({
    where: { id },
    select: {
      name: true,
      Product: {
        where: {
          deleted: false,
        },
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });

  return { props: { category } };
};

const Category = ({
  category,
}: {
  category: {
    Product: {
      id: string;
      name: string;
      price: number;
    }[];
    name: string;
  };
}) => {
  const products = category?.Product;

  return (
    <>
      <Head>
        <title>Jenga</title>
        <meta name="description" content={category.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex h-fit w-full min-w-screen flex-col my-8 justify-center items-center">
      <div className=" my-16 mx-auto grid h-fit w-[90%] grid-cols-1 gap-7    md:grid-cols-3 xl:grid-cols-4 2xl:grind-cols-6 justify-center items-center">
        {!products?.length ? (
          <Comingsoon />
        ) : (
          products?.map((product) => (
            <Link
              href={{ pathname: `product/${product.id}` }}
              key={product.id}
              className="flex card w-full max-w-sm h-full min-h-[15rem] max-h-[20rem] flex-col bg-base-100 mx-auto  duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 shadow-xl gap-2"
            >
         <div className="w-full h-[70%]">
         <Product id={product.id}  />
         </div>

              <div className="my-2 flex flex-col px-6 w-full h-[25%]">
                <p className="flex gap-2 text-xs md:text-sm  text-sky-500 underline"> {product.name}</p>
                <p className="flex gap-1 text-xs md:text-sm font-semibold">
                  {" "}
                  Ksh. {product.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
      </div>
    </>
  );
};

export default Category;

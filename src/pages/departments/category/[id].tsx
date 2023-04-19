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
      <div className="flex h-fit w-screen flex-col my-8"></div>
      <div className=" my-16 mx-auto grid h-fit w-[95%] grid-cols-2 gap-3    md:grid-cols-3 xl:grid-cols-4 2xl:grind-cols-6">
        {!products?.length ? (
          <Comingsoon />
        ) : (
          products?.map((product) => (
            <Link
              href={{ pathname: `product/${product.id}` }}
              key={product.id}
              className="flex rounded-xl w-48 flex-col bg-base-100 md:h-72 md:w-64  shadow-base-content transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
            >
              <Product id={product.id} />

              <div className="my-2 flex flex-col px-6">
                <p className="flex gap-2 text-xs md:text-sm  text-sky-500 underline"> {product.name}</p>
                <p className="flex gap-1 text-xs md:text-sm font-bold">
                  {" "}
                  Ksh. {product.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Category;

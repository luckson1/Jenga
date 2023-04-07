import React from "react";
import Product from "../../../components/display/Product";
import { RiMoneyDollarBoxLine, RiProductHuntLine } from "react-icons/ri";
import Comingsoon from "../../../components/comingsoon";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";

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
  };
}) => {
  const products = category?.Product;

  return (
    <div className="mx-12 my-16 grid h-fit w-screen grid-cols-1  gap-7 px-3 py-16 md:grid-cols-2 md:gap-10 md:px-7 lg:grid-cols-3">
      {!products?.length ? (
        <Comingsoon />
      ) : (
        products?.map((product) => (
          <Link
            href={{ pathname: `product/${product.id}` }}
            key={product.id}
            className="flex h-80 w-80 flex-col bg-base-100"
          >
            <Product id={product.id} />

            <div className="my-2 flex flex-row justify-start gap-12">
              <p className="flex gap-1 text-sm">
                {" "}
                <RiProductHuntLine className="text-lg text-violet-400 " />{" "}
                {product.name}
              </p>
              <p className="flex gap-1 text-sm font-bold">
                {" "}
                <RiMoneyDollarBoxLine className="text-lg text-violet-400" />{" "}
                Ksh. {product.price}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Category;

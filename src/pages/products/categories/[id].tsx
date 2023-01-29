import { useRouter } from "next/router";
import React from "react";
import Product from "../../../components/display/Product";
import {RiMoneyDollarBoxLine, RiProductHuntLine} from "react-icons/ri"
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
          deleted: false
        },
        select: {
          id: true,
          name: true,
          price: true
        }

      }
    },
  });

  return { props: { category} };
};

const Category = ({category}: { category: {
  Product: {
      id: string;
      name: string;
      price: number;
  }[];
}}) => {

  const products = category?.Product;
 
  return (
    <div className="mb-20 mt-10 md:mb-10 md:my-20  flex h-fit w-screen flex-row flex-wrap justify-center gap-6 rounded-lg md:gap-10 ">
 
      { !products?.length? <Comingsoon /> : products?.map((product) => (
        <div key={product.id} className="flex h-80 w-80 flex-col bg-white"  >
          <Product id={product.id} />
          <Link href={{pathname: `product/${product.id}`}}>
          <div className="flex flex-row justify-start gap-12 my-2">
            <p className="text-sm flex gap-1"> < RiProductHuntLine className="text-violet-400 text-lg "/> {product.name}</p>
            <p className="font-bold text-sm flex gap-1">  <RiMoneyDollarBoxLine  className="text-violet-400 text-lg"/> Ksh. {product.price}</p>
          </div>
       
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Category;

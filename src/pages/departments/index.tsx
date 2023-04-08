import React from "react";
import CategoryDisplay from "../../components/display/Departments";
import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import Head from "next/head";

const prisma = new PrismaClient();
export const getStaticProps: GetStaticProps = async (context) => {
  const departments = await prisma.department.findMany({
    select: {
      name: true,
      id: true,
      Url: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  return { props: { departments } };
};
const Products = ({
  departments,
}: {
  departments: {
    name: string;
    id: string;
    Url: string | null;
  }[];
}) => {
  return (
    <>
       <Head>
        <title>Jenga</title>
        <meta name="description" content="Build your Dream Spaces" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="mb-16 bg-base-100 text-center mt-16 w-screen">
        <h1 className="my-5 text-2xl">Shop by Department</h1>
        <div className="grid h-fit w-full grid-cols-1 gap-7 px-3 py-5 ml-12 md:grid-cols-2 md:gap-10 md:px-7 md:py-10 lg:grid-cols-3">
          {departments?.map((d) => (
            <div key={d.id}>
              <CategoryDisplay department={d} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;

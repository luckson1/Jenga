import React from "react";
import CategoryDisplay from "../../components/display/Departments";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import Loading from "../../components/display/LoadingComponent";
import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";

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
      <div className="mb-16 bg-white text-center md:mb-10 md:mt-16 w-screen">
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

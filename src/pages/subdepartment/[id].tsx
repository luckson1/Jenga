import React from "react";

import SubCategory from "../../components/display/Category";

import { GetStaticProps } from "next";
import {  PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getStaticPaths() {
  const subDepartments = await prisma.subDepartment.findMany({
    select: {
      id: true,
    },
  });
  const paths =  subDepartments .map(( subDepartment) => ({
    params: { id:  subDepartment.id },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id as string;
  const  subDepartment = await prisma.subDepartment.findUniqueOrThrow({
    where: { id },
    select: {
      name: true,

  Category : {
    select: {
        name: true,
        id: true,
        Url: true
    }
  }
    },
  });

  return { props: { subDepartment  } };
};
const SubId = ({
  subDepartment,
}: {
    subDepartment: {
        name: string;
        Category: {
            name: string;
            id: string;
            Url: string | null;
        }[];
    }
}) => {


  return (
    <>
      <div className="  mb-16 w-screen bg-base-100 text-center mt-16">
 

          <section
            className="flex h-fit w-[85%] max-w-6xl flex-col mt-16 justify-center items-center mx-auto"
         
          >
          <p className=" text-center text-xl text-base-content font-semibold my-12">
              {" "}
              {subDepartment.name}
            </p>
            <div className="mx-auto  h-fit w-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center gap-5  py-5   ">
              {subDepartment.Category.map((c) => (
                <div key={c.id} className="w-fit h-fit">
                  <SubCategory category={c} />
                </div>
              ))}
            </div>
          </section>
      
      </div>
    </>
  );
};

export default SubId;

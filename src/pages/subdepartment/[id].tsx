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
            className="flex h-fit w-screen flex-col mt-16"
         
          >
            <p className="mx-2 text-center text-xl text-black">
              {" "}
              {subDepartment.name}
            </p>
            <div className="md:x-7  h-fit w-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center gap-5  py-5  md:px-7 md:py-10 mx-8 ">
              {subDepartment.Category.map((c) => (
                <div key={c.id}>
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

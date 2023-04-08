import React from "react";

import SubCategory from "../../components/display/Category";

import { GetStaticProps } from "next";
import {  PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getStaticPaths() {
  const departments = await prisma.department.findMany({
    select: {
      id: true,
    },
  });
  const paths = departments.map((department) => ({
    params: { id: department.id },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id as string;
  const department = await prisma.department.findUniqueOrThrow({
    where: { id },
    select: {
      name: true,
      SubDepartment: {
        select: {
          id: true,
          name: true,
          Category: {
            select: {
              id: true,
              name: true,
              Url: true,
            },
          },
        },
      },
    },
  });

  return { props: { department } };
};
const DepartmentId = ({
  department,
}: {
  department: {
    SubDepartment: {
      id: string;
      name: string;
      Category: {
        id: string;
        name: string;
        Url: string | null;
      }[];
    }[];
    name: string;
  };
}) => {
  const subDepartments = department?.SubDepartment;

  return (
    <>
      <div className="  mb-16 w-screen bg-base-100 text-center mt-16">
        <h1 className="my-5 text-2xl font-extrabold">{department?.name}</h1>
        {subDepartments?.map((subDepartment) => (
          <section
          className="flex h-fit w-[85%] max-w-6xl flex-col  justify-center items-center mx-auto"
            key={subDepartment.id}
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
        ))}
      </div>
    </>
  );
};

export default DepartmentId;

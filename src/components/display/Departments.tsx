
import { Category, Department, SubDepartment } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";


const CategoryDisplay = ({ department }: { department: {
  name: string;
  id: string;
  Url: string | null;
} }
) => {
  const router = useRouter();

  return (
   
      <div className="flex items-center justify-center rounded-md   bg-cover  bg-center w-fit h-fit" >
      <Image
        alt={department?.name}
        src={department?.Url ?? "https://res.cloudinary.com/dhciks96e/image/upload/v1674435518/warmKitchen_gkirjj.jpg"}
        height={150}
        width={150}
        sizes="(max-width: 288px) 288px,(max-height: 288px) 288px "
        quality={50}
        className="rounded-2xl h-80 w-80 lg:h-96 lg:w-96"
      />
          <Link href={{pathname: `departments/${department.id}`}}  >
      <button

        className=" -ml-80 md:-ml-80 lg:-ml-96 w-36 py-2 z-10 transform  px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 duration-500 ease-in-out hover:-translate-y-1 hover:scale-105"
      >
        {department?.name}
      </button>
      </Link> 
    </div>
   
  );
};

export default CategoryDisplay;

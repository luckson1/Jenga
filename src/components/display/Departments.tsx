
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
   
      <div className="relative flex h-64 w-80  items-center justify-center rounded-md   bg-cover  bg-center md:w-64 lg:h-72 lg:w-72" key={department?.id}>
      <Image
        alt={department?.name}
        src={department?.Url ?? "https://res.cloudinary.com/dhciks96e/image/upload/v1674435518/warmKitchen_gkirjj.jpg"}
        fill
        sizes="(max-width: 288px) 288px,(max-height: 288px) 288px "
        quality={50}
        className="rounded-2xl"
      />
          <Link href={{pathname: `products/department/${department.id}`}}  >
      <button
        className="z-10 w-32 transform rounded-full bg-violet-400 bg-opacity-70 py-2 text-violet-700  outline outline-violet-700 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-violet-700 hover:text-slate-100 hover:outline-none"
       
      >
        {department?.name}
      </button>
      </Link> 
    </div>
   
  );
};

export default CategoryDisplay;

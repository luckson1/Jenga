import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
export interface Category {
  image: string;
  name: string;
  i: number;
}

const SubCategory = ({ category }: { category: {
  id: string;
  name: string;
  Url: string | null;
} }) => {

  const router=useRouter()

  
  return (
    <div className="flex  h-36 w-36 transform cursor-pointer flex-col items-start  justify-center rounded-md bg-white bg-center pt-0 shadow-md transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl md:h-44 md:w-44 lg:h-48 lg:w-48"
    onClick={()=> router.push(`/products/categories/${category.id}`)}>
      <div className=" relative flex  h-[80%] w-[100%] flex-col justify-center gap-10 rounded-md  bg-center md:h-[80%] md:w-[100%] lg:h-[80%] lg:w-[100%]  ">
        <Image
          alt={`${category?.name}`}
          src={`${category?.Url}`}
          sizes="(max-width: 288px) 288px,(max-height: 288px) 288px "
          quality={50}
    
          fill
          className="md mt-0 rounded-t-md"
        />
      </div>
      <div className="h-[20%]">
        <p className=" ml-2  text-xs text-blue-500 md:ml-5 md:text-sm">
          {category?.name}
        </p>
      </div>
    </div>
  );
};

export default SubCategory;

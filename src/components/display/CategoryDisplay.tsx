import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
export interface Category {
  image: string;
  name: string;
  i: number;
  url: string;
}

const CategoryDisplay = ({ category }: { category: Category }) => {
  const router = useRouter();
  return (
    <div className="relative flex h-64 w-80  items-center justify-center rounded-md   bg-cover  bg-center md:w-64 lg:h-72 lg:w-72">
      <Image
        alt={category?.name}
        src={category?.image}
        fill
        sizes="(max-width: 288px) 288px,(max-height: 288px) 288px "
        quality={50}
        className="rounded-2xl"
      />
      <button
        className="z-10 w-32 transform rounded-full bg-violet-400 bg-opacity-70 py-2 text-violet-700  outline outline-violet-700 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-violet-700 hover:text-slate-100 hover:outline-none"
        onClick={() => router.push(category?.url)}
      >
        {category?.name}
      </button>
    </div>
  );
};

export default CategoryDisplay;

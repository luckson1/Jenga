import { useRouter } from "next/router";
import React from "react";
import { api } from "../../../utils/api";
import GetImage from "../../../components/images/GetImage";
import Product from "../../../components/display/Product";

const Category = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: category } = api.category.getOne.useQuery({ id });
  const products = category?.Product;
  console.log(products);
  return (
    <div className="mt-16 flex h-fit w-screen flex-row flex-wrap justify-center gap-3 rounded-lg md:gap-10 ">
      {products?.map((product) => (
        <div key={product.id} className="flex h-80 w-80 flex-col bg-white">
          <Product id={product.id} />
          <div className="flex flex-row justify-start gap-24 mt-2">
            <p className="text-sm">{product.name}</p>
            <p className="font-bold"> Ksh. {product.price}</p>
          </div>
          <div className="flex flex-row justify-start gap-16">
            <p className="text-sm">By: {product.user.name}</p>
            <p className="text-sm">{product.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;

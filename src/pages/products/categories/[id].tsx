import { useRouter } from "next/router";
import React from "react";
import { api } from "../../../utils/api";
import GetImage from "../../../components/images/GetImage";
import Product from "../../../components/display/Product";
import { MdOutlineLocationOn } from "react-icons/md";
import {RiMoneyDollarBoxLine, RiProductHuntLine} from "react-icons/ri"
import { AiOutlineShop } from "react-icons/ai";
import Loading from "../../../components/display/LoadingSmall";
import Comingsoon from "../../../components/comingsoon";

const Category = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: category , isLoading} = api.category.getOne.useQuery({ id });
  const products = category?.Product;
 
  return (
    <div className="my-20 flex h-fit w-screen flex-row flex-wrap justify-center gap-6 rounded-lg md:gap-10 ">
      {isLoading? <div className="w-96 h-96">
      <Loading />
      </div>: !products?.length? <Comingsoon /> : products?.map((product) => (
        <div key={product.id} className="flex h-80 w-80 flex-col bg-white">
          <Product id={product.id} />
          <div className="flex flex-row justify-start gap-12 my-2">
            <p className="text-sm flex gap-1"> < RiProductHuntLine className="text-violet-400 text-lg "/> {product.name}</p>
            <p className="font-bold text-sm flex gap-1">  <RiMoneyDollarBoxLine  className="text-violet-400 text-lg"/> Ksh. {product.price}</p>
          </div>
          <div className="flex flex-row justify-start gap-12 mt-2">
            <p className="text-sm flex gap-1"><AiOutlineShop className="text-violet-400 text-lg" /> {product.user.name}</p>
            <p className="text-sm flex gap-1 " > <MdOutlineLocationOn className="text-violet-400 text-lg"/>  {product.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;

import { useRouter } from "next/router";
import React from "react";
import { api } from "../../../utils/api";
import GetImage from "../../../components/images/GetImage";


const Category = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: category } = api.category.getOne.useQuery({ id });
  const products = category?.Product;
  console.log(products);
  return (
    <div className="mt-16 flex h-fit w-screen flex-row justify-around rounded-lg flex-wrap snap-x snap-mandatory">
      {products?.map((product) => (
        <div key={product.id} className="h-80 w-80 bg-slate-100">
            
            <div className="carousel w-full">
{product?.Image?.map(image=> (
// set id of the carousel to the id of image for scrolling
     <div id={`${image.id}`} className="carousel-item relative w-full h-full " key={image.id}>
   <GetImage id={image.id}/>
     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        {/* provide logic of displaying the carousel images */}
       <a href={`${product.Image.indexOf(image)===0 ? `#${product?.Image[product.Image?.length-1]?.id}`: `#${product.Image[product.Image.indexOf(image)-1]?.id}`}`} className="btn btn-circle">❮</a> 
       <a href={`${product?.Image?.indexOf(image)===product?.Image.length-1 ? `#${product.Image[0]?.id}`: `#${product.Image[product.Image.indexOf(image)+1]?.id}`}`} className="btn btn-circle">❯</a>
     </div>
   </div>  
))}
  </div>



        </div>
      ))}
    </div>
  );
};

export default Category;

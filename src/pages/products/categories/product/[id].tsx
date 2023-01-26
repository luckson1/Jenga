import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "../../../../utils/api";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import Loading from "../../../../components/display/LoadingSmall";

const ProductId = () => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState("/livingRoom.jpeg");
  const productId = router.query.id as string;

  const { data: images, isLoading } = api.image.imagesAndUsers.useQuery({
    productId,
  }, {
onSuccess: (images)=> setCurrentImage(images.at(0)?.url ?? "/livingRoom.jpeg")
  });
 
  const product = images?.at(0)?.Product;
  const user = images?.at(0)?.user;
  console.log(product?.materials);

  return (
    <div className="my-3 flex flex-col">
      <div className="flex h-[75vh] w-screen flex-col md:mt-16">
        <div className=" flex h-full  w-full flex-col justify-center md:h-[90%]  md:flex-row  ">
          <div className="flex h-[50%] w-full flex-col-reverse items-start justify-around md:h-[70%] md:w-[60%] md:flex-row lg:h-full lg:w-[50%]">
            <div className="relative mx-5 flex h-fit w-screen flex-row gap-2 p-1 md:ml-8 md:h-screen md:w-fit md:flex-col">
              {
                images?.map((image) => (
                  <div
                    key={image.id}
                    className="relative flex h-12 w-12 cursor-pointer items-center justify-center overflow-scroll rounded-lg md:h-16 md:w-16"
                    onClick={() => setCurrentImage(image.url)}
                  >
                    <Image
                      key={image.id}
                      src={image.url}
                      alt={image.Product.name}
                      fill
                      sizes="(max-width: 768px) 40px,
              (max-width: 1200px) 50px,
              50px"
                      className="rounded-lg"
                    />
                  </div>
                ))
              }
            </div>
            <div className="relative mx-auto h-[80%] w-[95%] rounded-lg md:h-[95%] md:w-[80%]">
              <Image
                src={currentImage }
                alt={product?.name ?? " Product"}
                quality={100}
                fill
                sizes="(max-width: 768px) 80vw,
              (max-width: 1200px) 80vw,
              80vw"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="mx-auto flex h-[50%] w-full items-center justify-center md:h-full md:w-[40%] md:items-start lg:w-[50%] lg:items-center">
            <div className="flex h-[80%] w-[95%] flex-col items-center justify-center rounded-lg bg-violet-50 p-5 shadow-lg shadow-violet-500/50 md:h-[65%] md:w-[90%] md:p-10 lg:w-[80%] lg:h-[90%]">
              <p className="text-2xl tracking-widest text-blue-700">
                {product?.name}
              </p>
              <p className="text-xl font-bold tracking-widest">
                Ksh. {product?.price}
              </p>
              <p className="text-xl tracking-widest ">
                Condition: {product?.secondHand ? "Second Hand" : "New"}
              </p>
              <div className="flex h-20 w-full flex-row items-center justify-start gap-24 text-5xl md:gap-36">
                <BsWhatsapp className="cursor-pointer text-green-500 shadow-green-500/50 " />{" "}
                <AiOutlinePhone className="cursor-pointer text-sky-500 " />{" "}
                <AiOutlineMail className="cursor-pointer text-violet-500" />
              </div>
              <p className="text-xl tracking-widest ">
                Location: {product?.location}
              </p>

              <p className="text-xl tracking-widest">By: {user?.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-16 flex h-fit w-[95%] flex-col items-center  justify-start gap-5  md:flex-row">
        <div
          tabIndex={0}
          className="collapse-arrow rounded-box collapse border border-base-300 bg-base-100 shadow shadow-violet-500/50"
        >
          <div className="collapse-title text-xl font-medium">
            Product Details
          </div>
          <div className="collapse-content flex flex-col">
            <div className="mt-2 flex flex-row">
              <div className="w-6/12 bg-slate-200 p-3 outline outline-slate-600">
                Product Description
              </div>
              <div className="w-6/12 p-3 outline outline-slate-600">
                <p> {product?.description}</p>
              </div>
            </div>
            {product?.sizes.length !== 0 && (
              <div className="flex flex-row">
                <div className="w-6/12 bg-slate-200 p-3 outline outline-slate-600">
                  Product sizes
                </div>
                <div className="w-6/12 p-3 outline outline-slate-600">
                  {product?.sizes.map((size, index) => (
                    <p key={index}>{size}</p>
                  ))}
                </div>
              </div>
            )}
            {product?.materials.length !== 0 && (
              <div className="flex flex-row">
                <div className="w-6/12 bg-slate-200 p-3 outline outline-slate-600">
                  Product materials
                </div>
                <div className="w-6/12 p-3 outline outline-slate-600">
                  {product?.materials.map((material, index) => (
                    <p key={index}>{material}</p>
                  ))}
                </div>
              </div>
            )}
            {product?.colors.length !== 0 && (
              <div className="flex flex-row">
                <div className="w-6/12 bg-slate-200 p-3 outline outline-slate-600">
                  Product colors
                </div>
                <div className="w-6/12 p-3 outline outline-slate-600">
                  {product?.colors.map((color, index) => (
                    <span key={index}>{color}, </span>
                  ))}
                  {product?.width && (
                    <div className="flex flex-row">
                      <div className="w-6/12 bg-slate-200 p-3 outline outline-slate-600">
                        Product width
                      </div>
                      <div className="w-6/12 p-3 outline outline-slate-600">
                        <p> {product?.width}</p>
                      </div>
                    </div>
                  )}

                  {product?.length && (
                    <div className="flex flex-row">
                      <div className="w-6/12 bg-slate-200 p-3 outline outline-slate-600">
                        Product length
                      </div>
                      <div className="w-6/12 p-3 outline outline-slate-600">
                        <p> {product?.length}</p>
                      </div>
                    </div>
                  )}
                  {product?.height && (
                    <div className="flex flex-row">
                      <div className="w-6/12 bg-slate-200 p-3 outline outline-slate-600">
                        Product height
                      </div>
                      <div className="w-6/12 p-3 outline outline-slate-600">
                        <p> {product?.height}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductId;

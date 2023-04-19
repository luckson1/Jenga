import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "../../../../utils/api";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { PrismaClient, Product, User } from "@prisma/client";
import { GetStaticProps } from "next";
import Head from "next/head";

const prisma = new PrismaClient();

export async function getStaticPaths() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  });
  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const productId = context?.params?.id as string;
  const p = await prisma.product.findUniqueOrThrow({
    where: {
      id: productId,
    },
    select: {
      name: true,
      id: true,
    },
  });

  return { props: { p } };
};

const ProductId = ({
  p,
}: {
  p: {
    id: string;
    name: string;
  };
}) => {
  const { data: images } = api.image.imagesAndUser.useQuery(
    {
      productId: p.id,
    },
    {
      onSuccess: (images) => setCurrentImage(images.at(0)),
    }
  );
  type Images = {
    url: string;
    id: string;
    productId: string;
    userId: string;
    deleted: boolean;
    Product: Product & {
      user: User;
    };
  };
  const [currentImage, setCurrentImage] = useState<Images>();
  enum DisplayTypes {
    "product",
    "seller",
    "delivery",
  }
  const [display, setDisplay] = useState<DisplayTypes>(DisplayTypes.product);
  const product = images?.at(0)?.Product;
  const user = images?.at(0)?.Product.user;

  return (
    <>
      <Head>
        <title>Jenga</title>
        <meta name="description" content={p.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className=" my-16 flex flex-col gap-10">
        <div className="flex w-screen flex-col h-fit gap-10 min-h-[50vh] ">
          <div className=" flex h-full  w-full flex-col justify-center lg:h-[90%]  lg:flex-row gap-5 lg:pt-10 ">
            <div className="flex h-[50%] w-full flex-col-reverse items-start gap-3 justify-end  lg:h-full lg:w-[50%] lg:flex-row">
              <div className="relative mx-5 flex h-16 w-full flex-row items-center justify-center gap-2 p-1 lg:ml-8 lg:h-full lg:w-16 lg:flex-col">
                {images &&
                  images?.map((image) => (
                    <div
                      key={image.id}
                      className={`relative flex h-12 w-12 cursor-pointer items-center justify-center overflow-scroll rounded-lg lg:h-16 lg:w-16 ${
                        currentImage?.id === image.id
                          ? "outline outline-2 outline-primary"
                          : ""
                      }`}
                      onClick={() => setCurrentImage(image)}
                    >
                      <Image
                        key={image.id}
                        src={image.url}
                        alt={image.Product.name}
                        fill
                        sizes="(max-width: 768px) 40px,
              (max-width: 1200px) 50px,
              50px"
                        className="rounded-lg mx-auto my-auto"
                      />
                    </div>
                  ))}
              </div>
              <div className=" card   mx-auto    flex w-full max-w-3xl   rounded-lg shadow-base-content lg:my-auto  lg:shadow-lg">
                <div className="relative  h-full w-full">
                  <Image
                    src={currentImage?.url ?? "/livingRoom.jpeg"}
                    alt={product?.name ?? " Product"}
                    quality={100}
                    width={200}
                    height={150}
                    sizes="(max-width: 768px) 80vw,
              (max-width: 1200px) 80vw,
              80vw"
                    className="h-full w-full rounded-b-lg sm:rounded-lg"
                  />
                </div>
                {currentImage && images && (
                  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    {/* provide logic of displaying the carousel images */}
                    <button
                      className="btn-circle btn bg-base-100 bg-opacity-30 text-xl text-slate-900"
                      onClick={() =>
                        images?.indexOf(currentImage) === 0
                          ? setCurrentImage(images[images?.length - 1])
                          : setCurrentImage(
                              images?.at(images.indexOf(currentImage) - 1)
                            )
                      }
                    >
                      ❮
                    </button>
                    <button
                      className="btn-circle btn bg-base-100 bg-opacity-30 text-xl text-slate-900"
                      onClick={() =>
                        images?.indexOf(currentImage) === images.length - 1
                          ? setCurrentImage(images[0])
                          : setCurrentImage(
                              images[images.indexOf(currentImage) + 1]
                            )
                      }
                    >
                      ❯
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex h-[50%] w-full flex-col items-start justify-around  lg:h-full lg:w-[50%]">
              <div className=" card mx-auto my-auto   w-full max-w-2xl rounded-lg bg-base-100 shadow-base-content lg:shadow-lg ">
                <div className="card-body w-full gap-5">
                  <p className="text-xl tracking-widest text-blue-700">
                    {product?.name}
                  </p>
                  <p className="text-xl font-bold tracking-widest">
                    Ksh. {product?.price.toLocaleString()}
                  </p>
                  <p className="text-xl tracking-widest ">
                    Condition: {product?.secondHand ? "Ex-UK" : "New"}
                  </p>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-green-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    <BsWhatsapp className="h-6 w-6" /> Whatsapp
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    <AiOutlinePhone className="h-6 w-6 " /> Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mb-16 flex h-fit w-[90%] flex-col  justify-start  gap-5 ">
          <div className="tabs w-full">
            <button
              onClick={() => setDisplay(DisplayTypes.product)}
              className={`tab tab-lifted ${
                display === DisplayTypes.product ? "tab-active" : ""
              }`}
            >
              Product
            </button>
            <button
              onClick={() => setDisplay(DisplayTypes.seller)}
              className={`tab tab-lifted ${
                display === DisplayTypes.seller ? "tab-active" : ""
              }`}
            >
              Seller
            </button>
            <button
              onClick={() => setDisplay(DisplayTypes.delivery)}
              className={`tab tab-lifted ${
                display === DisplayTypes.delivery ? "tab-active" : ""
              }`}
            >
              Delivery
            </button>
          </div>
          {display === DisplayTypes.product && (
            <div className=" flex flex-col gap-5">
              <div className="mt-2 flex flex-col gap-5">
                <p className="h2 text-lg font-bold"> Product Description </p>

                <p> {product?.description}</p>
              </div>
              {product?.sizes.length !== 0 && (
                <div className="flex flex-row gap-5">
                  <p className=" font-bold">Product sizes:</p>

                  {product?.sizes.map((size, index) => (
                    <p key={index}>{size}, </p>
                  ))}
                </div>
              )}
              {product?.materials.length !== 0 && (
                <div className="flex flex-row gap-5">
                  <p className=" font-bold">Product materials:</p>

                  {product?.materials.map((material, index) => (
                    <p key={index}>{material}, </p>
                  ))}
                </div>
              )}
              {product?.colors.length !== 0 && (
                <div className="flex flex-row gap-5">
                  <p className=" font-bold">Product colors:</p>

                  {product?.colors.map((color, index) => (
                    <span key={index}>{color}, </span>
                  ))}
                  {product?.width && (
                    <div className="flex flex-row gap-5">
                      <p className=" font-bold">Product width:</p>

                      <p> {product?.width}</p>
                    </div>
                  )}

                  {product?.length && (
                    <div className="flex flex-row gap-5">
                      <p className=" font-bold">Product length:</p>

                      <p> {product?.length}</p>
                    </div>
                  )}
                  {product?.height && (
                    <div className="flex flex-row gap-5">
                      <p className=" font-bold">Product height:</p>

                      <p> {product?.height}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {display === DisplayTypes.seller && (
            <div className=" flex flex-col gap-5">
              <div className="flex flex-row gap-5">
                <p className=" font-bold">Business Name:</p>

                <p> {user?.businessName}</p>
              </div>
              <div className="flex flex-row gap-5">
                <p className=" font-bold">Business Location:</p>

                <p> {user?.location}</p>
              </div>
              <div className="flex flex-row gap-5">
                <p className=" font-bold">Business Email:</p>

                <p> {user?.website}</p>
              </div>
            </div>
          )}

          {display === DisplayTypes["delivery"] && (
            <div className=" flex flex-col gap-5">
              <div className="flex flex-row gap-5">
                <p className=" font-bold">Delivery Information:</p>

                <p>
                  {" "}
                  Latest delivery information available on the retailer website{" "}
                  <a
                    href={`https://${user?.website ?? "/"}`}
                    target="_blank"
                    rel="noreferrer nofollow"
                    className="text-sky-500 underline"
                  >
                    here
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductId;

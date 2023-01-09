import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GiSofa } from "react-icons/gi";
import { MdEngineering } from "react-icons/md";
import Nav from "./components/navigation/Nav";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Building your Dreams" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <div className="w-screen h-screen flex flex-col md:flex-row mt-16 ">
        <div className=" w-full md:w-[60%] h-[40%] md:h-full bg-gradient-to-r from-purple-50 via-violet-50 to-white px-5 md:px-10 flex flex-col justify-around py-10">
          <div className="   flex flex-col gap-2 md:gap-4 mx-auto md:mx-6 w-[95%] md:w-[60%]">
            <p className="text-3xl font-bold tracking-widest text-violet-600">
              Make Your Dream House Come True
            </p>
            <p className=" text-lg lg:text-xl tracking-wider">
              Jenga Helps You Discover Home Improvement Professionals and
              Products for Your Dream Spaces.
            </p>

            <button className=" w-full text-lg py-1.5 rounded-full hover:bg-violet-400 mt-5  font-light text-violet-700 outline outline-violet-700 hover:outline-none bg-violet-200 bg-opacity-70 hover:text-white">
              Sign Up
            </button>
          </div>

          <div className="md:flex flex-col items-start gap-3 mx-2 lg:mx-4 hidden">
            <div className="inline-block">
              <p className="text-lg mb-4">Hire Pros:</p>
              <div className="flex flex-row gap-3 align-baseline flex-wrap">
                <button className="px-3 text-sm py-1 rounded-full bg-inherit bg-opacity-20 font-light text-violet-700 outline outline-violet-700 hover:outline hover:bg-white transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105">
                  Interior Designers
                </button>
                <button className="px-3 text-sm py-1 rounded-full bg-inherit bg-opacity-20 font-light text-violet-700 outline outline-violet-700 hover:outline hover:bg-white transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105">
                  Architects
                </button>
                <button className="px-3 text-sm py-1 rounded-full bg-inherit bg-opacity-20 font-light text-violet-700 outline outline-violet-700 hover:outline hover:bg-white transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105">
                  Carpenters
                </button>
                <button className="px-3 text-sm py-1 rounded-full bg-inherit bg-opacity-20 font-light text-violet-700 outline outline-violet-700 hover:outline hover:bg-white transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105">
                  See More
                </button>
              </div>
            </div>
            <div className="inline-block">
              <p className="text-lg mb-4">Shop:</p>
              <div className="flex flex-row gap-3 align-baseline flex-wrap">
                <button
                  className="px-3 text-sm py-1 rounded-full bg-inherit bg-opacity-20 font-light text-violet-700 outline outline-violet-700 hover:outline hover:bg-white transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105"
                  onClick={() => router.push("/products/furniture")}
                >
                  Furniture
                </button>
                <button
                  className="px-3 text-sm py-1 rounded-full bg-inherit bg-opacity-20 font-light text-violet-700 outline outline-violet-700 hover:outline hover:bg-white transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105"
                  onClick={() => router.push("/products/lighting")}
                >
                  Lighting
                </button>
                <button
                  className="px-3 text-sm py-1 rounded-full bg-inherit bg-opacity-20 font-light text-violet-700 outline outline-violet-700 hover:outline hover:bg-white transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105"
                  onClick={() => router.push("/products/kitchen")}
                >
                  Kitchen Fittings
                </button>
                <button
                  className="px-3 text-sm py-1 rounded-full bg-inherit bg-opacity-20 font-light text-violet-700 outline outline-violet-700 hover:outline hover:bg-white transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105"
                  onClick={() => router.push("/products")}
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[40%] bg-white h-[60%] md:h-full flex flex-col  items-center justify-around relative text-sky-600 ">
          <Image
            fill
            src="/warmKitchen.jpeg"
            alt="Kitchen"
            className="opacity-40"
          />
          <div className="mx-4 md:mx-6  flex flex-col gap-3 md:gap-6 z-10">
            <p className="text-3xl font-bold tracking-widest">
              Join Thousands of Home Professionals for Free
            </p>
            <p className=" text-lg lg:text-xl font-bold text-slate-900 tracking-wider">
              You will Win Better Clients and Offer Great Customer Experience
              with Our Marketing and Project Management Tools.
            </p>

            <button className="w-[60%] text-sm py-2 rounded-lg hover:bg-blue-400  font-light text-blue-700 outline outline-blue-700 hover:outline-none bg-blue-300 bg-opacity-30 hover:text-white">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="w-screen h-screen flex flex-col  ">
        <p className="text-2xl mt-10 text-center ">
          Things You can Do on Jenga
        </p>
        <div className=" w-full md:w-[90%] h-[35%] flex flex-row flex-wrap justify-around mt-5 mx-auto">
          <Link
            href="/products"
            className="bg-slate-50 h-32 w-32  md:w-[40%] rounded-md flex  flex-col md:flex-row  items-center shadow-md gap-5 md:gap-7 px-3 md:px-5 cursor-pointer"
          >
            <GiSofa className="text-[60px] md:text-[80px] text-sky-400" />
            <p className="text-slate-600 hover:text-sky-400">
              Shop for Products
            </p>
          </Link>
          <div className="bg-slate-50 h-32 w-32 md:w-[40%] rounded-md flex flex-col md:flex-row  items-center shadow-md gap-5 md:gap-7 px-3 md:px-5 cursor-pointer">
            <MdEngineering className="text-[60px] md:text-[80px] text-sky-400" />
            <p className="text-slate-600 hover:text-sky-400">Browse Pros</p>
          </div>
        </div>
        <div className=" w-[90%] h-[60%]  flex md:flex-row flex-col bg-[#1B2430] rounded-3xl gap-7 my-16 py-16 mx-auto">
          <div className="flex flex-col justify-center items-center w-full md:w-[60%]">
            <p className="text-3xl tracking-widest text-slate-100 ml-4 md:ml-16">
              In the House Improvement Journey, You Wont Walk Alone
            </p>
            <p className="text-white text-large tracking-wider text-start ml-4 mt-4">
              Find inspiration, products and the pros to make it happen — all in
              one place
            </p>
          </div>
          <div className="flex flex-col justify-center items-center align-baseline w-full md:w-[40%]">
            <p className="text-xl text-slate-100 mx-5  md:mx-15 my-7">
              {" "}
              Become a Member
            </p>
            <button className="w-[60%] text-lg py-2 rounded-full hover:bg-sky-400 mt-5  font-light text-sky-700 outline outline-sky-700 hover:outline-none bg-sky-200 bg-opacity-70 hover:text-white">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

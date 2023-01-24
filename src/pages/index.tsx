import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GiSofa } from "react-icons/gi";
import { MdEngineering } from "react-icons/md";

export default function Home() {
  const router = useRouter();
  const { status, data } = useSession();
  const userImage=data?.user?.image ?? " /kitche.jpg"
  const userName=data?.user?.name ?? "Profile Pic"
  const authenticated = status === "authenticated";

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Building your Dreams" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <div className="w-screen h-screen flex flex-col md:flex-row mt-0 md:mt-16 ">
        <div className=" w-full md:w-[60%] h-[40%] md:h-full bg-gradient-to-r from-purple-50 via-violet-50 to-white px-5 md:px-10 flex flex-col justify-around py-10">
          <div className="   flex flex-col gap-2 md:gap-4 mx-auto md:mx-6 w-[95%] md:w-[60%]">
            <p className="text-3xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-teal-500 to-pink-400">
              Make Your Dream House Come True
            </p>
            <p className=" text-lg lg:text-xl tracking-wider">
              Jenga Helps You Discover Home Improvement Professionals and
              Products for Your Dream Spaces.
            </p>

          { !authenticated && <button className=" w-full text-lg py-1.5 rounded-full hover:bg-violet-400 mt-5  font-light text-violet-700 outline outline-violet-700 hover:outline-none bg-violet-200 bg-opacity-70 hover:text-white"
            onClick={()=> router.push("/auth")}>
              Sign Up
            </button>}
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

           {!authenticated && <button className="w-[60%] text-sm py-2 rounded-lg hover:bg-blue-400  font-light text-blue-700 outline outline-blue-700 hover:outline-none bg-blue-300 bg-opacity-30 hover:text-white"
           onClick={()=> router.push("/auth")}>
              Join
            </button>}
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
        <div className=" w-[90%] h-[60%]  flex md:flex-row flex-col bg-[#1B2430] rounded-3xl gap-7 my-16 py-16 mx-auto mb-10">
          <div className="flex flex-col justify-center items-center w-full md:w-[60%]">
            <p className=" text-xl md:text-3xl tracking-widest text-slate-100 ml-4 md:ml-16">
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
           {!authenticated && <button className="w-[50%] md:w-[60%] text-lg py-2 rounded-full hover:bg-sky-400 mt-5  font-light text-sky-700 outline outline-sky-700 hover:outline-none bg-sky-200 bg-opacity-70 hover:text-white"
            onClick={()=> router.push("/auth")}>
              Sign Up
            </button>}
          </div>
        </div>
      </div>
      <svg
          className="wave-top   mt-0 bg-gradient-to-r from-violet-200 via-purple-200 to-violet-200"
          viewBox="0 0 1439 147"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
              <g className="wave" fill="#f8fafc">
                <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"></path>
              </g>
              <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
                <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                  <path
                    d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                    opacity="0.100000001"
                  ></path>
                  <path
                    d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                    opacity="0.100000001"
                  ></path>
                  <path
                    d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                    opacity="0.200000003"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <footer className="mx-auto mb-0 mt-0 w-full bg-gradient-to-r from-violet-200 via-purple-200 to-violet-200 py-6 text-center  ">
          <div className="container mx-auto px-8">
            <div className="flex w-full flex-col py-6 md:flex-row">
              <div className="mb-6 flex-1 text-black"></div>
              <div className="flex-1">
                <p className="uppercase text-gray-900   md:mb-6 ">Links</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 mr-2 inline-block md:mr-0 md:block">
                    <Link
                      href="/"
                      className="text-gray-900 no-underline hover:text-pink-500   hover:underline"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 inline-block md:mr-0 md:block">
                    <Link
                      href="/"
                      className="text-gray-900 no-underline hover:text-pink-500   hover:underline"
                    >
                      Help
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 inline-block md:mr-0 md:block">
                    <Link
                      href="/"
                      className="text-gray-900 no-underline hover:text-pink-500   hover:underline"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="uppercase text-gray-900   md:mb-6">Legal</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 mr-2 inline-block md:mr-0 md:block">
                    <Link
                      href="/"
                      className="text-gray-900 no-underline hover:text-pink-500   hover:underline"
                    >
                      Terms
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 inline-block md:mr-0 md:block">
                    <Link
                      href="/"
                      className="text-gray-900 no-underline hover:text-pink-500   hover:underline"
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="uppercase text-gray-900   md:mb-6">Social</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 mr-2 inline-block md:mr-0 md:block">
                    <Link
                      href="/"
                      className="text-gray-900 no-underline hover:text-pink-500   hover:underline"
                    >
                      Facebook
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 inline-block md:mr-0 md:block">
                    <Link
                      href="/"
                      className="text-gray-900 no-underline hover:text-pink-500   hover:underline"
                    >
                      Linkedin
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 inline-block md:mr-0 md:block">
                    <Link
                      href="/"
                      className="text-gray-900 no-underline hover:text-pink-500   hover:underline"
                    >
                      Twitter
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="uppercase text-gray-900   md:mb-6">Company</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 mr-2 inline-block md:mr-0 md:block">
                    <Link
                      href="/"
                      className="text-gray-900 no-underline hover:text-pink-500   hover:underline"
                    >
                      Official Blog
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 inline-block md:mr-0 md:block">
                    <Link
                      href="/"
                      className="text-gray-900 no-underline hover:text-pink-500   hover:underline"
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="mt-2 mr-2 inline-block md:mr-0 md:block">
                    <Link
                      href="/"
                      className="text-gray-900 no-underline hover:text-pink-500   hover:underline"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
    </>
  );
}

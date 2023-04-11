import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GiSofa } from "react-icons/gi";
import { MdEngineering } from "react-icons/md";
import CategoryDisplay from "../components/display/Departments";

const prisma = new PrismaClient();
export const getStaticProps: GetStaticProps = async (context) => {
  const departments = await prisma.department.findMany({
    select: {
      name: true,
      id: true,
      Url: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  return { props: { departments } };
};

export default function Home({
  departments,
}: {
  departments: {
    name: string;
    id: string;
    Url: string | null;
  }[];
}) {
  const router = useRouter();
  const { status } = useSession();
  const authenticated = status === "authenticated";
  

  return (
    <>
      <Head>
        <title>Jenga</title>
        <meta name="description" content="Build your Dream Spaces" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="mt-16 flex h-[calc(100vh-4rem)] w-full flex-col  md:flex-row ">
        <div className=" flex h-[50%] w-full flex-col justify-around bg-base-200 px-5 py-10 md:h-full md:w-[50%] lg:w-[60%] md:px-10">
          <div className="mx-auto flex w-[95%] flex-col gap-10 md:mx-6 md:w-[60%] ">
            <p className="bg-gradient-to-r from-violet-500 via-teal-500 to-pink-400 bg-clip-text text-3xl font-bold tracking-widest text-transparent">
              Make Your Dream House Come True
            </p>
            <p className=" text-lg tracking-wider lg:text-xl">
              Jenga Helps You Discover Home Improvement Products for Your Dream
              Spaces.
            </p>

            <button
              onClick={() => router.push("/departments")}
              type="button"
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Visit Shop
            </button>
          </div>
        </div>

        <div className=" relative flex h-[50%] w-full flex-col justify-around bg-base-200 px-5 py-10 md:h-full md:w-[50%] lg:w-[40%] md:px-10">
          <Image
            fill
            src="/warmKitchen.jpeg"
            alt="Kitchen"
            className="opacity-60"
          />
       <div className="mx-auto flex w-[95%] flex-col gap-10  md:w-[80%] z-10">
            <p className="text-3xl font-bold tracking-widest text-blue-600">
              Join Hundreds of Retailers for Free
            </p>
            <p className=" text-lg font-bold tracking-wider text-slate-900 lg:text-xl">
              You will Win Better Customers and Offer Great Customer Experience.
            </p>

            {!authenticated && (
              <button
                type="button"
                className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                onClick={
                  authenticated
                    ? () => router.push("/dashboard/onboarding")
                    : () => router.push("/vendorAuth")
                }
              >
                Join & Sell
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex min-h-full h-fit w-full flex-col  bg-base-100">
      <div className="mb-16 bg-base-100 text-center my-16 w-full">
        <h1 className="my-5 text-2xl">Shop by a Department</h1>
        <div className=" flex flex-col justify-center w-full md:w-[90%]  items-center md:grid h-fit  gap-7  py-5  md:grid-cols-2 md:gap-10 md:py-10 lg:grid-cols-3 mx-auto">
          {departments?.map((d) => (
            <div key={d.id}>
              <CategoryDisplay department={d} />
            </div>
          ))}
        </div>
        </div>
 
        <div className=" my-16 mx-auto  mb-10 flex h-[60%] w-[90%] flex-col gap-7 rounded-3xl bg-[#1B2430] hover:bg-[#1B2430] py-16 md:flex-row card  glass shadow-accent shadow-lg">
          <div className="flex w-full flex-col items-center justify-center md:w-[60%] h-96 ">
          <div className="card-body">
            <p className="  text-xl tracking-widest text-slate-100 md:ml-16 md:text-3xl">
              In the House Improvement Journey, You Wont Walk Alone
            </p>
            <p className="text-large  mt-4 text-start tracking-wider text-white">
              Find inspiration, products and the pros to make it happen — all in
              one place
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-center align-baseline md:w-[40%]">
            <p className="my-7  text-xl text-slate-100">
              {" "}
              Become a Member
            </p>
            {!authenticated && (
              <button
                type="button"
                className="inline-flex  w-full max-w-xs items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                onClick={
                  authenticated
                    ? () => router.push("/dashboard/onboarding")
                    : () => router.push("/vendorAuth")
                }
              >
                Sign Up
              </button>
            )}
          </div>
          </div>
        </div>
      </div>
      <div className="h-fit w-full mt-10">
      <svg
        className="wave-top   mt-0 bg-gradient-to-r from-violet-200 via-purple-200 to-violet-200"
        viewBox="0 0 1439 147"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
            <g className="wave" fill='hsl(var(--b1)'>
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
        <div className="w-full mx-auto px-8">
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
      </div>
    </>
  );
}

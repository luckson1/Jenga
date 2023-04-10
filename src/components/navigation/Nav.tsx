import React from "react";
import { FaHouseUser } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import ProfileCard from "../display/ProfileCard";
import { NavMenu } from "./NavMenu";
import { MdOutlineSell } from "react-icons/md";

function Nav() {
  const router = useRouter();
  const { status, data } = useSession();
  const userImage = data?.user?.image ?? " /kitche.jpg";
  const userName = data?.user?.name ?? "Profile Pic";
  const authenticated = status === "authenticated";
  const handleLogout = () => {
    signOut();
  };
  return (
    <nav className=" fixed  top-0 z-30 flex h-16  w-full flex-row justify-between   bg-base-200 px-3 shadow-slate-500/100 md:mx-0  md:h-16 md:px-12 ">
      <div className="h-full w-fit items-center justify-center text-sm capitalize hidden sm:flex">
        {" "}
        <button
          className="inline-flex items-center  justify-center gap-2 rounded-md border border-transparent py-2 px-3 text-sm font-semibold text-base-content transition-all hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => router.push("/")}
        >
          {" "}
          <FaHouseUser className="h-4 w-4" /> Home
        </button>
      </div>
      <div className="md:w-[40%]flex-row my-auto flex w-[20%] justify-start gap-3 md:justify-center md:gap-6   lg:justify-end">
        <NavMenu />
      </div>
      <div className="h-full w-fit items-center justify-center text-sm capitalize sm:hidden flex">
        {" "}
        <button
          className="inline-flex items-center  justify-center gap-2 rounded-md border border-transparent py-2 px-3 text-sm font-semibold text-base-content transition-all hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => router.push("/")}
        >
          {" "}
          <FaHouseUser className="h-4 w-4" /> Home
        </button>
      </div>
      <div className="my-auto flex w-[50%] flex-row justify-center  gap-4 pr-5 md:w-[30%]">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent py-2 px-3 text-sm font-semibold text-base-content transition-all hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={
            authenticated
              ? () => router.push("/dashboard/onboarding")
              : () => router.push("/vendorAuth")
          }
        >
          <MdOutlineSell className="h-4 w-4" /> Sell
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent py-2 px-3 text-sm font-semibold text-blue-500 transition-all hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={authenticated ? () => signOut() : () => router.push("/auth")}
        >
          {authenticated ? (
            <ProfileCard src={userImage} alt={userName} />
          ) : (
            <IoIosLogIn className="h-4 w-4" />
          )}{" "}
          {authenticated ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}

export default Nav;

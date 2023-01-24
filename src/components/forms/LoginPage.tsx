import React from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook} from "react-icons/bs";

export const LoginCard = () => {
  return (
    <div className="items-centerpx-10 absolute left-0 right-0 top-20 ml-auto mr-auto flex h-fit w-11/12  flex-row justify-center   rounded-lg bg-white pb-7 pt-5 shadow-2xl  sm:top-28 md:w-6/12 md:gap-5 ">
      <section className=" w-10/11 flex flex-col items-center justify-center">
        <div className="mb-5 flex w-72 flex-row gap-3">
          <p className="mb-3 tracking-wider text-violet-500">Login With:</p>
        </div>

        <>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className=" mb-5 flex h-10 w-72 flex-row items-center justify-between rounded border-2 border-slate-700 px-7"
          >
            <p className="tracking-[5px] text-slate-700">Google </p>
            <FcGoogle size={"30px"} />
          </button>
          <button
            onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
            className=" flex h-10 w-72 flex-row items-center justify-between rounded border-2 border-slate-700 px-7"
          >
            <p className="tracking-[5px] text-slate-700">Facebook</p>
            <BsFacebook size={"30px"} className="text-blue-600" />
          </button>
        </>
      </section>
    </div>
  );
};

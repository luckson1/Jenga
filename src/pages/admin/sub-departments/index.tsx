import React, { useCallback, useState } from "react";
import Department from "../../../components/forms/Deparment";
import SubDepartment from "../../../components/forms/SubDepartments";
import Head from "next/head";

const Index = () => {
    const [isShowModal, setIsShowModal]=useState(false)
    const handleForm= useCallback(()=> {
setIsShowModal(!isShowModal)
    }, [isShowModal])


  return (
    <>
     <Head>
        <title>Jenga</title>
        <meta name="description" content="Build your Dream Spaces" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
    <div className="mt-0 md:mt-16 flex h-screen w-screen flex-col bg-gradient-to-tr from-white via-white to-violet-50">
      <div className="flex h-16 w-full  flex-row items-center justify-around ">
        <div className="w-[60%]">.</div>
        <button className="my-auto mx-auto rounded-md bg-inherit px-5 h-8 py-1 text-violet-400 outline outline-1 outline-violet-400 hover:bg-violet-400 hover:text-white"
        onClick={handleForm}>
         + Add Sub-Department
        </button>
       
      </div>
      <div className="">
         { isShowModal && <SubDepartment handleClose={handleForm} />}
        </div>
        <div>

        </div>
    </div>
    </>
  );
};

export default Index;

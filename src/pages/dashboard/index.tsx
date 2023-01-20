import { useRouter } from "next/router";


const Index = () => {

const router= useRouter()
  return (
    <div className="mt-16 flex h-screen w-screen flex-col bg-gradient-to-tr from-white via-white to-violet-50">
      <div className="flex h-16 w-full  flex-row items-center justify-around ">
        <div className="w-[60%]">.</div>
        <button
          className=" my-auto mx-auto h-8 rounded-md bg-violet-500 bg-opacity-30 px-5 py-1 text-violet-700 outline outline-1 outline-violet-700 hover:bg-violet-400 hover:bg-opacity-100 hover:text-white "
          onClick={()=> router.push('/dashboard/productform')}
        >
          + Add product
        </button>
      </div>
    </div>
  );
};

export default Index;

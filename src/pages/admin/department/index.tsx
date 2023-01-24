import React, { useCallback, useState } from "react";
import Department from "../../../components/forms/Deparment";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";

const Index = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const handleForm = useCallback(() => {
    setIsShowModal(!isShowModal);
  }, [isShowModal]);
  const context = api.useContext();
  const { data: departments } = api.departments.getAll.useQuery();

//navigation
const router=useRouter()
  return (
    <div className="mt-0 md:mt-16 flex h-screen w-screen flex-col bg-gradient-to-tr from-white via-white to-violet-50">
      <div className="flex h-16 w-full  flex-row items-center justify-around ">
        <div className="w-[60%]">.</div>
        <button
          className="my-auto mx-auto h-8 rounded-md bg-inherit px-5 py-1 text-violet-400 outline outline-1 outline-violet-400 hover:bg-violet-400 hover:text-white"
          onClick={handleForm}
        >
          + Add Department
        </button>
      </div>
      <div className="">
        {isShowModal && <Department handleClose={handleForm} />}
      </div>
      <div>
        {departments?.map((d) => (
          <div key={d.id} className="ml-10 flex flex-row gap-10 bg-slate-200 cursor-pointer h-12" onClick={()=> router.push(`/admin/departments/${d.id}`)}>
        
            {d.name}
         <p>
         &#123;  params: &#123;id: {d.id}  &#125;&#125;,
         </p>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Index;

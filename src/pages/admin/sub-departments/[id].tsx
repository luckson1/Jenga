import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react'
import { api } from '../../../utils/api';
import Categories from '../../../components/forms/categories';

const SubDepartment = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const handleForm = useCallback(() => {
      setIsShowModal(!isShowModal);
    }, [isShowModal]);
    const router= useRouter()
    const departmentId=router?.query.id as unknown
    const id= departmentId as string
    const {data: subDepartment}=api.subDepartments.getOne.useQuery({id})
const categories=subDepartment?.Category
  return (
<div className="mt-0 md:mt-16 flex h-screen w-screen flex-col bg-gradient-to-tr from-white via-white to-violet-50">
    <div className="flex h-16 w-full  flex-row items-center justify-around ">
    <div className="w-[60%]">.</div>
        <button
          className="my-auto mx-auto h-8 rounded-md bg-inherit px-5 py-1 text-violet-400 outline outline-1 outline-violet-400 hover:bg-violet-400 hover:text-white"
          onClick={handleForm}
        >
          + Add Category
        </button>
    </div>
    <div className="">
      {isShowModal && <Categories handleClose={handleForm} subDepartmentId={id} />}
    </div>
    <div>
      {categories?.map((c) => (
        <div key={c.id} className="ml-10 flex flex-row bg-slate-200 cursor-pointer h-12" onClick={()=> router.push(`/admin/sub-departments/${c.id}`)}>
      
          {c.name}
      
        </div>
      ))}
    </div>
  </div>
  )
}

export default SubDepartment
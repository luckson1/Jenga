import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { api } from '../../../utils/api'
import SubDepartment from '../../../components/forms/SubDepartments';
import Head from 'next/head';

const Department = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const handleForm = useCallback(() => {
      setIsShowModal(!isShowModal);
    }, [isShowModal]);
    const router= useRouter()
    const departmentId=router?.query.id as unknown
    const id= departmentId as string

const {data: department}=api.departments.getOne.useQuery({id})
const subDepartments=department?.SubDepartment
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
     
    </div>
    <div className="">
      {isShowModal && <SubDepartment handleClose={handleForm} />}
    </div>
    <div>
      {subDepartments?.map((s) => (
        <div key={s.id} className="ml-10 flex flex-row bg-slate-200 cursor-pointer h-12" onClick={()=> router.push(`/admin/sub-departments/${s.id}`)}>
      
          {s.name}
          
       
        </div>
      ))}
    </div>
  </div>
  </>
  )
}

export default Department
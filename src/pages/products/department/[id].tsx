




  import React from 'react'

import SubCategory from '../../../components/display/Category'
import { api } from '../../../utils/api'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import { Department, SubDepartment } from '@prisma/client'
import Loading from '../../../components/display/LoadingComponent'


const DepartmentId  = ()=> {

    const router=useRouter()
    const id= router.query.id as string
    const {data: department, isLoading}=api.departments.getOne.useQuery({id})
const subDepartments=department?.SubDepartment

  return (
    <>

    <div className=' mt-0 mb-16 md:mb-10 md:mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
      <h1 className='my-5 text-2xl'>
{     department?.name}
      </h1>
{isLoading? <div className="w-96 h-96 m-auto"> <Loading /> </div> :subDepartments?.map(subDepartment=> (
  <section className='h-fit w-screen flex flex-col' key={subDepartment.id}>
  <p className='text-center text-xl mx-2 text-black'> {subDepartment.name}</p>
<div className='h-fit w-screen justify-center md:justify-start md:px-7 py-5 md:py-10 flex flex-row  flex-wrap mx-3 md:x-7 gap-5 md:gap-10 '>
      {subDepartment.Category.map(c=> (<div key={c.id} ><SubCategory  category={c} /> </div>))}

    </div>

</section>
))  }




  
  
    </div>
    </>
  )
}

export default DepartmentId
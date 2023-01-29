import React from 'react'
import CategoryDisplay from '../../components/display/Departments'
import { useRouter } from 'next/router'
import { api } from '../../utils/api'
import Loading from '../../components/display/LoadingComponent'
import { PrismaClient } from '@prisma/client'
import { GetStaticProps } from 'next'

const prisma = new PrismaClient();
export const getStaticProps: GetStaticProps = async (context) => {
  const departments= await prisma.department.findMany({
    select:{
      name:true,
      id:true,
      Url:true
    }
  })
  return {props: {departments}}
}

const Products = ({departments}: {departments: {
  name: string;
  id: string;
  Url: string | null;
}[]}) => {

  return (
    <>

    <div className='bg-white mb-16 md:mb-10 md:mt-16 text-center'>
    <h1 className='my-5 text-2xl'>Select a Department</h1>
      <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap justify-center gap-7 md:gap-10 '>
        { departments?.map(d=> (
<div key={d.id} >

 <CategoryDisplay department={d}/>
</div>
        
        ))}

      </div>
    </div>
    </>
  )
}

export default Products
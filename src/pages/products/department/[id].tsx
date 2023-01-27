




  import React from 'react'

import SubCategory from '../../../components/display/Category'
import { api } from '../../../utils/api'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import { Department, SubDepartment } from '@prisma/client'
import Loading from '../../../components/display/LoadingSmall'
// export async function getStaticPaths() {
//     return {
//       paths: [
//         { params: {id:" 2dc58cdc-58a2-4544-a063-9f4cf591e329" }},
  
//   { params: {id: "a9715500-60ae-4a79-880e-23cf7845441b" }},
  
//   { params: {id: "679a977d-d9e8-428c-b9d2-0277a2ec53e7" }},
  
//   { params: {id: "d7ff4ac1-e48a-40a5-9dff-6889be0e7ef4 "}},
  
//   { params: {id: "e9f1b4ab-3d65-48d8-957b-3c8c4e4170d3" }},
  
//   { params: {id: "ea687f54-484a-494a-a297-e71932bd1b9d "}},
//       ],
//       fallback: false,
//     }
//   }
  
//   export const getStaticProps: GetStaticProps = (context ) => {
// //get id from query params

// const params= context.params as unknown
// console.log(params)
// const id=params as string

// const {data: department}=api.departments.getOne.useQuery({id})

//     return {
//       // Passed to the page component as props
  
  
//       props: {
//         department,
//        },
//     }
//   }
  

// const DepartmentId  = ({department}: { department:  (Department & {
//     SubDepartment: (SubDepartment & {
//         Category: {
//             id: string;
//             name: string;
//             Url: string | null;
//         }[];
//     })[];
// }) | null | undefined }) => {

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
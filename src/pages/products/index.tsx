import React from 'react'
import CategoryDisplay from '../../components/display/Departments'
import { useRouter } from 'next/router'
import { productCategories } from '../../components/assets/assets'
import Nav from '../../components/navigation/Nav'
import { api } from '../../utils/api'
import Loading from '../../components/display/LoadingSmall'

const Products = () => {
  const router= useRouter()
  const {data: departments, isLoading}=api.departments.getAll.useQuery()
  console.log(isLoading)
  return (
    <>

    <div className='bg-white mt-16 text-center'>
      <h1> Products</h1>
      <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap justify-center gap-7 md:gap-10 '>
        {departments?.map(d=> (
<div key={d.id} >

{isLoading?  <Loading />: <CategoryDisplay department={d}/>}
</div>
        
        ))}

      </div>
    </div>
    </>
  )
}

export default Products
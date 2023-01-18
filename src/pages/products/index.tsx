import React from 'react'
import CategoryDisplay from '../../components/display/CategoryDisplay'
import { useRouter } from 'next/router'
import { productCategories } from '../../components/assets/assets'
import Nav from '../../components/navigation/Nav'

const Products = () => {
  const router= useRouter()
  return (
    <>

    <div className='bg-white mt-16 text-center'>
      <h1> Products</h1>
      <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap justify-center gap-7 md:gap-10 '>
        {productCategories.map(c=> (
<div key={c.i} >

<CategoryDisplay category={c}/>
</div>
        
        ))}

      </div>
    </div>
    </>
  )
}

export default Products
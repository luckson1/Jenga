import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
export interface Category {
    image: string,
    name: string,
    i: number
    url:string
}

const CategoryDisplay = ({category}: {category:Category}) => {
    const router= useRouter()
  return (
    <div className= "h-64 w-64 lg:w-72 lg:h-72 rounded-md   bg-cover  bg-center flex justify-center items-center relative"  >
         <Image
         alt={category?.name}
            src= {category?.image}
          fill
          sizes="(max-width: 288px) 288px,(max-height: 288px) 288px "
        
            quality={50}
            className="rounded-2xl"
        />
        <button className='bg-violet-400 bg-opacity-70 text-violet-700 py-2 w-32 rounded-full outline outline-violet-700  hover:outline-none hover:bg-violet-700 hover:text-slate-100 z-10 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105' onClick={()=> router.push(category?.url)}>{category?.name}</button>

    </div>
  )
}

export default CategoryDisplay
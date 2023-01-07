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
    const {name, image, url}=category
    const router= useRouter()
  return (
    <div className= "h-28  w-36 md:h-64 md:w-64 lg:w-72 lg:h-72 rounded-md   bg-cover  bg-center flex justify-center items-center relative"  >
         <Image
         alt={name}
            src= {image}
          fill
            quality={100}
            className="rounded-2xl"
        />
        <button className='bg-violet-400 bg-opacity-70 text-violet-700 py-2 w-28 rounded-full outline outline-violet-700 hidden md:block hover:outline-none hover:bg-violet-700 hover:text-slate-100 z-10 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105' onClick={()=> router.push(url)}>{name}</button>

    </div>
  )
}

export default CategoryDisplay
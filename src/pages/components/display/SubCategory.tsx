import Image from 'next/image'
import React from 'react'
export interface Category {
    image: string,
    name: string,
    i: number
}

const SubCategory = ({category}: {category:Category}) => {
   
  return (
  <div className='h-36  w-36 md:h-44 md:w-44 lg:w-48 lg:h-48 rounded-md  bg-center flex flex-col justify-center items-start bg-white cursor-pointer shadow-md hover:shadow-xl pt-0 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105'>
      <div className=" relative h-[80%]  w-[100%] md:h-[80%] md:w-[100%] lg:w-[100%] lg:h-[80%] rounded-md  bg-center flex flex-col justify-center gap-10  "  >
   <Image alt= {`${category?.name}` } src={`${category?.image}`} fill className='rounded-t-md md mt-0'/>
       

    </div>
    <div className='h-[20%]'>
    <p className=' text-blue-500  ml-2 md:ml-5 text-xs md:text-sm'>{category?.name}</p>
    </div>
  </div>
  )
}

export default SubCategory
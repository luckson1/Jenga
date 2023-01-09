import React from 'react'
import { FaHouseUser} from 'react-icons/fa'
import { AiOutlineShoppingCart} from 'react-icons/ai'
import { CgProfile} from 'react-icons/cg'
import { MdEngineering } from 'react-icons/md'

function Nav() {
  return (
    <nav className=" fixed top-0 z-30 mx-0  flex h-16  w-screen flex-row justify-between  bg-white px-3 ">
      <div className='h-12 flex items-baseline my-auto mx-3 md:mx-5 w-[20%]'>
      <FaHouseUser className='h-8 w-8 text-blue-700' />
      </div>
      <div className='flex my-auto flex-row px-4 justify-start md:justify-center lg:justify-end md:px-8 gap-6 md:gap-16  w-[60%]'>
        <div className='flex  flex-col md:flex-row transition duration-300 ease-in-out transform hover:-translate-x-1 hover:scale-105 align-baseline gap-0.5 md:gap-2 cursor-pointer'>
<AiOutlineShoppingCart className='text-2xl  text-pink-300'/>
<p className='hover:text-sky-500'>Shop</p>
        </div>
        <div className='flex  flex-col md:flex-row transition duration-300 ease-in-out transform hover:-translate-x-1 hover:scale-105 align-baseline gap-0.5 md:gap-2 cursor-pointer'>
<MdEngineering className='text-2xl  text-sky-400'/>
<p className='hover:text-sky-500'>Find Pros</p>
        </div>
     

      </div>
      <div className='flex my-auto flex-row  justify-center  w-[20%]'>
      <div className='flex  flex-col md:flex-row transition duration-300 ease-in-out transform hover:-translate-x-1 hover:scale-105 align-baseline gap-0.5 md:gap-2 cursor-pointer'>
<CgProfile className='text-2xl  text-violet-300'/>
<p className='hover:text-sky-500'>Login</p>
        </div>
      </div>

    </nav>
  )
}

export default Nav
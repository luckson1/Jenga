import React from 'react'
import { FaHouseUser} from 'react-icons/fa'
import { AiOutlineShoppingCart} from 'react-icons/ai'
import { CgProfile} from 'react-icons/cg'
import { MdEngineering } from 'react-icons/md'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import ProfileCard from '../ProfileCard'


function Nav() {
  const router=useRouter()
  const { status, data } = useSession();
  const userImage=data?.user?.image ?? " /kitche.jpg"
  const userName=data?.user?.name ?? "Profile Pic"
  const authenticated = status === "authenticated";
  const handleLogout = () => {
    signOut();
  };
  return (
    <nav className=" fixed top-0 z-30 mx-0  flex h-16  w-screen flex-row justify-between  bg-white px-3 ">
      <div className='h-12 flex items-baseline my-auto mx-3 md:mx-5 w-[20%]'>
      <FaHouseUser className='h-6 w-6 text-violet-700 cursor-pointer' onClick={()=> router.push("/")}/>
      </div>
      <div className='flex my-auto flex-row px-4 justify-start md:justify-center lg:justify-end md:px-8 gap-6 md:gap-16  w-[60%]'>
        <div className='flex  flex-col md:flex-row transition duration-300 ease-in-out transform hover:-translate-x-1 hover:scale-105 align-baseline gap-0.5 md:gap-2  hover:bg-slate-50 hover:shadow cursor-pointer py-0.5 px-1 md:p-2' onClick={()=> router.push("/products")}>
<AiOutlineShoppingCart className='text-2xl  text-violet-400'/>
<p className='hover:text-sky-500 text-sm md:text-base'>Shop</p>
        </div>
        <div className='flex  flex-col md:flex-row transition duration-300 ease-in-out transform hover:-translate-x-1 hover:scale-105 align-baseline gap-0.5 md:gap-2  hover:bg-slate-50 hover:shadow cursor-pointer py-0.5 px-1 md:p-2' >
<MdEngineering className='text-2xl  text-violet-400'/>
<p className='hover:text-sky-500 text-sm md:text-base'>Find Pros</p>
        </div>
     

      </div>
      <div className='flex my-auto flex-row  justify-center  w-[20%]'>
      <div className='flex  flex-col md:flex-row transition duration-300 ease-in-out transform hover:-translate-x-1 hover:scale-105 align-baseline gap-0.5 md:gap-2  hover:bg-slate-50 hover:shadow cursor-pointer py-0.5 px-1 md:p-2' onClick={authenticated? ()=> signOut(): ()=> router.push("/auth")}>
{authenticated? <ProfileCard src={userImage} alt={userName}/> : <CgProfile className='text-2xl  text-violet-400'/>}
<p className='hover:text-sky-500 text-sm md:text-base'>{authenticated? "Logout": "Login"}</p>
        </div>
      </div>

    </nav>
  )
}

export default Nav
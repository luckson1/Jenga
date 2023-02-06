import React from 'react'
import { FaHouseUser} from 'react-icons/fa'
import { AiOutlineShoppingCart} from 'react-icons/ai'
import { CgProfile} from 'react-icons/cg'
import { MdEngineering } from 'react-icons/md'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import ProfileCard from '../display/ProfileCard'



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
    <nav className=" fixed bottom-1 shadow-slate-500/100 md:top-0 z-30 md:mx-0  flex h-12 md:h-16   w-screen flex-row justify-between  bg-slate-50  px-3 ">
     <div className='flex  my-auto h-10 md:h-12 flex-col md:flex-row transition duration-300 ease-in-out transform hover:-translate-x-1 hover:scale-105 align-baseline gap-0.5 md:gap-2  hover:bg-slate-50 hover:shadow cursor-pointer  px-1 md:p-2' onClick={()=> router.push("/")}>
      <FaHouseUser className='text-lg  md:text-2xl   cursor-pointer  text-indigo-700' onClick={()=> router.push("/")}/>
      <p className='hover:text-sky-500 text-xs font-thin md:text-base'>Home</p>
      </div>
      <div className='flex my-auto flex-row px-4 justify-start md:justify-center lg:justify-end md:px-8 gap-6 md:gap-16  w-[60%]'>
        <div className='flex  flex-col md:flex-row transition duration-300 ease-in-out transform hover:-translate-x-1 hover:scale-105 align-baseline gap-0.5 md:gap-2  hover:bg-slate-50 hover:shadow cursor-pointer py-0.5 px-1 md:p-2' onClick={()=> router.push("/products")}>
<AiOutlineShoppingCart className='text-lg  md:text-2xl text-indigo-700'/>
<p className='hover:text-sky-500 text-xs font-thin md:text-base'>Shop</p>
        </div>
        <div className='flex  flex-col md:flex-row transition duration-300 ease-in-out transform hover:-translate-x-1 hover:scale-105 align-baseline gap-0.5 md:gap-2  hover:bg-slate-50 hover:shadow cursor-pointer py-0.5 px-1 md:p-2' >
<MdEngineering className='text-lg md:text-2xl text-indigo-700'/>
<p className='hover:text-sky-500 text-xs font-thin md:text-base'>Find Pros</p>
        </div>
     

      </div>
      <div className='flex my-auto flex-row  justify-center  w-[20%]'>
      <div className='flex  flex-col md:flex-row transition duration-300 ease-in-out transform hover:-translate-x-1 hover:scale-105 align-baseline gap-0.5 md:gap-2  hover:bg-slate-50 hover:shadow cursor-pointer py-0.5 px-1 md:p-2' onClick={authenticated? ()=> signOut(): ()=> router.push("/auth")}>
{authenticated? <ProfileCard src={userImage} alt={userName}/> : <CgProfile className='text-lg md:text-2xl text-indigo-700'/>}
<p className='hover:text-sky-500 text-xs font-thin md:text-base'>{authenticated? "Logout": "Login"}</p>
        </div>
      </div>

    </nav>
  )
}

export default Nav
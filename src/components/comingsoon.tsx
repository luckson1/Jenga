import React, { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';



const Comingsoon = () => {
    const router=useRouter()
  return (
    <div className='-my-5 h-screen w-screen bg-indigo-50'>
    <button className=" w-64 ml-10 text-lg py-1.5 rounded-full hover:bg-violet-400 mt-5  font-light text-violet-700 outline outline-violet-700 hover:outline-none bg-violet-200 bg-opacity-70 hover:text-white" onClick={()=>router.back()}>
       Back
     </button>
     <motion.div className="flex items-center justify-center my-24 mx-5 md:mx-10">
 
 <motion.svg
 xmlns="http://www.w3.org/2000/svg"
 viewBox="0 0 100 100"
 className="w-32 h-32 text-indigo-500"
 initial={{ rotate: -180 }}
 animate={{ rotate: 0 }}
 transition={{ duration: 1 }}
 >
 <path d="M50 15a35 35 0 1 0 0 70 35 35 0 0 0 0-70zm0 3.86a31.14 31.14 0 1 1 0 62.28 31.14 31.14 0 0 1 0-62.28z" />
 <path d="M50 36.67A13.33 13.33 0 1 0 63.33 50 13.33 13.33 0 0 0 50 36.67zm0 2.67a10.67 10.67 0 1 1 0 21.33 10.67 10.67 0 0 1 0-21.33zM39.67 57.33h20.67v4.67H39.67z" />
 </motion.svg>
 <motion.h1
 className="text-4xl font-bold text-indigo-500"
 initial={{ y: -50 }}
 animate={{ y: 0 }}
 transition={{ duration: 1, delay: 0.5 }}
 >
 Coming soon

 </motion.h1>
 
 
 </motion.div>
</div>

  )
}

export default Comingsoon
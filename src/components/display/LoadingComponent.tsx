import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full m-auto">
    <div className=" w-[20%]  h-[20%]  mx-auto text-white rounded-full bg-inherit animate-spin border-t-4 border-r-4 border-dotted border-green-400 text-[60px] m-auto">
    
    </div>
    <div className=" w-[20%]  h-[20%]  mx-auto text-white rounded-full bg-inherit animate-spin border-t-4 border-r-4  border-dotted border-amber-400 text-[60px] m-auto">
    
    </div>
    <div className=" w-[20%]  h-[20%]  mx-auto text-white rounded-full bg-inherit animate-spin border-t-4 border-r-4 border-dotted border-red-400 text-[60px] m-auto">
    
    </div>
  </div>
  )
}

export default Loading
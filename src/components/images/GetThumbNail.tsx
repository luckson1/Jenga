import React from 'react'
import { api } from '../../utils/api'
import Image from 'next/image'

function GetThumbNail({id}: {id?: string}) {
   if(id){
    const {data:image}=api.image.getOne.useQuery({id}) 
    const imageUrl=image?.url ?? "/furniture.jpg"

  

  return (
   <>
   <Image
							className="w-md h-full rounded-md"
							width={40}
							height={40}
							src={imageUrl}
							alt="Product Image"
						  />
   </>
  )} return (
    <>
   <Image
							className="w-md h-full rounded-md"
							width={40}
							height={40}
							src= "/furniture.jpg"
							alt="Product Image"
						  />
   </>
  )
  
}


export default GetThumbNail


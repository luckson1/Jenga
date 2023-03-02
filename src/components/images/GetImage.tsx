import React from 'react'
import Image from 'next/image'

function GetImage({url}: {url?: string}) {

   if(url){

    const imageUrl=url ?? "/furniture.jpg"

  

  return (
   <>
   <Image
							className="w-full h-full rounded-lg "
							width={320}
							height={256}
							src={imageUrl}
							alt="Product Image"
						  />
   </>
  )} return (
    <>
   <Image
							className="w-full h-full rounded-lg"
							width={320}
							height={256}
							src= "/furniture.jpg"
							alt="Product Image"
						  />
   </>
  )
  
}


export default GetImage


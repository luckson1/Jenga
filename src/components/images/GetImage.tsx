import React from 'react'
import Image from 'next/image'

function GetImage({url}: {url?: string}) {

   if(!url) return (   <>
	<Image
							 className="w-full h-full rounded-t-2xl object-contain"
							 width={320}
							 height={256}
							 src= "/furniture.jpg"
							 alt="Product Image"
						   />
	</>)

  

  return (
   <>
   <Image
							className="w-full h-full rounded-t-2xl object-contain shadow-xl"
							width={320}
							height={256}
							src={url}
							alt="Product Image"
						  />
   </>
  )
  
}


export default GetImage


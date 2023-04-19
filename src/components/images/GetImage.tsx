import React from 'react'
import Image from 'next/image'

function GetImage({url}: {url?: string}) {

   if(!url) return (   <>
	<Image
							 className="w-full h-full rounded-t-lg"
							 width={320}
							 height={256}
							 src= "/furniture.jpg"
							 alt="Product Image"
						   />
	</>)

  

  return (
   <>
   <Image
							className="w-full h-full rounded-t-lg "
							width={320}
							height={256}
							src={url}
							alt="Product Image"
						  />
   </>
  )
  
}


export default GetImage


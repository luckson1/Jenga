import Image from 'next/image'
import React from 'react'

const ProfileCard = ({src, alt}: {src: string, alt: string}) => {
  return (
    <div className='relative h-5 w-5 md:h-7 md:w-7 '>
        <Image fill src={src} alt={alt} className='rounded-full'/>
    </div>
  )
}

export default ProfileCard
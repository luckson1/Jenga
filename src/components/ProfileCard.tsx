import Image from 'next/image'
import React from 'react'

const ProfileCard = ({src, alt}: {src: string, alt: string}) => {
  return (
    <div className='relative h-7 w-7'>
        <Image fill src={src} alt={alt} sizes='h-7 w-7' className='rounded-full'/>
    </div>
  )
}

export default ProfileCard
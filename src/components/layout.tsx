import React, { ReactNode } from 'react'
import Nav from './navigation/Nav'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div className='flex flex-col w-full h-fit overflow-hidden'>
        <Nav />
        {children}
    </div>
  )
}

export default Layout
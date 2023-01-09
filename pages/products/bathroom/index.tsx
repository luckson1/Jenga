import React from 'react'
import CategoryDisplay from '../../components/display/CategoryDisplay'
import SubCategory from '../../components/display/SubCategory'
import { Tiles, bathroomFixtures } from '../../../assets/assets'
import Nav from '../../components/navigation/Nav'


const Bathroom = () => {
  return (
    <>
    <Nav />
    <div className=' mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
      <h1>Bathroom</h1>
  <section className='h-fit w-screen flex flex-col'>
    <p className='text-center text-xl mx-2 text-black'> Bathroom Fixtures</p>
  <div className='h-fit w-screen px-auto md:px-5 py-10 md:py-10 flex flex-row  flex-wrap   gap-5 md:gap-10 md:mx-7 justify-center md:justify-start'>
        {bathroomFixtures.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>
  <section className='h-fit w-screen flex flex-col'>
 <p className='text-center text-xl mx-2 text-black'>  Bathroom Tiles</p>
  <div className='h-fit w-screen px-auto  md:px-10  py-5 md:py-10 flex flex-row  flex-wrap mx-auto md:mx-7 gap-8 md:gap-10 justify-center md:justify-start'>
        {Tiles.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>
 
    </div>
    </>
  )
}

export default Bathroom
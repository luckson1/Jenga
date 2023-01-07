import React from 'react'
import CategoryDisplay from '../../components/display/CategoryDisplay'
import SubCategory from '../../components/display/SubCategory'
import { Tiles, bathroomFixtures } from '../../../assets/assets'


const Bathroom = () => {
  return (
    <div className=' mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
      <h1>Bathroom</h1>
  <section className='h-fit w-screen flex flex-col'>
    <p className='text-center text-xl mx-2 text-black'> Bathroom Fixtures</p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap mx-3 md:x-7 gap-5 md:gap-10 '>
        {bathroomFixtures.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>
  <section className='h-fit w-screen flex flex-col'>
 <p className='text-center text-xl mx-2 text-black'>  Bathroom Tiles</p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap ml-4 md:ml-7 gap-8 md:gap-10 '>
        {Tiles.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>
 
    </div>
  )
}

export default Bathroom
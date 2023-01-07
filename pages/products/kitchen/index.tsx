import React from 'react'
import CategoryDisplay from '../../components/display/CategoryDisplay'
import SubCategory from '../../components/display/SubCategory'
import { BedroomFurniture, Tiles, kitchenAppliances, kitchenFixtures, livingRoomFurniture, officeFurniture, outdoorsFurniture } from '../../components/assets/assets'


const Kitchen = () => {
  return (
    <div className=' mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
      <h1>Kitchen</h1>
  <section className='h-fit w-screen flex flex-col'>
    <p className='text-center text-xl mx-2 text-black'> Kitchen Fixtures</p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap mx-3 md:x-7 gap-5 md:gap-10 '>
        {kitchenFixtures.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>
  <section className='h-fit w-screen flex flex-col'>
 <p className='text-center text-xl mx-2 text-black'>  Kitchen Appliances</p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap ml-4 md:ml-7 gap-8 md:gap-10 '>
        {kitchenAppliances.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>
  <section className='h-fit w-screen flex flex-col'>
 <p className='text-center text-xl mx-2 text-black'>  Kitchen Tiles </p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap ml-4 md:ml-7 gap-8 md:gap-10 '>
        {Tiles.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>

    </div>
  )
}

export default Kitchen
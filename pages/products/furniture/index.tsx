import React from 'react'
import CategoryDisplay from '../../components/display/CategoryDisplay'
import SubCategory from '../../components/display/SubCategory'
import { BedroomFurniture, livingRoomFurniture, officeFurniture, outdoorsFurniture } from '../../components/assets/assets'


const Furniture = () => {
  return (
    <div className=' mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
      <h1>Furniture</h1>
  <section className='h-fit w-screen flex flex-col'>
    <p className='text-center text-xl mx-2 text-black'> Living and Dining Room Furniture</p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap mx-3 md:x-7 gap-5 md:gap-10 '>
        {livingRoomFurniture.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>
  <section className='h-fit w-screen flex flex-col'>
 <p className='text-center text-xl mx-2 text-black'>  BedRoom Furniture</p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap ml-4 md:ml-7 gap-8 md:gap-10 '>
        {BedroomFurniture.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>
  <section className='h-fit w-screen flex flex-col'>
 <p className='text-center text-xl mx-2 text-black'>  Office Furniture </p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap ml-4 md:ml-7 gap-8 md:gap-10 '>
        {officeFurniture.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>
  <section className='h-fit w-screen flex flex-col'>
 <p className='text-center text-xl mx-2 text-black'>  OutDoors Furniture </p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap ml-4 md:ml-7 gap-8 md:gap-10 '>
        {outdoorsFurniture.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>
    </div>
  )
}

export default Furniture
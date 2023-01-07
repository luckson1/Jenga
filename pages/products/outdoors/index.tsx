import React from 'react'
import SubCategory from '../../components/display/SubCategory'
import {  fencing, gardening, generalFixtures,  officeFurniture, outdoorsFurniture} from '../../components/assets/assets'


const Outdoors  = () => {
  return (
    <div className=' mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
      <h1>Outdoors Living</h1>

  <section className='h-fit w-screen flex flex-col'>
    <p className='text-center text-xl mx-2 text-black'> Fencing & Gates</p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap mx-3 md:x-7 gap-5 md:gap-10 '>
        {fencing.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>
  <section className='h-fit w-screen flex flex-col'>
    <p className='text-center text-xl mx-2 text-black'> Outdoor Furniture</p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap mx-3 md:x-7 gap-5 md:gap-10 '>
        {outdoorsFurniture.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>
  <section className='h-fit w-screen flex flex-col'>
    <p className='text-center text-xl mx-2 text-black'> Gardening</p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap mx-3 md:x-7 gap-5 md:gap-10 '>
        {gardening.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>

    </div>
  )
}

export default Outdoors
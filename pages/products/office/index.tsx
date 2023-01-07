import React from 'react'
import SubCategory from '../../components/display/SubCategory'
import {  generalFixtures,  officeFurniture} from '../../components/assets/assets'


const Living  = () => {
  return (
    <div className=' mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
      <h1>Furniture</h1>
  <section className='h-fit w-screen flex flex-col'>
    <p className='text-center text-xl mx-2 text-black'> OfficeFurniture</p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap mx-3 md:x-7 gap-5 md:gap-10 '>
        {officeFurniture.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>


  <section className='h-fit w-screen flex flex-col'>
 <p className='text-center text-xl mx-2 text-black'>  Office Fixtures </p>
  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap ml-4 md:ml-7 gap-8 md:gap-10 '>
        {generalFixtures.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>
    </div>
  )
}

export default Living
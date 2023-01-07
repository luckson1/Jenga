import React from 'react'
import SubCategory from '../../components/display/SubCategory'
import {  decor, generalFixtures,  officeFurniture} from '../../components/assets/assets'


const homeDecor  = () => {
  return (
    <div className=' mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
      <h1>Home DEcor</h1>
  <section className='h-fit w-screen flex flex-col'>

  <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap mx-3 md:x-7 gap-5 md:gap-10 '>
        {decor.map(c=> (<SubCategory key={c.i} category={c}/>))}

      </div>

  </section>



    </div>
  )
}

export default homeDecor
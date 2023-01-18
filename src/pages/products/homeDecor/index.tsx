import React, { useState } from 'react'
import SubCategory from '../../../components/display/SubCategory'
import { decor } from '../../../components/assets/assets'
import Nav from '../../../components/navigation/Nav'
import ComingSoonSVG from '../../../components/comingsoon'


const HomeDecor  = () => {
  const [item, setItem]=useState<string>()
  return (
    <>
 
    <div className=' mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
      <h1>Home Decor</h1>
  <section className='h-fit w-screen flex flex-col'>

  <div className='h-fit w-screen justify-center md:justify-start md:px-7 py-5 md:py-10 flex flex-row  flex-wrap mx-3 md:x-7 gap-5 md:gap-10 '>
        {decor.map(c=> (<div key={c.i} onClick={()=>setItem(c.name)}><SubCategory  category={c} /> </div>))}

      </div>

  </section>

  {item && <div className='fixed top-0 right-0'>

<ComingSoonSVG item={item} setItem={setItem}/>
</div>}

    </div>
    </>
  )
}

export default HomeDecor
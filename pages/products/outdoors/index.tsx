import React, { useState } from 'react'
import SubCategory from '../../components/display/SubCategory'
import { fencing, gardening, outdoorsFurniture } from '../../../assets/assets'
import Nav from '../../components/navigation/Nav'
import ComingSoonSVG from '../../components/comingsoon'


const Outdoors  = () => {
  const [item, setItem]=useState<string>()
  return (
    <>
   <Nav />
    <div className=' mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
      <h1>Outdoors Living</h1>

  <section className='h-fit w-screen flex flex-col'>
    <p className='text-center text-xl mx-2 text-black'> Fencing & Gates</p>
  <div className='h-fit w-screen justify-center md:justify-start md:px-7 py-5 md:py-10 flex flex-row  flex-wrap mx-3 md:x-7 gap-5 md:gap-10 '>
        {fencing.map(c=> (<div key={c.i} onClick={()=>setItem(c.name)}><SubCategory  category={c} /> </div>))}

      </div>

  </section>
  <section className='h-fit w-screen flex flex-col'>
    <p className='text-center text-xl mx-2 text-black'> Outdoor Furniture</p>
  <div className='h-fit w-screen justify-center md:justify-start md:px-7 py-5 md:py-10 flex flex-row  flex-wrap mx-3 md:x-7 gap-5 md:gap-10 '>
        {outdoorsFurniture.map(c=> (<div key={c.i} onClick={()=>setItem(c.name)}><SubCategory  category={c} /> </div>))}

      </div>

  </section>
  <section className='h-fit w-screen flex flex-col'>
    <p className='text-center text-xl mx-2 text-black'> Gardening</p>
  <div className='h-fit w-screen justify-center md:justify-start md:px-7 py-5 md:py-10 flex flex-row  flex-wrap mx-3 md:x-7 gap-5 md:gap-10 '>
        {gardening.map(c=> (<div key={c.i} onClick={()=>setItem(c.name)}><SubCategory  category={c} /> </div>))}

      </div>

  </section>
  {item && <div className='fixed top-0 right-0'>

<ComingSoonSVG item={item} setItem={setItem}/>
</div>}

    </div>
    </>
  )
}

export default Outdoors
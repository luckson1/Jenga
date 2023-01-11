import React, { useState } from 'react'
import CategoryDisplay from '../../components/display/CategoryDisplay'
import SubCategory from '../../components/display/SubCategory'
import { Tiles, bathroomFixtures } from '../../../assets/assets'
import Nav from '../../components/navigation/Nav'
import ComingSoonSVG from '../../components/comingsoon'


const Bathroom = () => {
  const [item, setItem]=useState<string>()
  return (
    <>
    <Nav />
    <div className=' mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
      <h1>Bathroom</h1>
  <section className='h-fit w-screen flex flex-col'>
    <p className='text-center text-xl mx-2 text-black'> Bathroom Fixtures</p>
  <div className='h-fit w-screen px-auto md:px-5 py-10 md:py-10 flex flex-row  flex-wrap   gap-5 md:gap-10 md:mx-7 justify-center md:justify-start'>
        {bathroomFixtures.map(c=> (<div key={c.i} onClick={()=>setItem(c.name)}><SubCategory  category={c} /> </div>))}

      </div>

  </section>
  <section className='h-fit w-screen flex flex-col'>
 <p className='text-center text-xl mx-2 text-black'>  Bathroom Tiles</p>
  <div className='h-fit w-screen px-auto  md:px-10  py-5 md:py-10 flex flex-row  flex-wrap mx-auto md:mx-7 gap-8 md:gap-10 justify-center md:justify-start'>
  {Tiles.map(c=> (<div key={c.i} onClick={()=>setItem(c.name)}><SubCategory  category={c} /> </div>))}

      </div>

  </section>
  {item && <div className='fixed top-0 right-0'>

<ComingSoonSVG item={item} setItem={setItem}/>
</div>}
    </div>
    </>
  )
}

export default Bathroom
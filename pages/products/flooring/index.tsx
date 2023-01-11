
import { useState } from "react"
import { flooring } from "../../../assets/assets"
import ComingSoonSVG from "../../components/comingsoon"
import SubCategory from "../../components/display/SubCategory"
import Nav from "../../components/navigation/Nav"

const Bedroom = () => {
  const [item, setItem]=useState<string>()
    return (
      <>
      <Nav />
      <div className=' mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
        <h1>Flooring</h1>

    <section className='h-fit w-screen flex flex-col'>
   <p className='text-center text-xl mx-2 text-black'>  Flooring Material</p>
    <div className='h-fit w-screen justify-center md:justify-start md:px-7 py-5 md:py-10 flex flex-row  flex-wrap ml-4 md:ml-7 gap-8 md:gap-10 '>
    {flooring.map(c=> (<div key={c.i} onClick={()=>setItem(c.name)}><SubCategory  category={c} /> </div>))}
  
        </div>
  
    </section>
    {item && <div className='fixed top-0 right-0'>

<ComingSoonSVG item={item} setItem={setItem}/>
</div>}
      </div>
      </>
    )
  }
  
  export default Bedroom
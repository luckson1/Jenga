
import { BedroomFurniture, decor, generalFixtures } from "../../../assets/assets"
import SubCategory from "../../components/display/SubCategory"
import Nav from "../../components/navigation/Nav"

const Bedroom = () => {
    return (
      <>
      <Nav/>
      <div className=' mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
        <h1>Bedroom</h1>

    <section className='h-fit w-screen flex flex-col'>
   <p className='text-center text-xl mx-2 text-black'>  BedRoom Furniture</p>
    <div className='h-fit w-screen justify-center md:justify-start md:px-7 py-5 md:py-10 flex flex-row  flex-wrap ml-4 md:ml-7 gap-8 md:gap-10 '>
          {BedroomFurniture.map(c=> (<SubCategory key={c.i} category={c}/>))}
  
        </div>
  
    </section>
    <section className='h-fit w-screen flex flex-col'>
   <p className='text-center text-xl mx-2 text-black'>  BedRoom Fixtures</p>
    <div className='h-fit w-screen justify-center md:justify-start md:px-7 py-5 md:py-10 flex flex-row  flex-wrap ml-4 md:ml-7 gap-8 md:gap-10 '>
          {generalFixtures.map(c=> (<SubCategory key={c.i} category={c}/>))}
  
        </div>
  
    </section>
    <section className='h-fit w-screen flex flex-col'>
   <p className='text-center text-xl mx-2 text-black'>  BedRoom Decor</p>
    <div className='h-fit w-screen justify-center md:justify-start md:px-7 py-5 md:py-10 flex flex-row  flex-wrap ml-4 md:ml-7 gap-8 md:gap-10 '>
          {decor.map(c=> (<SubCategory key={c.i} category={c}/>))}
  
        </div>
  
    </section>
      </div>
      </>
    )
  }
  
  export default Bedroom
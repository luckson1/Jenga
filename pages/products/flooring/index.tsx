import { BedroomFurniture, decor, flooring, generalFixtures } from "../../components/assets/assets"
import SubCategory from "../../components/display/SubCategory"

const Bedroom = () => {
    return (
      <div className=' mt-16 text-center w-screen bg-gradient-to-r from-white via-white to-violet-50'>
        <h1>Flooring</h1>

    <section className='h-fit w-screen flex flex-col'>
   <p className='text-center text-xl mx-2 text-black'>  Flooring Material</p>
    <div className='h-fit w-screen px-3 md:px-7 py-5 md:py-10 flex flex-row  flex-wrap ml-4 md:ml-7 gap-8 md:gap-10 '>
          {flooring.map(c=> (<SubCategory key={c.i} category={c}/>))}
  
        </div>
  
    </section>
      </div>
    )
  }
  
  export default Bedroom
import React from 'react'
import { api } from '../../utils/api'
import GetImage from "./../images/GetImage"
import Loading from './LoadingSmall'

const Product = ({id}: {id:string}) => {
    //fetch all images beloging to a prioduct
    const {data: images, isLoading}=api.image.getAll.useQuery({productId:id})


  return (
    
    <div className="carousel w-full snap-x snap-mandatory">

    {isLoading? <Loading /> : images?.map(image=> (
    // set id of the carousel to the id of image for scrolling
         <div id={`${image.id}`} className="carousel-item relative w-full h-full shadow" key={image.id}>
       <GetImage url={image.url}/>
         <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            {/* provide logic of displaying the carousel images */}
           <a href={`${images.indexOf(image)===0 ? `#${images[images?.length-1]?.id}`: `#${images[images.indexOf(image)-1]?.id}`}`} className="btn btn-circle bg-white text-xl text-slate-900 bg-opacity-30">❮</a> 
           <a href={`${images?.indexOf(image)===images.length-1 ? `#${images[0]?.id}`: `#${images[images.indexOf(image)+1]?.id}`}`} className="btn btn-circle bg-white text-xl text-slate-900 bg-opacity-30">❯</a>
         </div>
       </div>  
    ))} 
    
      </div>
    
  )
}

export default Product
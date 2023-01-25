import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { api } from '../../../../utils/api';
import Image from 'next/image';
import { BsWhatsapp } from 'react-icons/bs';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';

const ProductId = () => {
    const router=useRouter()
    const productId = router.query.id as string;
    const { data: images , isLoading} = api.image.imagesAndUsers.useQuery({ productId });
    const [currentImage, setCurrentImage]=useState(images?.at(0)?.url)
    const product=images?.at(0)?.Product
    const user=images?.at(0)?.user
    console.log(product?.materials)
    
  return (
<div className='w-screen h-screen'>
<div className='flex flex-col my-5 md:my-16 h-full w-full'>
     <div className=" flex h-full  md:h-[90%] w-full flex-col md:flex-row  justify-center  ">
        <div className='w-full md:w-[50%] h-[50%] md:h-full flex flex-col-reverse md:flex-row justify-around items-start'>
            <div className='w-screen h-fit md:w-fit md:h-screen p-1 flex flex-row md:flex-col mx-5 md:ml-8 gap-2 relative'>
                {images?.map(image=> (
             <div key={image.id} className='relative h-12 w-12 md:w-16 md:h-16 overflow-scroll rounded-lg cursor-pointer flex items-center justify-center' onClick={()=> setCurrentImage(image.url)}>
                       <Image key={image.id} src={image.url} alt={image.Product.name} fill sizes="(max-width: 768px) 40px,
              (max-width: 1200px) 50px,
              50px" className='rounded-lg' />
             </div>
                ))}

            </div>
            <div className='w-[95%] h-[80%] md:w-[80%] md:h-[95%] relative rounded-lg mx-auto'>
                <Image src={currentImage ?? "/livingRoom.jpeg"} alt={product?.name ?? " Product" } quality={100} fill sizes="(max-width: 768px) 80vw,
              (max-width: 1200px) 80vw,
              80vw" className='rounded-lg'/>

            </div>

        </div>
        <div className='w-full md:w-[50%] h-[50%] md:h-full flex justify-center items-center mx-auto '>
            <div className='md:w-[60%] md:h-[60%] w-[95%] h-[80%] shadow-lg rounded-lg shadow-violet-500/50 p-5 md:p-10 flex flex-col justify-between'>
            <p className='text-2xl tracking-widest text-blue-700'>{product?.name}</p>
            <p className='text-xl tracking-widest font-bold'>Ksh. {product?.price}</p>
            <p className='text-xl tracking-widest '>Condition: {product?.secondHand? "Second Hand": "New"}</p>
            <div className='flex flex-row w-full h-20 justify-around items-center text-4xl'>
            <BsWhatsapp className='text-green-500 cursor-pointer shadow-green-500/50' /> <AiOutlinePhone className='text-sky-500 cursor-pointer '/> <AiOutlineMail className='text-violet-500 cursor-pointer' />
</div>
            <p className='text-xl tracking-widest'>By: {user?.name}</p>
  
            <p className='text-xl tracking-widest '>Location: {product?.location}</p>
          

            </div>

</div>
       
        </div>
        <div className='flex flex-col md:flex-row w-[95%] h-fit items-center justify-center mx-auto gap-5  md:justify-start'>
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box shadow shadow-violet-500/50">
  <div className="collapse-title text-xl font-medium">
Product Details
  </div>
  <div className="collapse-content flex flex-col"> 
  <div className='flex flex-row mt-2'>
<div className='p-3 w-6/12 outline outline-slate-600 bg-slate-200'>
    Product Description
</div>
<div className='p-3 w-6/12 outline outline-slate-600' >
<p>  {product?.description}</p>
</div>
</div>
{product?.sizes.length  !==0 && <div className='flex flex-row'>
    <div className='p-3 w-6/12 outline outline-slate-600 bg-slate-200'>
    Product sizes
</div>
<div className='p-3 w-6/12 outline outline-slate-600' >
 {product?.sizes.map((size, index)=> (
    <p key= {index}>{size}</p>
 ))}
</div>
</div>}
{product?.materials.length  !==0 && <div className='flex flex-row'>
    <div className='p-3 w-6/12 outline outline-slate-600 bg-slate-200'>
    Product materials
</div>
<div className='p-3 w-6/12 outline outline-slate-600' >
 {product?.materials.map((material, index)=> (
    <p key= {index}>{material}</p>
 ))}
</div>
</div>}
{product?.colors.length !==0 && <div className='flex flex-row'>
    <div className='p-3 w-6/12 outline outline-slate-600 bg-slate-200'>
    Product colors
</div>
<div className='p-3 w-6/12 outline outline-slate-600' >
 {product?.colors.map((color, index)=> (
 
        <span key={index}>{color}, </span>
 
 ))}
 {product?.width &&
      <div className='flex flex-row'>
      <div className='p-3 w-6/12 outline outline-slate-600 bg-slate-200'>
          Product width
      </div>
      <div className='p-3 w-6/12 outline outline-slate-600' >
      <p>  {product?.width}</p>
      </div>
      </div>
 }
 
 {product?.length &&
      <div className='flex flex-row'>
      <div className='p-3 w-6/12 outline outline-slate-600 bg-slate-200'>
          Product length
      </div>
      <div className='p-3 w-6/12 outline outline-slate-600' >
      <p>  {product?.length}</p>
      </div>
      </div>
 }
  {product?.height &&
      <div className='flex flex-row'>
      <div className='p-3 w-6/12 outline outline-slate-600 bg-slate-200'>
          Product height
      </div>
      <div className='p-3 w-6/12 outline outline-slate-600' >
      <p>  {product?.height}</p>
      </div>
      </div>
 }
</div>
</div>}
  </div>
</div>


        </div>
   </div>

</div>
  )
}

export default ProductId
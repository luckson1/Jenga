import React from "react";
import DepartmentSelection from "../../components/forms/DepartmentSelection";
import SubDepartmentSelection from "../../components/forms/SubDepartmentSelection";
import CategorySelection from "../../components/forms/CategorySelection copy";
import Previews from "../../components/forms/DropZone";

const Productform = () => {
  return (
    <div className="mt-16 flex h-fit w-screen flex-col bg-gradient-to-tr from-white via-white to-violet-50 text-sm md:text-[16px]">
      <div className="flex w-screen flex-row justify-center">
        <form className="my-8 mx-auto flex h-fit w-[370px] flex-col items-start gap-4 bg-white py-5 px-4 shadow-md md:w-[90%] md:px-10 rounded-md">
          <section className="flex w-full flex-row flex-wrap justify-between md:gap-4">
            <DepartmentSelection />
            <SubDepartmentSelection />
            <CategorySelection />
          </section>

          <div className="flex flex-col gap-2  w-full">
            <p>Upload Product Images</p>
            <Previews />
          </div>
          <div className="w-full flex flex-row flex-wrap justify-between ">
          <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Name of Product?</span>
  </label>
  <input type="text" placeholder="Name of Product" className="input input-bordered w-full max-w-xs input-primary" />
  <label className="label">
  </label>
</div>
<div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Brand (Optiona)</span>
  </label>
  <input type="text" placeholder="Name of Product" className="input input-bordered w-full max-w-xs input-primary" />
  <label className="label">
  </label>
</div>

<div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Price of Product?</span>
  </label>
  <input type="number" placeholder="0" className="input input-bordered w-full max-w-xs input-primary" />
  <label className="label">
  </label>
</div>
<div className="form-control w-full">
  <label className="label">
    <span className="label-text">Product Description</span>
  </label> 
  <textarea className="textarea textarea-bordered h-24" placeholder="Product Description"></textarea>
  <label className="label">
  </label> 
</div>
          </div>

          <div className="w-full flex flex-row flex-wrap gap-4 md:justify-between items-baseline ">
          <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Enter Product Materials (optional) </span>
  </label>
  <input type="text" placeholder="Separate by Commas e.g leather, rexin" className="input input-bordered w-full max-w-xs input-primary" />
  <label className="label">
  </label>
</div>
<div className="form-control flex flex-col">
  <p>Condition (optional)</p>
  <label className="label cursor-pointer gap-2">
    <span className="label-text text-green-400">New</span> 
    <input type="checkbox" className="toggle toggle-primary"  />
    <span className="label-text text-sky-400">Second Hand</span> 
  </label>
</div>
<div className="flex flex-col ">
<p>Variants (Optional): The Product has Different? </p>
<div className="flex flex-row">

<div className="form-control">
  <label className="label cursor-pointer gap-2">
    <span className="label-text text-violet-500">Colors</span> 
    <input type="radio" name="radio-10" className="radio checked:bg-indigo-500" />
  </label>
</div>
<div className="form-control">
  <label className="label cursor-pointer gap-2">
    <span className="label-text text-blue-500">Sizes</span> 
    <input type="radio" name="radio-10" className="radio checked:bg-blue-500" />
  </label>
</div>
<div className="form-control">
  <label className="label cursor-pointer gap-2">
    <span className="label-text text-cyan-500">Designs</span> 
    <input type="radio" name="radio-10" className="radio checked:bg-cyan-500"  />
  </label>
</div>
</div>

</div>
<div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Enter Product Variants (optional) </span>
  </label>
  <input type="text" placeholder="Separate by Commas e.g black, red, blue" className="input input-bordered w-full max-w-xs input-primary" />
  <label className="label">
  </label>
</div>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-center text-xl">Product Measurement (in cm)</p>
            <div className="w-[300px] flex flex-row  gap-3 ">
          <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Width</span>
  </label>
  <input type="number" placeholder="0" className="input input-bordered w-full max-w-xs input-primary" />
  <label className="label">
  </label>
</div>
<div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Length</span>
  </label>
  <input type="number" placeholder="0" className="input input-bordered w-full max-w-xs input-primary" />
  <label className="label">
  </label>
</div>

<div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">height</span>
  </label>
  <input type="number" placeholder="0" className="input input-bordered w-full max-w-xs input-primary" />
  <label className="label">
  </label>
</div>

          </div>

          </div>
          <button className="w-[340px] rounded bg-violet-500 bg-opacity-30 outline outline-1 outline-violet-500 text-violet-700 hover:bg-opacity-100 hover:bg-violet-500 hover:text-white p-2.5">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Productform;

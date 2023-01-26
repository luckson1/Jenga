import React, { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import Previews from "../../../components/forms/DropZone";
import { useFormik } from "formik";
import { api } from "../../../utils/api";
import Alerts from "../../../components/display/errors/Alerts";
import axios from "axios";
import { useRouter } from "next/router";
import LoadingButton from "../../../components/display/LoadingButton";
import { ProductParams } from "../productform";

const productSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is Required")
    .min(2, "Name Too Short")
    .max(50, "Name Too Long"),
  departmentId: Yup.string().required("Pick  Department"),
  subDepartmentId: Yup.string().required("Pick sub-department"),
  categoryId: Yup.string().required("Pick Category"),
  description: Yup.string()
    .required("Description is Required")
    .min(50, "Description Too Short"),
  price: Yup.number().min(1, "Price is Required"),

  location: Yup.string().required(),

  secondHand: Yup.boolean(),
  width: Yup.number().nullable(),
  length: Yup.number().nullable(),
  height: Yup.number().nullable(),

  productMaterials: Yup.string(),
  variantType: Yup.string(),
  variants: Yup.string(),
});


const EditProductform = () => {

// get id from params and fetch the product
const router = useRouter();
const id = router.query.id as string;

const {data: product, isLoading}= api.product.getOne.useQuery({id})

  //TODO: edit a product hook
  const { mutate: editProduct, error} = api.product.update.useMutation({
    onSuccess: () => router.push("/dashboard")
  });

  
console.log(error)
  //handle submission of form values
  async function handleSubmit(values: Omit<ProductParams, "files">) {
    editProduct({id, ...values});
  }
  const productId = product?.id;


 // define types of product variants
 const sizes = !!product?.sizes?.length 
 const colors =!!product?.colors?.length
 const designs =!!product?.designs?.length
  console.log(sizes, colors, designs)
  const formik = useFormik({
    initialValues: {
      name: product?.name?? "",

      departmentId: product?.departmentId?? "",
      subDepartmentId: product?.subDepartmentId?? "",
      categoryId: product?.categoryId?? "",
      description: product?.description?? "",

      price: product?.price?? 0,
      location: product?.location?? "",
     
      variants:  colors? product?.colors?.toString() : sizes ? product?.sizes?.toString() : designs? product?.designs?.toString() : "",

      variantType: sizes? "sizes": colors? "colors": designs? "designs" : "",
      secondHand: product?.secondHand?? false,
      width :   product?.width?? 0,    
      length:    product?.length?? 0,      
      height  :    product?.height?? 0,    
      productMaterials :   product?.materials.toString()?? "",  
    },
    validationSchema: productSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  // fetch department data
  const { data: departments } = api.departments.getAll.useQuery();

  // filter through departments to find a deparment with same id as the one selected by use
  const selectedDepartment = useMemo(() => {
    const dep = departments?.find((d) => d.id === formik.values.departmentId);
    return dep;
  }, [formik.values.departmentId]);

  // get the subdepartments of the selected deparment
  const subDepartments = selectedDepartment?.SubDepartment;

  // filter through sub-departments to find a sub-deparment with same id as the one selected by use
  const selectedSubDepartment = useMemo(() => {
    const subDep = subDepartments?.find(
      (d) => d.id === formik.values.subDepartmentId
    );
    return subDep;
  }, [formik.values.subDepartmentId]);

  // get the categories of the selected sub-deparment

  const categories = selectedSubDepartment?.Category;

  const handleFilesChange = (files: FileList | null) =>
    formik.setFieldValue("files", files);

if( !product) {
  return <p>Loading....</p>
}

  return (
    <div className="mt-0 md:mt-16 mb-16 flex h-fit w-screen flex-col bg-gradient-to-tr from-white via-white to-violet-50 text-sm md:text-[16px]">
      <div className="flex w-screen flex-row justify-center">
        <form
          className="my-8 mx-auto flex h-fit w-[370px] flex-col items-start gap-4 rounded-md bg-white py-5 px-4 shadow-md md:w-[60%] md:px-10"
          onSubmit={formik.handleSubmit}
        >
          <section className="flex w-full flex-col gap-3">
            <p className="text-center text-xl">Product Details</p>
            <div className="flex w-full flex-row flex-wrap justify-between md:gap-4">
         
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Pick a Department</span>
                  </label>
                  <select
                    className="select-bordered select-primary select"
                    onChange={formik.handleChange("departmentId")}
                    onBlur={formik.handleBlur("departmentId")}
                    value={formik.values.departmentId}
                  >
                    <option value="">Pick a Department</option>
                    {departments?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
          
          
                <div className="form-control w-full max-w-xs transition">
                  <label className="label">
                    <span className="label-text">Pick a sub-department</span>
                  </label>
                  <select
                    className="select-bordered select-primary select bg-white"
                    onChange={formik.handleChange("subDepartmentId")}
                    onBlur={formik.handleBlur("subDepartmentId")}
                    value={formik.values.subDepartmentId}
                  >
                    <option value="">Choose Sub-department</option>
                    {subDepartments?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
           
          
                <div className="form-control w-full max-w-xs">
                  <label className="label flex flex-row ">
                    <span className="label-text">Pick a Category</span>
                    {formik.values.categoryId && (
                      <button
                        className="btn-error btn-xs btn "
                        onClick={() => formik.resetForm()}
                      >
                        {" "}
                        x Clear
                      </button>
                    )}
                  </label>
                  <select
                    className="select-bordered select-primary select"
                    onChange={formik.handleChange("categoryId")}
                    onBlur={formik.handleBlur("categoryId")}
                    value={formik.values.categoryId}
                  >
                    <option value="">Choose Category</option>
                    {categories?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
           
              <div className="my-1 flex flex-col gap-2">
                <Alerts>
                  {formik.touched.departmentId && formik.errors.departmentId}
                </Alerts>
                <Alerts>
                  {formik.touched.subDepartmentId &&
                    formik.errors.subDepartmentId}
                </Alerts>
                <Alerts>
                  {formik.touched.categoryId && formik.errors.categoryId}
                </Alerts>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Name/type of Product?</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  placeholder="Name of Product"
                  className="input-bordered input-primary input w-full max-w-xs"
                />
                <label className="label"></label>
              </div>
              <Alerts>{formik.touched.name && formik.errors.name}</Alerts>
            </div>
          </section>
       
          <section className="flex w-full flex-col gap-3">
            <div className="flex w-full flex-row flex-wrap justify-between md:gap-4">
              <div className="flex w-full flex-row flex-wrap justify-between ">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formik.values.location}
                    onChange={formik.handleChange("location")}
                    onBlur={formik.handleBlur("location")}
                    placeholder="location of Product"
                    className="input-bordered input-primary input w-full max-w-xs"
                  />
                  <label className="label"></label>
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Price of Product?</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={formik.values.price}
                    onChange={e => {
                      formik.setFieldValue("price", parseInt(e.target.value));
                    }}
                    onBlur={formik.handleBlur("price")}
                    placeholder="Ksh."
                    className="input-bordered input-primary input w-full max-w-xs"
                  />
                  <label className="label"></label>
                </div>
                <Alerts>{formik.touched.price && formik.errors.price}</Alerts>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Product Description</span>
                  </label>
                  <textarea
                    className="textarea-bordered textarea-primary textarea h-fit"
                    id="description"
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    placeholder="Product Description"
                  ></textarea>
                  <label className="label"></label>
                </div>
                <Alerts>
                  {formik.touched.description && formik.errors.description}
                </Alerts>
              </div>
            </div>
          </section>
          <section className="flex w-full flex-col gap-3">
            <p className="text-center text-xl">Extra Information (Optional)</p>
            <div className="flex w-full flex-row flex-wrap justify-between md:gap-4">
              <div className="flex w-full flex-row flex-wrap items-baseline gap-4 md:justify-between ">
                <div className="form-control flex flex-col">
                  <p className="text-sm">Condition</p>
                  <label className="label cursor-pointer gap-2 ">
                    <span className="label-text text-green-600">New</span>
                    <input
                      type="checkbox"
                      checked={formik.values.secondHand}
                      className="toggle-primary toggle "
                      onBlur={formik.handleBlur("secondHand")}
                      onChange={() =>
                        formik.setFieldValue(
                          "secondHand",
                          !formik.values.secondHand
                        )
                      }
                    />
                    <span className="label-text text-sky-600">Second Hand</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Enter Product Materials</span>
                  </label>
                  <input
                    type="text"
                    id="productMaterials"
                    value={formik.values.productMaterials}
                    onChange={formik.handleChange("productMaterials")}
                    onBlur={formik.handleBlur("productMaterials")}
                    placeholder="Separate by Commas e.g leather, rexin"
                    className="input-bordered input-primary input w-full max-w-xs"
                  />
                  <label className="label"></label>
                </div>

                <div className="flex flex-col ">
                  <p className="text-sm">
                    Variants: The Product has Different?{" "}
                  </p>
                  <div className="flex flex-row">
                    <div className="form-control">
                      <label className="label cursor-pointer gap-2">
                        <span className="label-text text-violet-600">
                          Colors
                        </span>
                        <input
                          type="radio"
                          id="colors"
                          checked={formik.values.variantType==="colors"}
                          onBlur={formik.handleBlur("variantType")}
                          onChange={() =>
                            formik.setFieldValue("variantType", "colors")
                          }
                          name="radio-10"
                          className="radio checked:bg-indigo-600"
                        />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer gap-2">
                        <span className="label-text text-blue-600">Sizes</span>
                        <input
                          type="radio"
                          id="sizes"
                          
                          checked={formik.values.variantType==="sizes"}
                          onBlur={formik.handleBlur("variantType")}
                          onChange={() =>
                            formik.setFieldValue("variantType", "sizes")
                          }
                          name="radio-10"
                          className="radio checked:bg-blue-600"
                        />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer gap-2">
                        <span className="label-text text-cyan-600">
                          Designs
                        </span>
                        <input
                          type="radio"
                          id="desings"
                          checked={formik.values.variantType==="designs"}
                          onBlur={formik.handleBlur("variantType")}
                          onChange={() =>
                            formik.setFieldValue("variantType", "designs")
                          }
                          name="radio-10"
                          className="radio checked:bg-cyan-600"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">
                      {` Enter Product ${
                        colors
                          ? "Colors"
                          : sizes
                          ? "Sizes"
                          : designs
                          ? "Designs"
                          : "Variants Selected"
                      } `}
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formik.values.variants}
                    placeholder="Separate by Commas e.g black, red, blue"
                    className="input-bordered input-primary input w-full max-w-xs"
                    id={`${colors ? "colors" : sizes ? "sizes" : "designs"} `}
                    onBlur={
                      formik.values.variantType
                        ? formik.handleBlur("variants")
                        : () => null
                    }
                    onChange={formik.handleChange("variants")}
                  />
                  <label className="label"></label>
                </div>
              </div>
            </div>
          </section>

          <section className="flex w-full flex-col">
            <p className="text-center text-xl">
              Product Measurements in centimeter (Optional)
            </p>
            <div className="flex w-[322px] flex-row  gap-3 ">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Width</span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  id="width"
                  onChange={formik.handleChange("width")}
                  className="input-bordered input-primary input w-full max-w-xs"
                />
                <label className="label"></label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Length</span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  id="length"
                  onChange={formik.handleChange("length")}
                  className="input-bordered input-primary input w-full max-w-xs"
                />
                <label className="label"></label>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">height</span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  id="height"
                  onChange={formik.handleChange("height")}
                  className="input-bordered input-primary input w-full max-w-xs"
                />
                <label className="label"></label>
              </div>
            </div>
          </section>
          {isLoading ? <div className="w-[322px]">
          <LoadingButton />
        </div>:   <button
            className="w-[322px] rounded bg-violet-600 bg-opacity-30 p-3 text-violet-700 outline outline-1 outline-violet-600 hover:bg-violet-600 hover:bg-opacity-100 hover:text-white"
            type="submit"
          >
            Submit
          </button>}
        </form>
      </div>
    </div>
  );
};

export default EditProductform;

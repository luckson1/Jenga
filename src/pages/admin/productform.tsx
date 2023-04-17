import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import Previews from "../../components/forms/DropZone";
import { useFormik } from "formik";
import { api } from "../../utils/api";
import Alerts from "../../components/display/errors/Alerts";
import axios from "axios";
import { useRouter } from "next/router";
import LoadingButton from "../../components/display/LoadingButton";
import { useSession } from "next-auth/react";
import { LoginCard } from "../../components/forms/LoginPage";
import Loading from "../../components/display/LoadingComponent";
import Onboarding from "../../components/forms/Onboarding";
import Head from "next/head";
import { Toaster, toast } from "react-hot-toast";

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
  files: Yup.array(Yup.string()).required("Please upload product Images"),
  price: Yup.number().min(1, "Price is Required"),

  location: Yup.string().required(),

  whatsappNumber: Yup.string()
    .matches(/^(?:\+254|0)[17]\d{8}$/, "Invalid Kenyan whatsapp number")
    .required("whatsapp number is required"),
  width: Yup.number().nullable(),
  length: Yup.number().nullable(),
  height: Yup.number().nullable(),

  productMaterials: Yup.string(),
  variantType: Yup.string(),
  variants: Yup.string(),
});

export interface ProductParams {
  name: string;
  departmentId: string;
  subDepartmentId: string;
  categoryId: string;
  description: string;
  files?: FileList;
  price: number;
  location: string;
  whatsappNumber: string;
  width?: number;
  length?: number;
  height?: number;

  productMaterials?: string;
  variantType?: string;
  variants?: string;

  materials?: string;
}

const Productform = () => {
  const { data, status } = useSession();
  // tslint:disable-next-line (for vercel build)
  //@ts-ignore
  const userRole = data?.user?.role;
  const isAllowed = userRole === "ADMIN" || userRole === "EDITOR";
  const isLoadingStatus = status === "loading";
  const isUnAthorised = status === "unauthenticated";
  const isAuthorised = status === "authenticated";

  const { mutate: addProduct, data: product } =
    api.product.addProduct.useMutation({
      onSuccess: () => toast.success("Product created successfully"),
    });
  const [isLoading, setIsloading] = useState(false);
  // TODO: create image and Upload to s3 bucket

  async function uploadToS3(values: ProductParams, productId?: string) {
    const files = values.files;

    if (!files) {
      return null;
    }
    // loop through files and create an image then create signed url using image id
    for (const file of files) {
      const { data }: { data: { uploadUrl: string; key: string } } =
        await axios.get(`/api/aws/uploadImages?productId=${productId}`);

      const { uploadUrl } = data;

      await axios.put(uploadUrl, file);
    }
  }

  //handle submission of form values
  async function handleSubmit(values: ProductParams) {
    addProduct(values);
  }
  const productId = product?.id;

  // check if productId is available after submitting and create images with it then navigate to dashboard
  const router = useRouter();
  const context = api.useContext();
  //invalidate products data
  const invalidate = useCallback(() => {
    context.product.getUserProducts.invalidate();
  }, []);

  useEffect(() => {
    if (productId) {
      setIsloading(true);
      uploadToS3(formik.values, productId).then(() => {
        setIsloading(false);
        invalidate();
        toast.success("Files Uploaded Successfully");
      });
    }
  }, [productId, invalidate]);
  const formik = useFormik({
    initialValues: {
      name: "",

      departmentId: "",
      subDepartmentId: "",
      categoryId: "",
      description: "",
      files: undefined,
      price: 0,
      location: "",

      variantType: undefined,
      whatsappNumber: "",
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

  // define types of product variants
  const sizes = formik.values.variantType === "sizes";
  const colors = formik.values.variantType === "colors";
  const designs = formik.values.variantType === "designs";

  if (isUnAthorised) return <LoginCard />;
  if (isLoadingStatus)
    return (
      <div className="h-[300px] w-[300px]">
        <Loading />{" "}
      </div>
    );
  if (isAuthorised && !isAllowed) return <Onboarding />;
  return (
    <>
      <Head>
        <title>Jenga</title>
        <meta name="description" content="Build your Dream Spaces" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="mt-0 flex h-fit w-screen flex-col bg-gradient-to-tr from-white via-white to-violet-50 text-sm md:mt-16 md:text-[16px]">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="flex w-full flex-row justify-center">
          <form
            className="my-8 mx-auto flex h-fit w-[90%] flex-col items-start gap-4 rounded-md bg-base-100 py-5 px-4 shadow-md max-w-3xl"
            onSubmit={formik.handleSubmit}
          >
            <section className="flex w-full flex-col gap-3">
              <p className="text-center text-xl">Product Details</p>
              <div className="flex w-full flex-row flex-wrap justify-between md:gap-4">
                {!formik.values.departmentId && (
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
                )}
                {formik.values.departmentId &&
                  !formik.values.subDepartmentId && (
                    <div className="form-control w-full max-w-xs transition">
                      <label className="label">
                        <span className="label-text">
                          Pick a sub-department
                        </span>
                      </label>
                      <select
                        className="select-bordered select-primary select bg-base-100"
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
                  )}
                {formik.values.subDepartmentId && (
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
                )}
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
              <div className="flex w-full flex-col  gap-2">
                <p>Upload Product Images</p>
                <Previews
                  handleBlur={formik.handleBlur("files")}
                  handleChange={handleFilesChange}
                />
              </div>

              <Alerts>{formik.touched.files && formik.errors.files}</Alerts>
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
                      onChange={(e) => {
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
              <p className="text-center text-xl">
                Extra Information (Optional)
              </p>
              <div className="flex w-full flex-row flex-wrap justify-between md:gap-4">
                <div className="flex w-full flex-row flex-wrap items-baseline gap-4 md:justify-between ">
                  <div className="form-control  w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Whatsapp Number</span>
                    </label>
                    <input
                      type="tel"
                      id="whatsappNumber"
                      onChange={formik.handleChange("whatsappNumber")}
                      onBlur={formik.handleBlur("whatsappNumber")}
                      placeholder="0722XXXX21"
                      className="input-bordered input-primary input w-full max-w-xs"
                    />
                  </div>
                  <Alerts>
                    {formik.touched.whatsappNumber &&
                      formik.errors.whatsappNumber}
                  </Alerts>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">
                        Enter Product Materials
                      </span>
                    </label>
                    <input
                      type="text"
                      id=" productMaterials"
                      onChange={formik.handleChange(" productMaterials")}
                      onBlur={formik.handleBlur(" productMaterials")}
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
                          <span className="label-text text-blue-600">
                            Sizes
                          </span>
                          <input
                            type="radio"
                            id="sizes"
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
            {isLoading ? (
              <div className="w-[322px]">
                <LoadingButton />
              </div>
            ) : (
              <button
                className="w-[322px] rounded bg-violet-600 bg-opacity-30 p-3 text-violet-700 outline outline-1 outline-violet-600 hover:bg-violet-600 hover:bg-opacity-100 hover:text-white"
                type="submit"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Productform;

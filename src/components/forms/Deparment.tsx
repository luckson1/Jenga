import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../../utils/api";
import Alerts from "../display/errors/Alerts";
const departmentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
});
const Department = ({ handleClose }: { handleClose: () => void }) => {
    const context=api.useContext()
  const { mutate: add, error } = api.departments.add.useMutation({
    onSuccess: () => {handleClose(); context.departments.getAll.invalidate()}
  });

  const formik = useFormik({
    initialValues: {
      name: " ",
      departments: []
    },
    validationSchema: departmentSchema,
    onSubmit: (values) => {
      add(values);
    },
  });

  return (
    <div className=" fixed top-20 left-5 h-72 w-80 bg-base-100 shadow-md md:left-32 md:w-[600px] lg:left-96">
      <p>{error?.message}</p>
      <form
        className="mx-auto my-10 flex  h-fit w-[80%] flex-row flex-wrap items-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-row gap-5">
          <p className="my-1">Name</p>
          <input
            className="w-60 rounded-md py-1 px-2 outline outline-1 outline-slate-600 mb-4"
            placeholder="Deparment Name"
            id="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <button className="my-auto mx-auto h-8 rounded-md bg-inherit px-5 py-1 text-violet-400 outline outline-1 outline-violet-400 hover:bg-violet-400 hover:text-white mb-4" type="submit">
          Add
        </button>
        <Alerts>{formik.touched.name && formik.errors.name}</Alerts>
      </form>
    </div>
  );
};

export default Department;

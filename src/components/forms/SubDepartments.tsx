import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../../utils/api";
import Alerts from "../display/errors/Alerts";
const SubDepartmentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  departmentId: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
const SubDepartment = ({ handleClose }: { handleClose: () => void }) => {
  const context = api.useContext();
  const { mutate: add, error } = api.subDepartments.add.useMutation({
    onSuccess: () => {
      handleClose();
      context.subDepartments.getAll.invalidate();
    },
  });
  // TODO: fetch all departments
  const { data: departments } = api.departments.getAll.useQuery();
  const formik = useFormik({
    initialValues: {
      name: " ",
      departmentId: " ",
    },
    validationSchema: SubDepartmentSchema,
    onSubmit: (values) => {
      add(values);
    },
  });

  return (
    <div className=" fixed top-20 left-5 h-fit w-80 bg-base-100 py-7 shadow-md md:left-32 md:w-[600px] lg:left-96">
      <p>{error?.message}</p>
      <form
        className="mx-auto my-10 flex  h-fit w-[80%] flex-col  items-start"
        onSubmit={formik.handleSubmit}
      >
        <div className="my-4 flex flex-row gap-5">
          <p className="my-1">Name</p>
          <input
            className="mb-4 w-60 rounded-md py-1 px-2 outline outline-1 outline-slate-600"
            placeholder="Deparment Name"
            id="name"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
          />
        </div>
        <Alerts>{formik.touched.name && formik.errors.name}</Alerts>
        <p className="my-4 text-center">Choose Departments</p>
        <div className="mb-7 flex flex-row flex-wrap gap-2">
          {departments?.map((s) => (
            <label
              className="label flex w-32 cursor-pointer flex-row gap-1"
              key={s.id}
            >
              <span className="label-text">{s.name}</span>
              <input
                type="checkbox"
                checked={formik.values.departmentId === s.id}
                className="radio-primary radio"
                value={undefined}
                id={`${s.name}`}
                onChange={() => {
                  formik.setFieldValue("departmentId", s.id);
                }}
                onBlur={formik.handleBlur("departmentId")}
              />
            </label>
            
          ))}
               <Alerts>{formik.touched.departmentId && formik.errors.departmentId}</Alerts>
        </div>
        <button
          className="my-auto mx-auto mb-4 h-8 w-40 rounded-md bg-inherit px-5 py-1 text-violet-400 outline outline-1 outline-violet-400 hover:bg-violet-400 hover:text-white"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default SubDepartment;

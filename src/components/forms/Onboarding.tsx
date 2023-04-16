import React, { useEffect } from "react";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorMessage } from "@hookform/error-message";
import { z } from "zod";
import axios from "axios";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import LoadingButton from "../display/LoadingButton";
import { useSession } from "next-auth/react";
import { LoginCard } from "./LoginPage";
import Loading from "../display/LoadingComponent";
import { Toaster, toast } from "react-hot-toast";
const sellerSchema = z.object({
  businessName: z.string().min(1, { message: "Business Name Required" }),
  streetAddress: z.string().min(1, { message: " Street Address Required" }),
  location: z.string().min(1, { message: " Location Required" }),
  website: z.string().min(1, { message: "Website Required" }),
  phoneNumber: z.number(),
  logo: z
    .custom<FileList>()
   ,
});
type Values = z.infer<typeof sellerSchema>;
const Onboarding = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(sellerSchema),
  });
  const { data, status } = useSession();
  // tslint:disable-next-line (for vercel build)
  //@ts-ignore
  const userRole = data?.user?.role;
  const isOnboarded = userRole === "SELLER";
  const isAdmin = userRole === "ADMIN"
  const isLoadingStatus = status === "loading";
  const isUnAthorised = status === "unauthenticated";
  const router = useRouter();
  useEffect(() => {
    if (isOnboarded) router.push("/dashboard");
  }, [isOnboarded, router]);
  // if a user is seller, route them to dashboard
  //upload Logo to s3 bucket
  const { mutate: addSeller, isLoading,} = api.user.addSeller.useMutation({
    onSuccess: () => router.push("/dashboard"),
  });
  const { mutate: addUser, isLoading: userLoading,  data:user,} = api.user.add.useMutation({
    onSuccess: () => toast.success('Successfully Created!'),
    onError: (data)=> toast.error(`${data.message}`)
  });
  async function uploadToS3(files: FileList) {
    console.log(files);
    if (!files) {
      return null;
    }
    // upload the image contained in the file list to s3
    for (const file of files) {
      const { data }: { data: { uploadUrl: string; key: string } } =
        await axios.get(`/api/aws/uploadLogo?userId=${user?.id}`);

      const { uploadUrl } = data;

      await axios.put(uploadUrl, file);
    }
  }


  const onSubmit = isAdmin? handleSubmit(async (data) => {

   await addUser(data);
   
   uploadToS3(data.logo);
  }): handleSubmit(async (data) => {
    await uploadToS3(data.logo);
   addSeller(data) 
  })
  
  if (isUnAthorised) return <LoginCard />;
  if (isLoadingStatus)
    return (
      <div className="h-[300px] w-[300px]">
        <Loading />
      </div>
    );
  return (
    <div className="mt-0 mb-2  flex w-full items-center justify-center rounded-md bg-base-100 p-8 md:mt-16">
      <Toaster
  position="top-right"
  reverseOrder={true}
/>
      <div className="my-10 flex h-fit w-[95%] flex-col rounded-md bg-slate-50 bg-opacity-40 shadow-lg shadow-slate-500/100 md:my-20 md:w-[95%] lg:w-[70%]">
        <p className="mt-4 text-center text-2xl tracking-wider">
          Register Your Business
        </p>
        <form
          className="flex h-fit w-full flex-row flex-wrap justify-around rounded-md py-10 px-5 md:py-16 md:px-10"
          onSubmit={onSubmit}
        >
          <div className="form-control  w-full max-w-xs">
            <label className="label">
              <span className="label-text">Business Name</span>
            </label>
            <input
              {...register("businessName")}
              type="text"
              placeholder="Business Name"
              className="input-bordered input-primary input w-full max-w-xs"
            />
            <ErrorMessage errors={errors} name="businessName" as="h5" />
          </div>
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text">Business Street Address</span>
            </label>
            <input
              {...register("streetAddress")}
              type="text"
              placeholder="Street Address, Building Name"
              className="input-bordered input-primary input w-full max-w-xs"
            />
            <ErrorMessage errors={errors} name="streetAddress" as="h5" />
          </div>
          <div className="form-control  w-full max-w-xs">
            <label className="label">
              <span className="label-text">Business Location (Town)</span>
            </label>
            <input
              {...register("location")}
              type="text"
              placeholder="Business Location (Town)"
              className="input-bordered input-primary input w-full max-w-xs"
            />
            <ErrorMessage errors={errors} name="location" as="h5" />
          </div>

          <div className="form-control  w-full max-w-xs">
            <label className="label">
              <span className="label-text">Business Website Url</span>
            </label>
            <input
              {...register("website")}
              type="text"
              placeholder="www.business.co.ke"
              className="input-bordered input-primary input w-full max-w-xs"
            />
            <ErrorMessage errors={errors} name="website" as="h5" />
          </div>
          <div className="form-control  w-full max-w-xs">
            <label className="label">
              <span className="label-text">Whatsapp Number</span>
            </label>
            <input
              {...register("phoneNumber", {
                valueAsNumber: true,
              })}
              type="tel"
              placeholder="0722XXXX21"
              className="input-bordered input-primary input w-full max-w-xs"
            />
            <ErrorMessage errors={errors} name="phoneNumber" as="h5" />
          </div>
          <div className="form-control  w-full max-w-xs">
            <label className="label">
              <span className="label-text">Business Logo</span>
            </label>
            <input
              {...register("logo")}
              type="file"
              className="file-input-bordered file-input-primary file-input w-full max-w-xs"
            />
            <ErrorMessage errors={errors} name="logo" as="h5" />
          </div>

          {isLoading ? (
            <LoadingButton />
          ) : (
            <div className="form-control  w-full max-w-xs">
              <button
                type="submit"
                className="btn-primary btn my-5 w-full max-w-xs"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default Onboarding;

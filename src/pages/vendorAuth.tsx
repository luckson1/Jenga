import Head from "next/head";
import { VendorLogin } from "../components/forms/VendorLogin";


export default function VentorAuth () {

    return (
   
       <>
        <Head>
        <title>Jenga</title>
        <meta name="description" content="Build your Dream Spaces" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="bg-gradient-to-r  from-indigo-50 via-zinc-50 to-slate-50  w-screen h-screen ">
        <VendorLogin  />
        </div>
       </>
       
   

    )
  }
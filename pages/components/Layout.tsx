import React from "react";
import type { ReactNode } from "react";
import Nav from "./navigation/Nav";
import Head from "next/head";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
    <Head>
    <title></title>
    <meta name="description" content="House Improvement Marketplace" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  
    <div className="flex flex-col">
     
      <Nav />
      <main className="mt-16">{children}</main>
    </div>
    </>
  );
};

export default Layout;

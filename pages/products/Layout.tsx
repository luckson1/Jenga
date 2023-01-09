import React from "react";
import type { ReactNode } from "react";
import Nav from "../components/navigation/Nav";
import Head from "next/head";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
  
  
    <div className="flex flex-col">
     
      <Nav />
      <main className="mt-16">{children}</main>
    </div>
    </>
  );
};

export default Layout;

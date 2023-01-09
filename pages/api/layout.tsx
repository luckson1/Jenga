import React from "react";
import type { ReactNode } from "react";
import Nav from "../components/navigation/Nav";


const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
  
  
    <div className="flex flex-col">
     
      <Nav />
      <main className="mt-16">{children}</main>
    </div>
    </>
  );
};

export default layout;

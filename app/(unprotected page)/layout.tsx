import Navbar from "@/components/unprotected_pages/Navbar/Navbar";
import React from "react";

export default function UnprotectedpagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-main">
      <Navbar />
      <main className=" pt-20 ">{children}</main>
    </div>
  );
}

import Navbar from "@/components/unprotected_pages/Navbar/Navbar";
import React from "react";

export default function UnprotectedpagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className=" mt-10">{children}</main>
    </div>
  );
}

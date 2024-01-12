import React from "react";
import NavbarRoute from "./Navbar-Route";
import MobileMenu from "./Mobile-Menu";
import Link from "next/link";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 bg-main  lg:px-20  py-4 border-b border-gray-400 fixed top-0 w-full">
      <section className="flex items-center gap-2">
        <Link href={"/"}>Logo</Link>
      </section>
      <section className="hidden md:flex items-center gap-5 lg:gap-10  ">
        <NavbarRoute />
        <div className="flex items-center gap-3 text-white">
          <Link
            href={"/login"}
            className="bg-black px-5 py-2 rounded-md hover:bg-slate-900"
          >
            Login
          </Link>
          <Link
            href={"/register"}
            className="bg-black  px-5 py-2 rounded-md hover:bg-slate-900"
          >
            Register
          </Link>
        </div>
      </section>
      <section className="md:hidden flex  gap-3 ">
        <button>
          <User className="w-7 h-7" />
        </button>
        <MobileMenu />
      </section>
    </nav>
  );
}

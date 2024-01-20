import React from "react";
import NavbarRoute from "./Navbar-Route";
import MobileMenu from "./Mobile-Menu";
import Link from "next/link";
import Logo from "@/components/Logo";
import { User } from "lucide-react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cn } from "@/lib/utils";

export default async function Navbar() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center justify-between px-5 bg-main  lg:px-20  py-4 border-b border-gray-400 fixed top-0 w-full">
      <Logo />
      <section className="hidden md:flex items-center gap-5 lg:gap-10  ">
        <NavbarRoute />
        <div className="flex items-center gap-3 text-white">
          <Link
            href={"/dashboard"}
            className={cn(
              " px-5 py-2 rounded-md ",
              user ? "bg-primary-color" : "bg-secondary-color"
            )}
          >
            {user ? "Dashboard" : "Log in"}
          </Link>
          <Link
            href={"/register"}
            className={cn(
              "bg-primary-color px-5 py-2 rounded-md ",
              user && "hidden"
            )}
          >
            Register
          </Link>
        </div>
      </section>
      <section className="md:hidden flex  gap-3 ">
        <Link href={"/user"}>
          <User className="w-7 h-7" />
        </Link>
        <MobileMenu />
      </section>
    </nav>
  );
}

"use client";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const navbar = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "About",
    route: "/about",
  },
  {
    title: "Contact",
    route: "/contact",
  },
];

interface INavbarRoute {
  isMobile?: boolean
}

export default function NavbarRoute(props: INavbarRoute) {
  const pathname = usePathname();

  if (props.isMobile) {
    return (
      navbar.map((nav, i) => (
        <SheetClose asChild key={i}>
          <Link
            href={nav.route}

            className={cn(
              "text-lg text-slate-500 duration-300 hover:text-slate-900",
              pathname === nav.route && "text-black"
            )}

          >

            {nav.title}
          </Link>
        </SheetClose>
      ))
    )
  }

  return !props.isMobile && navbar.map((nav, i) => (
    <Link
      href={nav.route}
      key={i}
      className={cn(
        "text-lg text-slate-500 duration-300 hover:text-slate-900",
        pathname === nav.route && "text-black"
      )}

    >

      {nav.title}
    </Link>
  ));
}

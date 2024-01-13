import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import React from "react";
import { sideNavRoutes } from "./SideNav";
import Link from "next/link";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="" />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <nav className=" h-full w-full bg-white rounded-lg flex flex-col gap-10 pt-10 pl-10">
          <SheetClose asChild>
            <Link
              href={"/dashboard/user-info"}
              className="flex items-center gap-2 justify-center"
            >
              <User />
              <p>Username</p>
            </Link>
          </SheetClose>
          {sideNavRoutes.map((item: any, i: number) => (
            <SheetClose asChild key={i}>
              <Link href={item.route} className="flex items-center gap-2">
                <div className="w-[30px]">{item.icon}</div>
                {item.title}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

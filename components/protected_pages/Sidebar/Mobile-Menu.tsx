"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { navRoutes } from "./Sidebar-Routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logout } from "./Logout";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function MobileMenu() {
  const pathname = usePathname();
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState<string | undefined>("");
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setEmail(user?.email);
    };
    getUser();
  });
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <div className="flex flex-col gap-5 h-full pt-10">
          {navRoutes.map((item, i) => (
            <SheetClose asChild key={i}>
              <Link
                href={item.route}
                className={cn(
                  "flex items-center gap-2 rounded-md pr-8 xl:pr-16 text-[#626C81]  pl-1 xl:pl-3  py-3 ",
                  item.route === pathname && "bg-[#F6FEF9] text-[#11CD6F]"
                )}
              >
                <div className="w-[30px]">{item.icon}</div>
                {item.title}
              </Link>
            </SheetClose>
          ))}
          <div className=" flex flex-col  gap-4 mt-auto ">
            <SheetClose asChild>
              <Link
                href={"/user"}
                className="flex justify-center w-full items-center gap-2"
              >
                <User />
                <p>{email}</p>
              </Link>
            </SheetClose>
            <Logout />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

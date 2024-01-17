import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import React from "react";
import NavbarRoute from "./Navbar-Route";

export default function MobileMenu() {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="w-7 h-7" />
        </SheetTrigger>
        <SheetContent className="bg-main">
          <nav className="flex flex-col gap-5 mt-5">
            <NavbarRoute isMobile />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

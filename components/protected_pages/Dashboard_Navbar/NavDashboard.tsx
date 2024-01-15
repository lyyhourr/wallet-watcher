import { Menu } from "lucide-react";
import NavRoutes from "./Nav-Routes";
import MobileMenu from "./Mobile-Menu";
import Logo from "@/components/Logo";

export default function NavDashboard() {
  return (
    <nav className='flex lg:flex-col justify-between lg:justify-normal items-center lg:items-start lg:gap-20 p-3 lg:p-5 border-b lg:border-r border-gray-400 '>
      <section className='flex items-center justify-start lg:justify-center gap-3 w-full cursor-pointer'>
        <Logo />
        <p>name</p>
      </section>
      <section className='hidden lg:flex flex-col gap-2'>
        <NavRoutes />
      </section>
      <div className='mt-auto pb-10 hidden lg:flex justify-center w-full items-center gap-2'>
        <p>img</p>
        <p>username</p>
      </div>
      <section className='lg:hidden'>
        <MobileMenu />
      </section>
    </nav>
  );
}

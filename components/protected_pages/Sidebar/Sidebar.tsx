import MobileMenu from "./Mobile-Menu";
import Logo from "@/components/Logo";
import SidebarRoutes from "./Sidebar-Routes";
import UserAccount from "./UserAccount";
import { Logout } from "./Logout";

export default function Sidebar() {
  return (
    <nav className='flex lg:flex-col justify-between lg:justify-normal items-center lg:items-start lg:gap-20 p-3 lg:p-5 border-b lg:border-b-0 lg:border-r border-gray-400 '>
      <section className=''>
        <Logo />
      </section>
      <section className='hidden lg:flex flex-col gap-2'>
        <SidebarRoutes />
      </section>
      <div className="hidden lg:flex flex-col  gap-4 mt-auto ">
        <UserAccount />
        <Logout />
      </div>
      <section className='lg:hidden'>
        <MobileMenu />
      </section>
    </nav>
  );
}

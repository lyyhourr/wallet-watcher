"use client";
import { cn } from "@/lib/utils";
import { HistoryIcon, HomeIcon, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GrDashboard, GrOverview } from "react-icons/gr";
export const sideNavRoutes = [
  {
    title: "Home",
    route: "/dashboard/home",
    icon: <HomeIcon />,
  },
  {
    title: "Dashbaord",
    route: "/dashboard",
    icon: <GrDashboard />,
  },
  {
    title: "Overview",
    route: "/dashboard/overview",
    icon: <GrOverview />,
  },
  {
    title: "History",
    route: "/dashboard/history",
    icon: <HistoryIcon />,
  },
  {
    title: "Setting",
    route: "/dashboard/setting",
    icon: <Settings />,
  },
];
export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className=" h-full w-full bg-white rounded-lg flex flex-col gap-10 pt-10 pl-10">
      <Link
        href={"/dashboard/user-info"}
        className="flex items-center gap-2 justify-center"
      >
        <User />
        <p>Username</p>
      </Link>
      {sideNavRoutes.map((item: any, i: number) => (
        <Link
          key={i}
          href={item.route}
          className={cn(
            `flex items-center gap-2`,
            item.route === pathname && "text-primary-color"
          )}
        >
          <div className="w-[30px]">{item.icon}</div>
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

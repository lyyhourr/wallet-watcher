"use client"
import { cn } from '@/lib/utils';
import { HistoryIcon, LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { GrOverview } from 'react-icons/gr';


interface INavRoutes {
    title: string
    route: string
    icon: any
}

export const navRoutes: INavRoutes[] = [
    {
        title: "Overview",
        route: "/overview",
        icon: <GrOverview />,
    },
    {
        title: "Dashbaord",
        route: "/dashboard",
        icon: <LayoutDashboard />,
    },
    {
        title: "History",
        route: "/history",
        icon: <HistoryIcon />,
    },
    {
        title: "Setting",
        route: "/setting",
        icon: <Settings />,
    },
];

export default function SidebarRoutes() {
    const pathname = usePathname()
    return navRoutes.map((item, i) => (
        <Link key={i} href={item.route}
            className={cn('flex items-center gap-2 rounded-md pr-8 xl:pr-16 text-[#626C81]  pl-1 xl:pl-3  py-3 ',
                item.route === pathname && "bg-[#F6FEF9] text-[#11CD6F]"
            )}
        >
            <div className='w-[30px]'>
                {item.icon}
            </div>
            {item.title}
        </Link>

    ))

}

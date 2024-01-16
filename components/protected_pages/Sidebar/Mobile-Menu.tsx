"use client"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import React from 'react'
import { navRoutes } from './Sidebar-Routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import UserAccount from './UserAccount'
import { Logout } from './Logout'

export default function MobileMenu() {
    const pathname = usePathname()
    return (
        <Sheet>
            <SheetTrigger>
                <MenuIcon />
            </SheetTrigger>
            <SheetContent side={"left"}>
                <div className='flex flex-col gap-5 h-full pt-10'>
                    {
                        navRoutes.map((item, i) => (
                            <SheetClose asChild key={i}>

                                <Link href={item.route}
                                    className={cn('flex items-center gap-2 rounded-md pr-8 xl:pr-16 text-[#626C81]  pl-1 xl:pl-3  py-3 ',
                                        item.route === pathname && "bg-[#F6FEF9] text-[#11CD6F]"
                                    )}
                                >
                                    <div className='w-[30px]'>
                                        {item.icon}
                                    </div>
                                    {item.title}
                                </Link>
                            </SheetClose>
                        ))
                    }
                    <div className=" flex flex-col  gap-4 mt-auto ">
                        <UserAccount />
                        <Logout />
                    </div>
                </div>

            </SheetContent>
        </Sheet>
    )
}
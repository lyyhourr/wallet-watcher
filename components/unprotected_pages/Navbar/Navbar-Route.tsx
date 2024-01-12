"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
const navbar = [
    {
        title: "Home",
        route: "/"
    },
    {
        title: "About",
        route: "/about"
    },
    {
        title: "Contact",
        route: "/contact"
    },
]

export default function NavbarRoute() {
    const pathname = usePathname();

    return navbar.map((nav, i) => (
        <Link href={nav.route} key={i} className={cn("text-lg text-gray-600 duration-300 hover:text-gray-900", pathname === nav.route && "text-black")}>{nav.title}</Link>
    ))


}

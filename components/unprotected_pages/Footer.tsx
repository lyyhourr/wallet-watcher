import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const socials = [
    {
        img: "fb.png",
        href: "https://www.facebook.com/profile.php?id=100077547875626",
    },
    {
        img: "ig.png",
        href: "https://www.instagram.com/lyhourrr_m/?next=%2F",
    },
    {
        img: "telegram.png",
        href: "https://t.me/lyhuamam",
    },
]

export default function Footer() {
    return (
        <footer className="flex flex-col gap-3 p-3 bg-green-600  text-white ">
            <div className="flex justify-center items-center gap-4">
                {
                    socials.map((item) => (
                        <Link href={item.href} key={item.href}>
                            <Image
                                src={`/images/${item.img}`}
                                width={100000}
                                height={100000}
                                alt={item.img}
                                className="w-[50px] h-[50px]"
                            />
                        </Link>
                    ))
                }
            </div>
            <div className="flex gap-2 items-center justify-center">
                <p className="hover:underline cursor-pointer">Term of use</p>
                <p className="hover:underline cursor-pointer">Privacy Policy</p>
            </div>
            <p className="hover:underline cursor-pointer text-sm text-center">@2024 Mamlyhua</p>
        </footer>
    )
}

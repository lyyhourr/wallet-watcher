import { fontHero, inter } from '@/fonts/Fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AboutPage() {
    return (
        <main className='lg:pt-8 flex lg:h-screen'>
            <section className=' w-full flex p-5 '>
                <div className="flex flex-col gap-3 sm:gap-5 lg:gap-7 md:gap-10 xl:gap-16 py-5 sm:text-lg">
                    <h1 className={`${fontHero.className} text-7xl  sm:text-9xl`}>About Me</h1>
                    <h2 className={`${fontHero.className} text-3xl sm:text-5xl`}>Bringing Simplicity to Student Finances</h2>
                    <div className={`${inter.className} flex flex-col gap-3 md:w-[90%] xl:w-[70%]  `}>
                        <p>Hi, I'm lyhua, a third-year student and the guy that built this site. I built this to simplify student life by offering an easy way to manage finances. Juggling studies and expenses inspired me to create a tool that's straightforward that fits the unique needs of students like me.</p>
                        <p> This site is my solution to the challenges of budgeting, planning for the future, and making financial management easy for students.</p>
                    </div>
                    <div className='flex items-center gap-2 flex-col sm:flex-row text-lg'>
                        <p>I'd love to hear your thoughts! Let's </p>
                        <Link href={"/contact"} className='underline text-green-500'>Get in touch</Link>
                    </div>
                </div>
            </section>
            <section className="hidden  w-1/2 lg:flex justify-start items-center">
                <Image
                    src={"/images/coding.png"}
                    width={10000}
                    height={1000}
                    alt="image"
                    className="w-[600px]"
                />
            </section>


        </main >
    )
}

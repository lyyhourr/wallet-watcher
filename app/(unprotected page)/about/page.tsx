import { fontHero, inter } from '@/fonts/Fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AboutPage() {
    return (
        <main className='lg:pt-8 flex lg:h-screen flex-col lg:flex-row p-2'>
            <section className=' w-full flex lg:p-5 p-2'>
                <div className="flex flex-col gap-3 sm:gap-5 lg:gap-7 md:gap-10 xl:gap-16 py-5 sm:text-lg ">
                    <h1 className={`${fontHero.className} text-7xl  sm:text-9xl`}>About Me</h1>
                    <h2 className={`${fontHero.className} text-3xl sm:text-5xl`}>Bringing Simplicity to Student Finances</h2>
                    <div className={`${inter.className} flex flex-col gap-3 md:w-[90%] xl:w-[70%]  `}>
                        <p>Hi, Im lyhua, a third-year student and the guy that built this site. I built this to simplify student life by offering an easy way to manage finances. Juggling studies and expenses inspired me to create a tool thats straightforward that fits the unique needs of students like me.</p>
                        <p> This site is my solution to the challenges of budgeting, planning for the future, and making financial management easy for students.</p>
                    </div>
                    <div className='flex items-center gap-2 flex-col sm:flex-row text-lg'>
                        <p>Id love to hear your thoughts! Lets </p>
                        <Link href={"/contact"} className='underline text-green-500'>Get in touch</Link>
                    </div>
                </div>
            </section>
            <section className=" w-full lg:w-1/2 flex justify-start items-start md:justify-center ">
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

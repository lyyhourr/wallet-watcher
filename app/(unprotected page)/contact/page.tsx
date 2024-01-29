import { fontHero, inter } from '@/fonts/Fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Contact() {
    return (
        <main className='lg:pt-8 flex lg:h-screen flex-col lg:flex-row '>

            <section className=' w-full flex p-5 items-'>
                <div className="flex flex-col gap-5 lg:gap-7 md:gap-10 xl:gap-9 py-5 text-lg">
                    <h1 className={`${fontHero.className} text-5xl sm:text-7xl`}>Lets connect</h1>
                    <h2 className={`${fontHero.className} text-3xl sm:text-5xl`}>We are Here to Assist You</h2>
                    <h2 className={`${inter.className}  `}>Whether you have questions, feedback, or simply want to reach out, we are ready to connect. Explore the various ways you can get in touch with us below. Feel free to adjust the wording based on your brand voice and the specific services or products your company offers.  </h2>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-1 gap-5'>
                        <div className='flex items-center'>
                            <h2 className={`${inter.className} w-[100px] `}> Email:</h2>
                            <h2 className={`${inter.className} text-lg`}>  mamlyhua@gmail.com</h2>
                        </div>
                        <div className='flex items-center'>
                            <h2 className={`${inter.className} w-[100px] `}> Phone:</h2>
                            <h2 className={`${inter.className} text-lg`}> 017 558 580</h2>
                        </div>
                        <div className='flex items-center'>
                            <h2 className={`${inter.className} w-[100px] `}> Telegram:</h2>
                            <Link href={"https://t.me/lyhuamam"} className={`${inter.className} text-lg underline`}> https://t.me/lyhuamam</Link>
                        </div>
                        <div className='flex items-center'>
                            <h2 className={`${inter.className} w-[100px] `}> Facebook:</h2>
                            <Link href={"https://www.facebook.com/profile.php?id=100077547875626"} className={`${inter.className} text-lg underline`}> lyyhourr</Link>
                        </div>
                        <div className='flex items-center'>
                            <h2 className={`${inter.className} w-[100px] `}> Instagram:</h2>
                            <Link href={"https://www.instagram.com/lyhourrr_m/?next=%2F"} className={`${inter.className} text-lg underline`}> lyyhour_m</Link>
                        </div>
                    </div>

                </div>
            </section>
            <section className="w-full  lg:w-4/5 flex justify-center items-center lg:items-start">
                <Image
                    src={"/images/chatbot.png"}
                    width={10000}
                    height={1000}
                    alt="image"
                    className="w-[600px] "
                />
            </section>

        </main >
    )
}

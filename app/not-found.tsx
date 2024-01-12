import CenterScreen from '@/components/styles/CenterScreen'
import { fontHero } from '@/fonts/Fonts'
import Link from 'next/link'
import React from 'react'

export default function NotFoundPage() {
    return (
        <CenterScreen>
            <div className=' text-center grid gap-5'>
                <p className={`${fontHero.className} text-7xl md:text-9xl`}>Page Not Found</p>
                <Link href={"/"} className='px-10 py-5 text-lg bg-black rounded-md text-white transition-all hover:bg-slate-800'>Back Home Page</Link>
            </div>
        </CenterScreen>
    )
}

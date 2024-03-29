import CenterScreen from '@/components/styles/CenterScreen'
import { fontHero } from '@/fonts/Fonts'
import Link from 'next/link'
import React from 'react'

export default function NotFoundPage() {
    return (
        <CenterScreen>
            <div className=' text-center flex flex-col gap-10'>
                <p className={`${fontHero.className} text-secondary-color  text-7xl md:text-9xl`}>Page Not Found</p>
                <Link href={"/"} className='px-10 py-5 text-lg bg-primary-color rounded-md text-white transition-all hover:bg-slate-800'>Back Home Page</Link>
            </div>
        </CenterScreen>
    )
}

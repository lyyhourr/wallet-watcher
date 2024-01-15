import Link from 'next/link'
import React from 'react'

export default function UserAccount() {
    return (
        // <Link href={"/user"} className='mt-auto pb-10 hidden lg:flex justify-center w-full items-center gap-2'>
        <Link href={"/user"} className='flex justify-center w-full items-center gap-2'>
            <p>img</p>
            <p>username</p>
        </Link>
    )
}

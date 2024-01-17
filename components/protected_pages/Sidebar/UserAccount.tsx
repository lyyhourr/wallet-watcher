import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

export default async function UserAccount() {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()

    return (
        // <Link href={"/user"} className='mt-auto pb-10 hidden lg:flex justify-center w-full items-center gap-2'>
        <Link href={"/user"} className='flex justify-center w-full items-center gap-2'>
            <User />
            <p>{user?.email}</p>
        </Link>
    )
}

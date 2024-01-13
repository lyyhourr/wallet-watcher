import React from 'react'
import AuthLayout from './AuthLayout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Login() {
    return <AuthLayout
        title='Sign In'
        subTitle='Get Started by Logging In'
        image='/images/auth/sign-in.png'
        route={{ href: "/", title: "Home" }}
        footerTitle='Signing in'
    >
        <form action="" className='flex flex-col gap-7'>
            <Input placeholder='Email..' className='p-7 text-lg' />
            <Input placeholder='Password...' type='password' className='p-7 text-lg' />
            <Button className='bg-primary-color text-lg'>Login</Button>
        </form>
        <div className='flex gap-2 justify-center items-center'>
            <p>New Here?</p>
            <Link href={"/register"} className='text-primary-color underline'> Register for Free! </Link>
        </div>
    </AuthLayout>
}

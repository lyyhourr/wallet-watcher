import React from 'react'
import AuthLayout from './AuthLayout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Register() {
    return <AuthLayout
        title='Register'
        subTitle='Be Part of Something Special – Register Now'
        image='/images/auth/register.png'
        route={{ href: "/login", title: "login" }}
        footerTitle='Registering'
    >
        <form action="" className='flex flex-col gap-7'>
            <Input placeholder='Email..' className='p-7 text-lg' />
            <Input placeholder='Password...' type='password' className='p-7 text-lg' />
            <Button className='bg-primary-color text-lg'>Register</Button>
        </form>
        <div className='flex gap-2 justify-center items-center'>
            <p>Already Have an account?</p>
            <Link href={"/login"} className='text-primary-color underline'> Login Now </Link>
        </div>
    </AuthLayout>
}

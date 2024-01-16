"use client"
import React, { useState } from 'react'
import AuthLayout from './AuthLayout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function Login() {
    const initialData = {
        email: "",
        password: ""
    }
    const supbase = createClientComponentClient()
    const [formData, setFormData] = useState(initialData)
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: [e.target.value] })
    }


    const handleLogin = async (e: any) => {
        e.preventDefault();
        const router = useRouter()
        // const res = await supbase.auth.signInWithPassword({
        //     email: formData.email,
        //     password: formData.password
        // })
        // if (res.error) {
        //     toast.error(res.error.message)
        // }
        // else {
        //     toast.success("You're Logged In");
        //     router.refresh()
        // }
        // console.log(res)
    }

    // const handleLogin = (e: any) => {
    //     e.preventDefault();
    //     const router = useRouter()


    //     // const res = await supbase.auth.signInWithPassword(
    //     //     {
    //     //         email: formData.email,
    //     //         password: formData.password
    //     //     }
    //     // )
    //     // if (res.error) {
    //     //     toast.error(`${res.error.message}`)
    //     // } else {
    //     //     toast.success(`You're Logged In`)
    //     //     router.refresh()
    //     // }
    //     // console.log(res)

    // }

    return <AuthLayout
        title='Sign In'
        subTitle='Get Started by Logging In'
        image='/images/auth/sign-in.png'
        route={{ href: "/", title: "Home" }}
        footerTitle='Signing in'
    >
        <form action="" className='flex flex-col gap-7' onSubmit={handleLogin}>
            <Input placeholder='Email..' className='p-7 text-lg' name='email' onChange={handleChange} />
            <Input placeholder='Password...' type='password' className='p-7 text-lg' name='password' onChange={handleChange} />
            <Button className='bg-primary-color text-lg'>Login</Button>
        </form>
        <div className='flex gap-2 justify-center items-center'>
            <p>New Here?</p>
            <Link href={"/register"} className='text-primary-color underline'> Register for Free! </Link>
        </div>
    </AuthLayout>
}

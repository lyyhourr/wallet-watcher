"use client"
import React, { useState } from 'react'
import AuthLayout from './AuthLayout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
export default function Register() {
    const initialData = {
        username: "",
        email: "",
        password: "",
        cfpassword: ""
    }
    const [formData, setFormData] = useState(initialData)
    const supabase = createClientComponentClient();
    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: any) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const validation = () => {
        if (!formData.username.length || !formData.email.length || !formData.password.length || !formData.cfpassword.length) {
            toast.error("Complete all the fields")
            return false
        }
        else if (formData.username.length < 3) {
            toast.error("username must be more than 3 characters");
            return false
        }
        else if (formData.password.length < 5) {
            toast.error("Password must be more than 5 characters ")
            return false

        }
        else if (formData.password !== formData.cfpassword) {
            toast.error("Passwords Doesn't matched", { duration: 3000 })
            return false
        }
        else {
            return true
        }

    }

    const handleRegister = async (e: any) => {
        e.preventDefault()
        const check = validation()
        if (!check) {
            setMessage(null)
            return false
        }
        setIsLoading(true)
        toast.loading("Registering! Please Wait", { duration: 1500 })
        const res = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`
            }
        })
        if (!res.error) {
            setFormData(initialData)
            toast.success("Registered successfully")
            setMessage("Please Check Your Email !")
        }
        else {
            toast.error(`${res.error.message}`)
        }
        setIsLoading(false)
        console.log(res)
    }


    return <AuthLayout
        title='Register'
        subTitle='Be Part of Something Special – Register Now'
        image='/images/auth/register.png'
        route={{ href: "/login", title: "login" }}
        footerTitle='Registering'
    >
        <form action="" className='flex flex-col gap-7' onSubmit={handleRegister} method='post'>
            <Input placeholder='Username' className='p-7 text-lg' name='username' onChange={handleChange} value={formData.username} />
            <Input placeholder='Email..' className='p-7 text-lg' name='email' onChange={handleChange} value={formData.email} />
            <Input placeholder='Password...' type='password' className='p-7 text-lg' name='password' onChange={handleChange} value={formData.password} />
            <Input placeholder='Comfirm Password...' type='password' className='p-7 text-lg' name='cfpassword' onChange={handleChange} value={formData.cfpassword} />
            <Button disabled={isLoading} className={cn(`bg-primary-color text-lg`, isLoading && "animate-pulse")}>{isLoading ? "Registering" : "Register"}</Button>
        </form>
        <div className='flex gap-2 justify-center items-center'>
            <p>Already Have an account?</p>
            <Link href={"/login"} className='text-primary-color underline'> Login Now </Link>
        </div>
        {
            message?.length && <p className='px-3 py-5 w-full text-center bg-green-100 underline text-green-600' >{message}</p>
        }
    </AuthLayout>
}

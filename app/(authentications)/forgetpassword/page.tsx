"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthLayout from "@/components/auth/AuthLayout";
import { cn } from "@/lib/utils";
import { IMessage } from "../register/page";
import { inter } from "@/fonts/Fonts";
export default function Register() {
    const initialData = {
        email: "",

    };



    const [formData, setFormData] = useState(initialData);
    const [message, setMessage] = useState<IMessage>({
        msg: "",
        color: "",
    });
    const supabase = createClientComponentClient();
    const [isLoading, setIsLoading] = useState(false);




    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleForgetPassword = async (e: any) => {
        e.preventDefault();

        setIsLoading(true);
        const res = await supabase.auth.resetPasswordForEmail(formData.email, { redirectTo: `${location.origin}/forgetpassword/resetpassword` })

        if (!res.error) {
            setFormData(initialData);
            setMessage({ color: "green", msg: `check your email` });

        } else {
            setMessage({ color: "red", msg: `${res.error.message}` });
        }
        setIsLoading(false);
    };

    return (
        <AuthLayout
            title=""
            subTitle=""
            image="/images/forgetpassword.png"
            route={{ href: "/dashboard", title: "login" }}
            footerTitle="Signing in"
        >

            <form
                action=""
                className="flex flex-col gap-3 md:gap-7"
                onSubmit={handleForgetPassword}
            >
                <p className={`${inter.className} text-ceneter text-lg`}>Enter your email to reset your password</p>
                <Input
                    placeholder="Email.."
                    className="p-7 text-lg"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Button
                    disabled={isLoading}
                    className={cn(
                        "bg-primary-color text-lg",
                        isLoading && "animate-pulse"
                    )}
                >
                    {isLoading ? "Sending" : "Send"}
                </Button>
                <div className="flex justify-center ">
                    <Link href={"/register"} className="text-primary-color underline">
                        Register now!
                    </Link>
                </div>
            </form>
            <p
                className={cn(
                    "px-3 py-5 w-full text-center  underline",
                    message.color === "green" && "text-green-600 bg-green-100",
                    message.color === "red" && "text-red-600 bg-red-100",
                    message.msg?.length ? `block` : "hidden"
                )}
            >
                {message.msg}
            </p>
        </AuthLayout>
    );
}

"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthLayout from "@/components/auth/AuthLayout";
import { cn } from "@/lib/utils";
import { inter } from "@/fonts/Fonts";
import { IMessage } from "../../register/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Register() {
    const initialData = {
        password: "",
        cfpassword: "",

    };
    const [formData, setFormData] = useState(initialData);
    const [message, setMessage] = useState<IMessage>({
        msg: "",
        color: "",
    });
    const supabase = createClientComponentClient();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("")
    const router = useRouter()

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        const getMail = async () => {
            const { data: { user }, error } = await supabase.auth.getUser()
            if (error) {
                router.push("/")
                setMessage({ color: "red", msg: error.message })
            }
            if (user) {
                setEmail(user?.email ? user.email : "")
            }
        }
        getMail()

    }, [])
    const validation = () => {
        const { password, cfpassword } = formData
        if (password.length < 5 || cfpassword.length < 5) {
            toast.error("password must be more than 5 characters")
            return false
        }
        else if (password !== cfpassword) {
            toast.error("passwords dont match!!")
            return false
        }
        else {
            return true
        }
    }
    const handleForgetPassword = async (e: any) => {
        e.preventDefault();
        const check = validation()
        if (check) {
            setIsLoading(true);
            const res = await supabase.auth.updateUser({ password: formData.password })

            if (!res.error) {
                setFormData(initialData);
                setMessage({ color: "green", msg: `password reseted! go back home page` });

            } else {
                setMessage({ color: "red", msg: `${res.error.message}` });
            }
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title=""
            subTitle=""
            image="/images/forgetpassword.png"
            route={{ href: "/", title: "Home" }}
            footerTitle="Signing in"
        >

            <form
                action=""
                className="flex flex-col gap-3 md:gap-7"
                onSubmit={handleForgetPassword}
            >

                <p className={`${inter.className} text-ceneter text-xl  text-center`}>Enter your new password</p>

                <div className="flex flex-col gap-1">
                    <p className={`${inter.className} text-ceneter `}>Email: {email}</p>
                    <Input
                        placeholder="new password.."
                        className="p-7 text-lg"
                        name="password"
                        type="password"
                        onChange={handleChange}
                    />
                </div>
                <Input
                    placeholder="comfirm password.."
                    className="p-7 text-lg"
                    name="cfpassword"
                    type="password"
                    onChange={handleChange}
                />
                <Button
                    disabled={isLoading}
                    className={cn(
                        "bg-primary-color text-lg",
                        isLoading && "animate-pulse"
                    )}
                >
                    {isLoading ? "Submitting" : "Submit"}
                </Button>

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

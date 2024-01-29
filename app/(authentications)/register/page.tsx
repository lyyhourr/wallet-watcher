"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import AuthLayout from "@/components/auth/AuthLayout";
export interface IMessage {
  msg: string | null;
  color: "red" | "green" | string | null;
}
const initialData = {
  email: "",
  password: "",
  cfpassword: "",
};
export default function Register() {
  const [formData, setFormData] = useState(initialData);
  const supabase = createClientComponentClient();
  const [message, setMessage] = useState<IMessage>({
    msg: "",
    color: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validation = () => {
    if (
      !formData.email.length ||
      !formData.password.length ||
      !formData.cfpassword.length
    ) {
      setMessage({ color: "red", msg: "All fields must be completed!" });
      return false;
    } else if (formData.password.length < 5) {
      setMessage({
        color: "red",
        msg: "Password must be more than 5 characters",
      });
      return false;
    } else if (formData.password !== formData.cfpassword) {
      setMessage({ color: "red", msg: "Passwords Doesn't matched" });
      return false;
    } else {
      return true;
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const check = validation();
    if (!check) {
      return false;
    }
    setIsLoading(true);
    toast.loading("Registering! Please Wait", { duration: 1500 });
    const res = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `https://walletwatcher-alpha.vercel.app/auth/callback`,
        // emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    const {
      data: {
        user: { identities },
      },
    }: any = res;

    if (!res.error) {
      if (identities.length) {
        setFormData(initialData);
        toast.success("Registered successfully");
        setMessage({ color: "green", msg: "Please Check Your Email !" });
      } else {
        setMessage({ color: "red", msg: "Email already in used!" });
      }
    } else {
      setMessage({ color: "red", msg: `${res.error.message}` });
    }
    setIsLoading(false);
  };

  return (
    <AuthLayout
      title="Register"
      subTitle="Be Part of Something Special – Register Now"
      image="/images/auth/register.png"
      route={{ href: "/dashboard", title: "login" }}
      footerTitle="Registering"
    >
      <form
        action=""
        className="flex flex-col gap-1 md:gap-3 lg:gap-4"
        onSubmit={handleRegister}
        method="post"
      >
        <Input
          placeholder="Email.."
          className="p-7 text-lg"
          name="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          placeholder="Password..."
          type="password"
          className="p-7 text-lg"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <Input
          placeholder="Comfirm Password..."
          type="password"
          className="p-7 text-lg"
          name="cfpassword"
          onChange={handleChange}
          value={formData.cfpassword}
        />
        <Button
          disabled={isLoading}
          className={cn(
            `bg-primary-color text-lg mt-2 sm:mt-0`,
            isLoading && "animate-pulse"
          )}
        >
          {isLoading ? "Registering" : "Register"}
        </Button>
      </form>
      <div className="flex gap-2 justify-center items-center">
        <p>Already Have an account?</p>
        <Link href={"/dashboard"} className="text-primary-color underline">
          {" "}
          Login Now{" "}
        </Link>
      </div>
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

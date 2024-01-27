"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { cn } from "@/lib/utils";
export default function Register() {
  const initialData = {
    username: "",
    email: "",
    password: "",
    cfpassword: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [message, setMessage] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogIn = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    toast.loading("Logging In! Please Wait", { duration: 1000 });
    const res = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (!res.error) {
      setFormData(initialData);
      toast.success("Login successfully");
      console.log("logged");
      router.refresh();
    } else {
      setMessage(res.error.message);
    }
    setIsLoading(false);
  };

  return (
    <AuthLayout
      title="Sign In"
      subTitle="Get Started by Logging In"
      image="/images/auth/sign-in.png"
      route={{ href: "/", title: "Home" }}
      footerTitle="Signing in"
    >
      <form
        action=""
        className="flex flex-col gap-3 md:gap-7"
        onSubmit={handleLogIn}
      >
        <Input
          placeholder="Email.."
          className="p-7 text-lg"
          name="email"
          onChange={handleChange}
        />
        <Input
          placeholder="Password..."
          type="password"
          className="p-7 text-lg"
          name="password"
          onChange={handleChange}
        />
        <Button
          disabled={isLoading}
          className={cn(
            "bg-primary-color text-lg",
            isLoading && "animate-pulse"
          )}
        >
          {isLoading ? "Logging In" : "Log in"}
        </Button>
        <div className="flex justify-between w-full">

          <Link href={"/forgetpassword"} className="text-primary-color underline">
            Forget Password
          </Link>
          <Link href={"/register"} className="text-primary-color underline">
            Register now!
          </Link>
        </div>
      </form>
      {message?.length && (
        <p className="px-3 py-5 w-full text-center bg-red-100 underline text-red-600">
          {message}
        </p>
      )}
    </AuthLayout>
  );
}

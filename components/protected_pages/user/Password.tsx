"use client";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fontHeader, inter } from "@/fonts/Fonts";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Password() {
  const initialData = {
    password: "",
    cfpassword: "",
  }
  const [formData, setFormData] = useState(initialData)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const validate = validation()
    if (validate) {
      setIsLoading(true)
      const supabase = createClientComponentClient()
      const { data, error } = await supabase.auth.updateUser({ password: formData.password })
      setIsLoading(false)
      if (error) {
        toast.error(error.message)
      }
      if (data) {
        toast.success("password changed")
        setOpen(false)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Reset Password</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-3 lg:gap-10">
        <DialogHeader className={`${inter.className} text-2xl `}>
          Change Password
        </DialogHeader>
        <form action="" className="flex flex-col gap-3" method="post" onSubmit={handleSubmit}>
          {/* <Input placeholder="old password..." /> */}
          <Input placeholder="new password..." name="password" onChange={handleChange} type="password" />
          <Input placeholder="comfirm password..." name="cfpassword" onChange={handleChange} type="password" />
          <div className="flex gap-2 items-center ">
            <Button variant={"destructive"} className={cn("w-full", isLoading && "animate-pulse")} disabled={isLoading}>
              {isLoading ? "Updating" : "Update Password"}
            </Button>
            <DialogClose asChild>
              <Button variant={"secondary"} className="w-full" type="button">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

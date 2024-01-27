"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { inter } from "@/fonts/Fonts";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cn } from "@/lib/utils";

export default function ChangeGmail() {
  const [gmail, setGmail] = useState("")
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: any) => {
    const supabaseAdmin = createClientComponentClient()

    e.preventDefault();
    setIsLoading(true)
    const { data, error } = await supabaseAdmin.auth.updateUser({ email: gmail })

    setIsLoading(false)
    if (error) {
      toast.error(error.message)
      return;
    }
    if (data) {
      toast.success("check your both gmails")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Change Gmail</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-3 lg:gap-10">
        <DialogHeader className={`${inter.className} text-2xl `}>
          Change Email
        </DialogHeader>
        <form action="" className="flex flex-col gap-3" method="post" onSubmit={handleSubmit}>
          <Input placeholder="new gmail..." type="email" onChange={(e) => setGmail(e.target.value)} />
          <div className="flex gap-2 items-center ">
            <Button variant={"destructive"} className={cn("w-full", isLoading && "animate-pulse")} disabled={isLoading}>
              {isLoading ? "Updating.." : "Update Gmail"}
            </Button>
            <DialogClose asChild>
              <Button variant={"secondary"} type="button" className="w-full">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

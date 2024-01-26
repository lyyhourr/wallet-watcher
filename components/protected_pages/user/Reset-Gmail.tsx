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

export default function ChangeGmail() {
  const handleChange = () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Change Gmail</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-3 lg:gap-10">
        <DialogHeader className={`${inter.className} text-2xl `}>
          Change Email
        </DialogHeader>
        <form action="" className="flex flex-col gap-3" method="post">
          {/* <Input placeholder="old password..." /> */}
          <Input placeholder="new gmail..." />
          <div className="flex gap-2 items-center ">
            <Button variant={"destructive"} className="w-full">
              Update Email
            </Button>
            <DialogClose asChild>
              <Button variant={"secondary"} className="w-full">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

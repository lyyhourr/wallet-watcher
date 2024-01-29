"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fontHeader, inter } from "@/fonts/Fonts";
import { cn, supabaseAdmin } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteAccount({ userId }: { userId: string }) {
  const [confirmInput, setConfimInput] = useState("");
  const confirmString = "delete-my-account";
  const isConfirmed = confirmInput === confirmString;
  const router = useRouter();
  const [loading, isLoading] = useState(false);

  const handleDeleleAccount = async () => {
    isLoading(true);
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    isLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("account deleted");
    const supaBase = createClientComponentClient();
    const signout = await supaBase.auth.signOut();
    if (signout.error) {
      toast.error(signout.error.message);
    }
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete Account</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-3 lg:gap-6">
        <DialogHeader className={`${inter.className} text-2xl text-red-500`}>
          Delete Account
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <p>Tell Us What Happened</p>
          <Textarea placeholder="tell us your reason :(" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-400 text-sm">
            type {confirmString} to comfirm
          </p>
          <Input
            placeholder={confirmString}
            onChange={(e) => setConfimInput(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center ">
          <Button
            variant={"destructive"}
            disabled={!isConfirmed || loading}
            className={cn("w-full", loading && "animate-pulse")}
            onClick={handleDeleleAccount}
          >
            {loading ? "Deleting" : "Delete Account"}
          </Button>
          <DialogClose asChild>
            <Button className="w-full" variant={"secondary"}>
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

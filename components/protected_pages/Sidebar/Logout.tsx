"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { inter } from "@/fonts/Fonts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function Logout() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleLogOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <Dialog>
      <DialogTrigger className="px-3  py-1 bg-red-600 rounded-md text-white">
        Log out
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={`${inter.className} text-xl`}>
            Log out
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-2">
          <Button variant={"destructive"} onClick={handleLogOut}>
            Log out
          </Button>
          <DialogClose>
            <Button className="bg-gray-400 ">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

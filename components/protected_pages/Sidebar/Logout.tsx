import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { inter } from "@/fonts/Fonts"
import Link from "next/link"

export function Logout() {
    return (
        <Dialog>
            <DialogTrigger className="px-3  py-1 bg-red-600 rounded-md text-white">
                Log out
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className={`${inter.className} text-xl`}>Log out</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to log out?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center gap-2">
                    <Button asChild variant={"destructive"}>
                        <Link href={"/"}>Log out</Link>
                    </Button>
                    <DialogClose asChild>
                        <Button className="bg-gray-600" >Cancel</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

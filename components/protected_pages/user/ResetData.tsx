"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { inter } from '@/fonts/Fonts';


export default function ResetData() {
    const [open, setOpen] = useState(false)
    const handleDelete = () => { }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>Reset Data</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <p className={`${inter.className} text-lg`}>Are you sure you want to reset all the data on your account?</p>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all the data on your
                        account and remove all your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <Button className="bg-card-red" onClick={handleDelete}>
                        Reset
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

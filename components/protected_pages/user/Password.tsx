"use client"
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { fontHeader, inter } from '@/fonts/Fonts'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

export default function Password() {
    const handleChange = () => { }
    return (


        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"destructive"}>Change Password</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-3 lg:gap-10">
                <DialogHeader className={`${inter.className} text-2xl `}>
                    Change Password
                </DialogHeader>
                <form
                    action=""
                    className="flex flex-col gap-3"
                    method="post"
                >
                    <Input placeholder='old password...' />
                    <Input placeholder='new password...' />
                    <Input placeholder='comfirm password...' />
                    <div className="flex gap-2 items-center ">
                        <Button variant={"destructive"} className='w-full'>Update Password</Button>
                        <DialogClose asChild>
                            <Button variant={"secondary"} className='w-full'>Cancel</Button>
                        </DialogClose>
                    </div>
                </form>
            </DialogContent>
        </Dialog>

    )
}

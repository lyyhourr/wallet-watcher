"use client"
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { fontHeader } from '@/fonts/Fonts'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

export default function Password() {
    const [showPassword, setShowPassword] = useState(false)
    const handleChange = () => { }
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-start  items-start  flex-col gap-2 sm:flex-row sm:justify-between'>
                <div className='flex gap-2 items-center'>
                    <Input type={showPassword ? "text" : "password"} value={"asdfasdf"} />
                    <button onClick={() => setShowPassword(p => !p)}>
                        {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"destructive"}>Change Password</Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col gap-3 lg:gap-10">
                        <DialogHeader className={`${fontHeader.className} text-2xl `}>
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
            </div>

        </div >
    )
}

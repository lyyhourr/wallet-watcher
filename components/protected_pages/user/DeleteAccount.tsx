"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { fontHeader, inter } from '@/fonts/Fonts'
import React, { useState } from 'react'

export default function DeleteAccount() {
    const [confirmInput, setConfimInput] = useState("")
    const confirmString = "abc"
    const isConfirmed = confirmInput === confirmString
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"destructive"}>Delete Account</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-3 lg:gap-6">
                <DialogHeader className={`${inter.className} text-2xl text-red-500`}>
                    Delete Account
                </DialogHeader>
                <div className='flex flex-col gap-2'>
                    <p>Tell Us What Happened</p>
                    <Textarea placeholder='tell us your reason :(' />
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='text-gray-400 text-sm'>type {confirmString} to comfirm</p>
                    <Input placeholder={confirmString} onChange={(e) => setConfimInput(e.target.value)} />
                </div>
                <div className="flex gap-2 items-center ">
                    <Button variant={"destructive"} disabled={!isConfirmed} className='w-full'>Delete Account</Button>
                    <DialogClose asChild>
                        <Button className='w-full' variant={"secondary"} >Cancel</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { fontHeader } from '@/fonts/Fonts'
import React from 'react'

export default function AddIncome() {
    return (
        <Dialog>
            <DialogTrigger className="bg-green-500 px-2 py-1 sm:px-4 text-lg sm:py-2 text-white rounded-md">Add Income</DialogTrigger>
            <DialogContent className="flex flex-col gap-3">
                <DialogHeader className={`${fontHeader.className} text-2xl `}>Add Income</DialogHeader>
                <form action="" className="flex flex-col gap-3">
                    <Input placeholder="Title" />
                    <Input placeholder="Amount" />
                    <Input placeholder="date" type='date' />
                    <div className="flex gap-2 items-center ">
                        <Button className="bg-green-500 text-lg w-full">Add Income</Button>
                        <Button className="bg-gray-500 text-lg w-full">Cancel</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

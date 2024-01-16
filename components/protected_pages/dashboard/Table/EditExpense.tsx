import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { fontHeader } from '@/fonts/Fonts'
import { TDataTest } from '@/types/types'
import React from 'react'

export default function Edit(props: TDataTest) {
    return (
        <Dialog>
            <DialogTrigger className="py-1 w-[70px]  bg-card-blue rounded-md text-white">
                Edit
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className={`${fontHeader.className} text-3xl`}>Edit Expense</DialogHeader>
                <form action="" className='flex flex-col gap-4'>
                    <Input placeholder='title' defaultValue={props.title} />
                    <Input placeholder='expense' defaultValue={props.amount} />
                    <div className="flex justify-center gap-5 w-full">
                        <Button className='bg-card-green w-full text-lg'>Update</Button>
                        <DialogClose asChild>
                            <Button type='button' className='w-full text-lg bg-gray-400'>Cancel</Button>
                        </DialogClose>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

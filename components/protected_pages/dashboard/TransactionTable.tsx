"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { fontHeader, inter } from '@/fonts/Fonts'
import { cn } from '@/lib/utils';
import { ShoppingBagIcon } from 'lucide-react';
import React, { useState } from 'react'

const tabs = ["today", "week", "month", "year"]
const numberArray: any[] = [];
for (let i = 1; i <= 30; i++) {
    numberArray.push(i);
}

export default function TransactionTable() {
    const [tab, setTab] = useState("today");
    return (
        <main className='flex flex-col gap-5 w-full py-2'>
            <section className='flex gap-2 px-2 items-center  w-full '>
                {
                    tabs.map((item: string, i: number) => (
                        <button key={i} className={cn(`${fontHeader.className} opacity-55 transition-all w-full text-3xl text-center uppercase py-2 rounded-full text-gray-500`,
                            tab === item && "bg-green-100 text-[#11CD6F] opacity-100"
                        )}
                            onClick={() => setTab(item)}>
                            {item}
                        </button>
                    ))
                }
            </section>
            <section className='flex flex-col gap-2 py-2 px-6 bg-slate-100 rounded-lg'>
                <header className='flex text-lg justify-between items-center'>
                    <p>Recent Transactions:</p>
                    <button>See All</button>
                </header>
                <div className='p-3 h-[300px] overflow-auto bg-slate-50'>
                    {
                        numberArray.map((item: any, i: number) => (
                            <div key={i} className='flex py-2 items-center  gap-2 border-b border-gray-500'>
                                <div className='flex gap-2 sm:text-lg md:text-xl'>
                                    <ShoppingBagIcon className='text-yellow-500' />
                                    <p>Shopping</p>
                                </div>
                                <div className='flex w-full items-center justify-end gap-2'>
                                    <Dialog>
                                        <DialogTrigger className="py-1 px-2 lg:px-5 lg:py-2 lg:text-lg bg-card-blue rounded-md text-white">
                                            Edit
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader className={`${fontHeader.className} text-3xl`}>Edit Expense</DialogHeader>
                                            <form action="" className='flex flex-col gap-4'>
                                                <Input placeholder='expense' />
                                                <Input placeholder='expense' />
                                                <div className="flex justify-center gap-5 w-full">
                                                    <Button className='bg-card-green w-full text-lg'>Update</Button>
                                                    <DialogClose asChild>
                                                        <Button type='button' className='w-full text-lg bg-gray-400'>Cancel</Button>
                                                    </DialogClose>
                                                </div>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger className="p-1 bg-card-red lg:px-5 lg:py-2 lg:text-lg rounded-md text-white">
                                            Delete
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] ">
                                            <DialogHeader >
                                                <DialogHeader className={`${fontHeader.className} text-3xl`}>Delete Expense</DialogHeader>
                                                <DialogDescription>
                                                    Are you sure you want to Delete?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex justify-center gap-2">
                                                <Button variant={"destructive"}>
                                                    Delete
                                                </Button>
                                                <DialogClose asChild>
                                                    <Button className="bg-gray-600" >Cancel</Button>
                                                </DialogClose>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ))
                    }

                </div>

            </section>

        </main>
    )
}

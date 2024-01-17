"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fontHeader } from '@/fonts/Fonts'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { CreateIncome } from "@/components/actions/actions"
const initialData = {
    type: "",
    amount: "",
    date: "",
    category: "",
}

export default function AddIncome({ userId }: { userId: any }) {
    const [formData, setFormData] = useState(initialData)
    const [tabs, setTabs] = useState("other")
    const supabase = createClientComponentClient();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        CreateIncome()

    }
    const handleChange = (e: any) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value, type: tabs
        })
    }
    return (
        <Dialog>
            <DialogTrigger className="bg-green-500 px-2 py-1 sm:px-4 text-lg sm:py-2 text-white rounded-md">Add Income</DialogTrigger>
            <DialogContent className="flex flex-col gap-3 lg:gap-10">
                <DialogHeader className={`${fontHeader.className} text-2xl `}>Add Income</DialogHeader>
                <Tabs>
                    <TabsList className='w-full'>
                        <TabsTrigger value='other' className='w-full' onClick={() => setTabs("other")}>Other Income</TabsTrigger>
                        <TabsTrigger value='salary' className='w-full' onClick={() => setTabs("salary")}>Salary Income</TabsTrigger>
                    </TabsList>
                    <TabsContent value='other'>
                        <form action="" className="flex flex-col gap-3" method='post' onSubmit={handleSubmit}>
                            <div className='grid grid-cols-4 items-center'>
                                <label htmlFor="" className='text-sm md:text-base'>Amount</label>
                                <Input placeholder="Amount" className='col-span-3' name='amount' onChange={handleChange} />
                            </div>
                            <div className='grid grid-cols-4 items-center'>
                                <label htmlFor="" className='text-xs sm:text-sm md:text-base '>Recived Date</label>
                                <Input placeholder="date" type='date' className='col-span-3' name='date' onChange={handleChange} />
                            </div>
                            <Category setFormData={setFormData} formData={formData} />
                            <div className="flex gap-2 items-center ">
                                <Button className="bg-green-500 text-lg w-full">Add Income</Button>
                                <Button className="bg-gray-500 text-lg w-full">Cancel</Button>
                            </div>
                        </form>
                    </TabsContent>
                    <TabsContent value='salary'>
                        <form action="" className="flex flex-col gap-3" method='post' onSubmit={handleSubmit}>
                            <div className='grid grid-cols-4 items-center'>
                                <label htmlFor="" className='text-sm md:text-base'>Salary</label>
                                <Input placeholder="Amount" className='col-span-3' name='amount' onChange={handleChange} />
                            </div>
                            <div className='grid grid-cols-4 items-center'>
                                <label htmlFor="" className='text-xs sm:text-sm md:text-base '>Recived Date</label>
                                <Input placeholder="date" type='date' className='col-span-3' name='date' onChange={handleChange} />
                            </div>
                            <div className="flex gap-2 items-center ">
                                <Button className="bg-green-500 text-lg w-full">Add Income</Button>
                                <Button className="bg-gray-500 text-lg w-full">Cancel</Button>
                            </div>
                        </form>
                    </TabsContent>
                </Tabs>


            </DialogContent>
        </Dialog>
    )
}





export function Category({ setFormData, formData }: any) {
    const category = ["shopping", "foods", "clothes", "bills", "hospital", "other"]
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    useEffect(() => {
        setFormData({ ...formData, category: value })
    }, [value])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value ? value : "Select a Category"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {category.map((cate) => (
                            <CommandItem
                                key={cate}
                                value={cate}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === cate ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {cate}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

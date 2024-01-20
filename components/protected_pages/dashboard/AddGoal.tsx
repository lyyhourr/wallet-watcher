"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select'
import { fontHeader } from '@/fonts/Fonts'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function AddGoal({ id, goalAmount }: { id: string, goalAmount: number }) {
    const [amount, setAmount] = useState(`${goalAmount}`)

    const validation = () => {
        const amounts = Number(amount)
        if (!amount.length) {
            toast.error("amount can't be empty")
        }
        else if (isNaN(amounts)) {
            toast.error("amount must be number")
        }
        else if (amounts < 0) {
            toast.error("amount can't be a negative number")
        }
        else {
            return true
        }
    }

    const handleAddGoal = async (e: any) => {
        e.preventDefault();
        const validate = validation()

        if (validate) {
            const supabase = createClientComponentClient();
            const { error } = await supabase.from("goal").update([{ amount }])
            if (error) {
                toast.error(error.message)
            } else {
                toast.success("goal added")
            }
        }

    }


    return (
        <Dialog>
            <DialogTrigger className="bg-card-blue px-2 py-1  sm:px-4 text-lg sm:py-2 text-white rounded-md">Goal</DialogTrigger>
            <DialogContent className="flex flex-col gap-3">
                <DialogHeader className={`${fontHeader.className} text-2xl `}>Add Goal</DialogHeader>
                <DialogDescription>Add your saving goal</DialogDescription>
                <form action="" className="flex flex-col gap-3" onSubmit={handleAddGoal}>
                    <div className="grid grid-cols-4 items-center ">
                        <label htmlFor="" className="text-xs sm:text-sm md:text-base ">
                            amount
                        </label>
                        <Input placeholder='expense' name='amount' className='col-span-3' onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className="flex gap-2 items-center ">
                        <Button className="bg-card-blue text-lg w-full" type='submit'>Add Goal</Button>
                        <Button className="bg-gray-500 text-lg w-full" type='button'>Cancel</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

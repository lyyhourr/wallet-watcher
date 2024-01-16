import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select'
import { fontHeader } from '@/fonts/Fonts'
import React from 'react'

export default function AddGoal() {
    return (
        <Dialog>
            <DialogTrigger className="bg-card-blue px-2 py-1  sm:px-4 text-lg sm:py-2 text-white rounded-md">Goal</DialogTrigger>
            <DialogContent className="flex flex-col gap-3">
                <DialogHeader className={`${fontHeader.className} text-2xl `}>Add Goal</DialogHeader>
                <DialogDescription>Add your goal your this month or your total saving goal</DialogDescription>
                <Select>
                    <SelectTrigger>Select Goal</SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="this month">This month</SelectItem>
                            <SelectItem value="total saving">Total Saving</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <form action="" className="flex flex-col gap-3">
                    <Input placeholder="Amount..." />
                    <div className="flex gap-2 items-center ">
                        <Button className="bg-card-blue text-lg w-full">Add Goal</Button>
                        <Button className="bg-gray-500 text-lg w-full">Cancel</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

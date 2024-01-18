"use client"
import { ArrowDown, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import React, { Dispatch, SetStateAction, useState } from "react"
import { TMonths } from "@/types/types"

export const months: TMonths[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
interface IselctedMonth {
    setSelectedMonth: Dispatch<SetStateAction<number>>
}
export function MonthSelector({ setSelectedMonth }: IselctedMonth) {
    const [open, setOpen] = useState(false)
    const currentMonth = new Date()
    const [onMonth, setOnMonth] = useState(months[currentMonth.getMonth()]);



    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-[140px] md:w-[200px] justify-between"
                >
                    {onMonth}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandGroup>
                        {months.map((month, i) => (
                            <div className="" onClick={() => { setOnMonth(month), setOpen(false), setSelectedMonth(i) }} key={month}>
                                <CommandItem className="flex gap-2">
                                    <Check className={cn("text-white w-4 h-4", onMonth === month && "text-black")} />
                                    {month}
                                </CommandItem>
                            </div>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

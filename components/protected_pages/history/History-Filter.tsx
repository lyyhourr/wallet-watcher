"use client"
import { fontHeader, inter } from "@/fonts/Fonts";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const filters = [
    {
        title: "Date",
        filter: ["Today", "Week", "Month", "Year"]
    },
    {
        title: "Filter By",
        filter: ["Income", "Expense"]
    },
    {
        title: "Sort By",
        filter: ["Highest", "Lowest", "Oldest", "Lastest"]
    },
]
export default function HistoryFilter() {
    const Category = ["shopping", "foods", "bills", "subscription", "other"]
    const [onCate, setOnCate] = useState("")
    const [open, setOpen] = useState(false)
    const [onFilter, setOnFilter] = useState("")
    return (
        <div className="flex flex-col gap-5 h-full">
            <h1 className={`${fontHeader.className} text-center text-3xl uppercase`}>Filter</h1>
            <div className=" flex flex-col gap-5">
                {
                    filters.map((item) => (
                        <div key={item.title} className="flex flex-col gap-3 border-b border-gray-400 py-4 ">
                            <h1 className={`${inter.className} text-lg`}>{item.title}</h1>
                            <div className="flex items-center gap-5">
                                {
                                    item.filter.map(fil => (
                                        <button key={fil} className={cn("w-[80px] py-1 rounded-md text-gray-500 bg-gray-200",
                                            onFilter === fil && "text-white bg-card-green")}
                                            onClick={() => setOnFilter(fil)}>{fil}</button>

                                    ))
                                }
                            </div>
                        </div>
                    ))
                }


                <div className="flex flex-col gap-3 border-b border-gray-400 py-4 ">
                    <h1 className={`${inter.className} text-lg`}>Category</h1>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-[170px] md:w-[200px] justify-between"
                            >
                                {onCate.length ? onCate : "Select Category"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandGroup>
                                    {Category.map((cate) => (
                                        <div className="" onClick={() => { setOnCate(cate), setOpen(false) }} key={cate}>
                                            <CommandItem className="flex gap-2">
                                                <Check className={cn("text-white w-4 h-4", onCate === cate && "text-black")} />
                                                {cate}
                                            </CommandItem>
                                        </div>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="flex items-end justify-center gap-2 mt-auto">

                <button className="w-full py-2 rounded-lg text-lg bg-card-green text-white">Filter</button>
                <button className="w-full py-2 rounded-lg  text-lg bg-card-red text-white">Reset</button>
            </div>
        </div>

    )
}

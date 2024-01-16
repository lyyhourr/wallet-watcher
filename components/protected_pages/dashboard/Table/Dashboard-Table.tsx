"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { fontHeader } from '@/fonts/Fonts'
import React, { useState } from 'react'
import { ShoppingBagIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GiFastNoodles } from 'react-icons/gi'
import { BsHouse } from 'react-icons/bs'
import { MdOutlineCheckCircleOutline } from 'react-icons/md'
import Delete from './Delete'
import Edit from './EditExpense'
import { TDataTest } from '@/types/types'

const tabs = ["today", "week", "month", "year"]

const numberArray: any[] = [];
for (let i = 1; i <= 6; i++) {
    numberArray.push(i);
}


const testData: TDataTest[] = [
    {
        title: "Shopping",
        amount: "50",
        date: "12-01-2024"
    },
    {
        title: "Foods",
        amount: "10",
        date: "01-10-2024"
    },
    {
        title: "Other",
        amount: "20",
        date: "-1-01-2022"
    },
    {
        title: "Bills",
        amount: "50",
        date: "10-10-2012"
    },
    {
        title: "Bills",
        amount: "50",
        date: "10-10-2012"
    },
]


export default function DashboardTable() {
    const [tab, setTab] = useState("today");
    const IconHandler = (cate: string) => {
        cate === "Shopping" && (<div> <ShoppingBagIcon className='text-yellow-500' /></div>)
        cate === "Foods" && (<div> <GiFastNoodles className='text-red-500' /></div>)
        cate === "Bills" && (<div> <BsHouse className='text-green-500' /></div>)
        cate === "Other" && (<div> <MdOutlineCheckCircleOutline /></div>)
    }

    return (
        <div className='flex flex-col gap-3'>
            <section className='flex gap-2 px-2 items-center  w-full '>
                {
                    tabs.map((item: string, i: number) => (
                        <button key={i} className={cn(`${fontHeader.className} opacity-55 transition-all w-full text-lg md:text-2xl lg:text-3xl text-center uppercase py-2 rounded-md text-gray-500`,
                            tab === item && "bg-green-100 text-[#11CD6F] opacity-100"
                        )}
                            onClick={() => setTab(item)}>
                            {item}
                        </button>
                    ))
                }
            </section>
            <header className='flex text-lg justify-between px-4 items-center '>
                <p>Recent Transactions:</p>
                <button>See All</button>
            </header>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className='hidden md:block'>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        testData.slice(0, 5).map((item, i) => (
                            <TableRow key={i}>
                                <TableCell className='flex items-center gap-2'><ShoppingBagIcon /> {item.title}</TableCell>
                                <TableCell>{item.amount}$</TableCell>
                                <TableCell className='hidden md:block'>{item.date}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className='text-xl flex items-center'>...</DropdownMenuTrigger>
                                        <DropdownMenuContent className='flex gap-1 items-center mr-2' side='bottom'>
                                            <Edit amount={item.amount} date={item.date} title={item.title} />
                                            <Delete />

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>

            </Table>
        </div>

    )
}

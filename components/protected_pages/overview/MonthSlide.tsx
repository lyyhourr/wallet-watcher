"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fontHeader, fontHero, inter } from '@/fonts/Fonts';
import { ArrowLeft, ArrowRight, MoreHorizontal, ShoppingBagIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';


const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
const numberArray: any[] = [];
for (let i = 1; i <= 30; i++) {
    numberArray.push(i);
}
const MonthSlider = () => {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
    const [onSlide, setOnSlide] = useState("")

    useEffect(() => {
        setOnSlide(months[currentMonthIndex])

    }, [currentMonthIndex])
    const goToNextMonth = () => {
        setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % months.length);
    };

    const goToPreviousMonth = () => {
        setCurrentMonthIndex((prevIndex) => (prevIndex - 1 + months.length) % months.length);

    };


    const table: any[] = []
    for (var i = 0; i < 20; i++) {
        table.push(i)
    }


    return (
        <main className="flex items-center justify-center flex-col p-2 gap-4">
            <section className="flex justify-between w-full px-10 rounded-md py-4 bg-slate-100">
                <button className="text-2xl " onClick={goToPreviousMonth}>
                    <ArrowLeft />
                </button>
                <p className={`text-3xl tracking-wide text-center ${fontHero.className}`}>
                    {months[currentMonthIndex]}
                </p>
                <button className="text-2xl " onClick={goToNextMonth}>
                    <ArrowRight />
                </button>
            </section>
            <section className=" w-full">
                <Table>
                    <TableHeader className=" flex text-white w-full">
                        <TableRow className="flex w-full mb-4">
                            <TableHead className="p-4 w-1/2 sm:w-1/4">Category</TableHead>
                            <TableHead className="p-4 w-1/3">Amount</TableHead>
                            <TableHead className="p-4 w-1/4 hidden sm:block">Date</TableHead>
                            <TableHead className="p-4 w-1/4">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full h-[330px]" >
                        {
                            numberArray.map((item, i) => (
                                <TableRow className="flex w-full mb-4 " key={i}>
                                    <TableCell className="p-4 w-1/2 sm:w-1/4 flex items-center gap-1"><ShoppingBagIcon /> Shopping</TableCell>
                                    <TableCell className="p-4 w-1/3 sm:w-1/4">1000$</TableCell>
                                    <TableCell className="p-4 w-1/4 hidden sm:block">10-01-2024</TableCell>
                                    <TableCell className="p-4 w-1/4" ><MoreHorizontal /></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </section>
            <section className={`${fontHeader.className} w-full py-1 flex justify-between  text-lg `}>
                <div className='flex flex-col items-center justify-center '>
                    <p>$10000</p>
                    <p className=" text-green-500 tracking-wide">INCOME</p>
                </div>
                <div className='flex flex-col items-center justify-center '>
                    <p>$10000</p>
                    <p className=" text-red-500 tracking-wide">EXPENSE</p>
                </div>
                <div className='flex flex-col items-center justify-center '>
                    <p>$10000</p>
                    <p className=" text-blue-500 tracking-wide">LEFT</p>
                </div>
            </section>

        </main >
    );
};

export default MonthSlider;




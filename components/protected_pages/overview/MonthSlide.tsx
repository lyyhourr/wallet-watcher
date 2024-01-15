"use client"
import { fontHeader, fontHero } from '@/fonts/Fonts';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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

    return (
        <main className="flex items-center justify-center flex-col p-2 gap-4">
            <section className="flex justify-between w-full px-10 rounded-md py-4 bg-slate-200">
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
            <section className=' w-full bg-slate-200 rounded-md '>
                <p className='text-center text-lg'>Year: 2024</p>
                <div className='h-[300px] p-3 overflow-auto flex flex-col gap-4 bg-slate-100 m-4'>
                    {
                        numberArray.map((item, i) => (
                            <div className='border-b border-gray-300  flex justify-between items-center' key={i}>
                                <p className='text-lg'>{item}. History.....</p>
                                <p>01-01-2024</p>
                            </div>
                        ))
                    }
                </div>
                <div className='w-full flex justify-between px-5 pb-5'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p>$10000</p>
                        <p className='text-green-500'>INCOME</p>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p>$10000</p>
                        <p className='text-red-500'>EXPENSE</p>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p>$10000</p>
                        <p className='text-blue-500'>LEFT</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default MonthSlider;

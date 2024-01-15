import { fontHeader } from '@/fonts/Fonts'
import { cn } from '@/lib/utils'
import React from 'react'

interface ICard {
    background?: "red" | "green" | "blue"
    icon: any
    title: string
    amount: string
    className?: string
}

export default function Card(props: ICard) {
    return (
        <div
            className={cn("w-full  rounded-md lg:rounded-xl flex flex-col  gap-2 xl:gap-5  py-3 sm:py-7 md:py-10 items-center  justify-center",
                props.background ? `text-white bg-card-${props.background}` : "border-2",
                props.className && `${props.className}`)
            }>
            <div className="bg-gray-100 rounded-full w-fit ">
                <p className={cn("text-center text-4xl md:text-5xl xl:text-6xl text-primary-color p-4",
                    props.background && `text-white text-${props.background}-500`,
                )}>
                    {props.icon}
                </p>
            </div>
            <div className={`${fontHeader.className} flex flex-col gap-2 text-center`}>
                <p className={cn(`text-xl xl:text-3xl uppercase  tracking-wide`, !props.background && "text-gray-500")}>{props.title}</p>
                <p className="text-2xl xl:text-4xl">{props.amount}$</p>
            </div>
        </div>
    )
}

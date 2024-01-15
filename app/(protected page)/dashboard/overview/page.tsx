
import { cn } from "@/lib/utils";
import { GoalIcon } from "lucide-react";
import React from "react";
import { BiMoney } from "react-icons/bi";
import { GiExpense, GiMoneyStack } from "react-icons/gi";
import { RiMoneyCnyBoxFill } from "react-icons/ri";

export default function DashbaordOverviewPage() {

  const Card = ({ header, amount, icon, background }: { header: string, amount: string, icon: any, background?: "green" | "red" | "blue" }) => (
    <div className={cn("w-full  rounded-md lg:rounded-xl flex flex-col  gap-2 xl:gap-5 border-2 py-3 sm:py-7 md:py-10 items-center  justify-center",
      background && "text-white",
      background === "green" && "bg-[#32D583] ",
      background === "blue" && "bg-[#0077FF] ",
      background === "red" && "bg-[#FD3C4A]")}>
      <div className="bg-gray-100 rounded-full w-fit ">
        <p className="text-center text-3xl text-primary-color px-6 py-3">{icon}</p>
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className={cn(`text-xl xl:text-3xl uppercase`, !background && "text-gray-500")}>{header}</p>
        <p className="text-2xl xl:text-4xl">{amount}$</p>
      </div>
    </div>
  )


  return <main className="w-full h-full  gap-1 ">
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {Card({ header: "Total Income", amount: "10000", icon: "$", background: "green" })}
      {Card({ header: "Total Expense", amount: "10000", icon: <GiExpense />, background: "red" })}
      {Card({ header: "Balance", amount: "10000", icon: <GiMoneyStack />, background: "blue" })}
      {Card({ header: "Goal", amount: "10000", icon: <GoalIcon /> })}
    </section>
    <section className="flex gap-2">
      <div className="flex flex-col w-full gap-2 border-2">
        <p>slide</p>
        <p>table</p>
      </div>
      <div className="w-full">
        contents
      </div>

    </section>

  </main>;
}

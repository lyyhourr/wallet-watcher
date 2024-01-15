import MonthSlider from "@/components/protected_pages/overview/MonthSlide";
import { fontHeader } from "@/fonts/Fonts";
import { cn } from "@/lib/utils";
import { DollarSign, GoalIcon } from "lucide-react";
import React from "react";
import { BiDollar } from "react-icons/bi";
import { GiExpense, GiMoneyStack, GiStairsGoal } from "react-icons/gi";

export default function DashbaordOverviewPage() {

  const Card = ({ header, amount, icon, background }: { header: string, amount: string, icon: any, background?: "green" | "red" | "blue" }) => (
    <div className={cn("w-full  rounded-md lg:rounded-xl flex flex-col  gap-2 xl:gap-5 border-2 py-3 sm:py-7 md:py-10 items-center  justify-center",
      background && "text-white",
      background === "green" && "bg-[#32D583] ",
      background === "blue" && "bg-[#0077FF] ",
      background === "red" && "bg-[#FD3C4A]")}>
      <div className="bg-gray-100 rounded-full w-fit ">
        <p className={cn("text-center text-4xl md:text-5xl xl:text-6xl text-primary-color p-4",
          background === "green" && "text-green-500",
          background === "blue" && "text-blue-500",
          background === "red" && "text-red-500",
        )}>
          {icon}
        </p>
      </div>
      <div className={`${fontHeader.className} flex flex-col gap-2 text-center`}>
        <p className={cn(`text-xl xl:text-3xl uppercase  tracking-wide`, !background && "text-gray-500")}>{header}</p>
        <p className="text-2xl xl:text-4xl">{amount}$</p>
      </div>
    </div>
  )


  return (
    <main className="w-full h-full flex flex-col  gap-4 ">
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {Card({ header: "Total Income", amount: "10000", icon: <BiDollar />, background: "green" })}
        {Card({ header: "Total Expense", amount: "10000", icon: <GiExpense />, background: "red" })}
        {Card({ header: "Balance", amount: "10000", icon: <GiMoneyStack />, background: "blue" })}
        {Card({ header: "Goal", amount: "10000", icon: <GiStairsGoal /> })}
      </section>
      <section className="flex flex-col xl:flex-row gap-2">
        <div className="w-full  ">
          <MonthSlider />
        </div>
        <div className="w-full  rounded-md flex flex-col justify-between py-10   px-2 gap-10 xl:gap-0  bg-slate-100">
          <div className="flex w-full pl-2 sm:justify-evenly">
            <div className="flex flex-col gap-1 w-[300px]">
              <p className={`${fontHeader.className} text-3xl`}>Highest Expense: </p>
              <p className="text-gray-500">
                <span className="text-red-500"> 80% </span>
                expensed on
                <span className="text-red-500"> Shopping  </span>
                😡
              </p>
            </div>
            <p className={`${fontHeader.className} text-start text-3xl text-red-600`}>10000$ </p>

          </div>
          <div className="flex w-full pl-2 sm:justify-evenly ">
            <div className="flex flex-col gap-1 w-[300px] ">
              <p className={`${fontHeader.className} text-3xl text-start`}>Lowest Expense: </p>
              <p className="text-gray-500">Only
                <span className="text-green-500"> 10% </span>
                expensed on
                <span className="text-green-500"> Foods  </span>
                👍
              </p>
            </div>
            <p className={`${fontHeader.className} text-3xl text-start text-green-500`}>10000$ </p>
          </div>
          <div className="flex w-full pl-2 sm:justify-evenly">
            <div className="flex flex-col gap-2 w-[300px] ">
              <p className={`${fontHeader.className} text-3xl `}>Goal Reached: </p>
              <p className="text-gray-500">
                <span className="text-red-500"> 500$ </span>
                away from goal.💪
              </p>
            </div>
            <p className={`${fontHeader.className} text-3xl text-start text-blue-600`}>30% </p>
          </div>

        </div>

      </section>
    </main>
  );
}

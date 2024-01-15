import MonthSlider from "@/components/protected_pages/overview/MonthSlide";
import { fontHeader } from "@/fonts/Fonts";
import { cn } from "@/lib/utils";
import { GoalIcon } from "lucide-react";
import React from "react";
import { GiExpense, GiMoneyStack } from "react-icons/gi";

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


  return (
    <main className="w-full h-full flex flex-col  gap-4 ">
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {Card({ header: "Total Income", amount: "10000", icon: "$", background: "green" })}
        {Card({ header: "Total Expense", amount: "10000", icon: <GiExpense />, background: "red" })}
        {Card({ header: "Balance", amount: "10000", icon: <GiMoneyStack />, background: "blue" })}
        {Card({ header: "Goal", amount: "10000", icon: <GoalIcon /> })}
      </section>
      <section className="flex flex-col xl:flex-row gap-2">
        <div className="w-full  ">
          <MonthSlider />
        </div>
        <div className="w-full  rounded-md flex flex-col justify-between py-10 px-2 gap-10 xl:gap-0  bg-slate-100">
          <div className="flex w-full justify-evenly">
            <div className="flex flex-col gap-1">
              <p className={`${fontHeader.className} text-3xl`}>Highest Expense: </p>
              <p className="text-gray-500">
                <span className="text-red-500"> 80% </span>
                expensed on
                <span className="text-red-500"> Shopping  </span>
                😡
              </p>
            </div>
            <p className={`${fontHeader.className} text-3xl text-red-600`}>10000$ </p>

          </div>
          <div className="flex w-full justify-evenly">
            <div className="flex flex-col gap-1">
              <p className={`${fontHeader.className} text-3xl`}>Lowest Expense: </p>
              <p className="text-gray-500">
                Only
                <span className="text-green-500">
                  10%
                </span>
                expensedon
                <span className="text-green-500">
                  Foods
                </span>
                👍</p>
            </div>
            <p className={`${fontHeader.className} text-3xl text-green-500`}>10000$ </p>
          </div>
          <div className="flex w-full justify-evenly">
            <div className="flex flex-col gap-2">
              <p className={`${fontHeader.className} text-3xl`}>Goal Reached: </p>
              <p className="text-gray-500">
                <span className="text-red-500"> 500$ </span>
                away from goal.💪
              </p>
            </div>
            <p className={`${fontHeader.className} text-3xl text-blue-600`}>30% </p>
          </div>

        </div>

      </section>
    </main>
  );
}

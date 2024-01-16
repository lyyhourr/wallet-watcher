import Card from "@/components/protected_pages/Card";
import MonthSlider from "@/components/protected_pages/overview/MonthSlide";
import { fontHeader } from "@/fonts/Fonts";
import { cn } from "@/lib/utils";
import React from "react";
import { BiDollar } from "react-icons/bi";
import { GiExpense, GiMoneyStack, GiStairsGoal } from "react-icons/gi";

export default function DashbaordOverview() {


  return (
    <main className="w-full h-full flex flex-col  gap-4 ">
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <Card title="Total Income" icon={<BiDollar />} amount="10000" background="green" />
        <Card title="Total Expense" icon={<GiExpense />} amount="10000" background="red" />
        <Card title="Total Balance" icon={<GiMoneyStack />} amount="10000" background="blue" />
        <Card title=" Goal" icon={<GiStairsGoal />} amount="10000" />

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

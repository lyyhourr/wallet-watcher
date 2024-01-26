import Card from "@/components/protected_pages/Card";
import { fontHeader } from "@/fonts/Fonts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { BiDollar } from "react-icons/bi";
import { GiExpense, GiMoneyStack, GiStairsGoal } from "react-icons/gi";
import OverviewTable from "@/components/protected_pages/overview/OverviewTable";

const FetchTransactions = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user?.id);

  const FetchGoal = await supabase
    .from("goal")
    .select("amount")
    .eq("user_id", user?.id);
  const goal = FetchGoal.data?.map((item) => item.amount);

  const income = data
    ?.filter((item) => item.type === "income")
    .map((item) => Number(item.amount))
    .reduce((a: number, b: number) => a + b, 0);
  const expense = data
    ?.filter((item) => item.type === "expense")
    .map((item) => Number(item.amount))
    .reduce((a: number, b: number) => a + b, 0);
  const expenses = expense ? expense : 0;
  const balance = income ? income - expenses : 0;

  const allExpene = data?.filter((item) => item.type === "expense");
  const allIncome = data?.filter((item) => item.type === "income");

  const HighestExpense = allExpene?.reduce(
    (max, expense) =>
      parseFloat(expense.amount) > parseFloat(max.amount) ? expense : max,
    allExpene[0]
  );
  const HighestIncome = allIncome?.reduce(
    (max, expense) =>
      parseFloat(expense.amount) > parseFloat(max.amount) ? expense : max,
    allIncome[0]
  );
  const LowestExpense = allExpene?.reduce(
    (max, expense) =>
      parseFloat(expense.amount) < parseFloat(max.amount) ? expense : max,
    allExpene[0]
  );

  return {
    expense,
    income,
    balance,
    goal,
    HighestExpense,
    LowestExpense,
    HighestIncome,
    user,
    data,
  };
};

export default async function DashbaordOverview() {
  const {
    expense,
    income,
    balance,
    goal,
    HighestExpense,
    LowestExpense,
    HighestIncome,
    user,
    data,
  } = await FetchTransactions();

  return (
    <main className="w-full h-full flex flex-col  gap-4 ">
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <Card
          title="Total Income"
          icon={<BiDollar />}
          amount={`${income}`}
          background="green"
        />
        <Card
          title="Total Expense"
          icon={<GiExpense />}
          amount={`${expense}`}
          background="red"
        />
        <Card
          title="Total Balance"
          icon={<GiMoneyStack />}
          amount={`${balance}`}
          background="blue"
        />
        <Card title=" Goal" icon={<GiStairsGoal />} amount={`${goal}`} />
      </section>
      <section className="flex flex-col xl:flex-row gap-2">
        <div className="w-full  ">
          <OverviewTable userId={`${user?.id}`} tableData={data} />
        </div>
        <div className="w-full  rounded-md flex flex-col justify-between py-10   px-2 gap-10 xl:gap-0  bg-slate-100">
          <div className="flex w-full pl-2 sm:justify-evenly">
            <div className="flex flex-col gap-1 w-[300px]">
              <p className={`${fontHeader.className} text-3xl`}>
                Highest Expense:{" "}
              </p>
              <p className="text-gray-500">
                expensed on
                <span className="text-red-500">
                  {" "}
                  {HighestExpense?.category ? HighestExpense?.category + "😡" : "Nothing"}{" "}
                </span>

              </p>
            </div>
            <p
              className={`${fontHeader.className} text-start text-3xl text-red-600`}
            >
              ${HighestExpense?.amount ? HighestExpense?.amount : 0}
            </p>
          </div>
          <div className="flex w-full pl-2 sm:justify-evenly ">
            <div className="flex flex-col gap-1 w-[300px] ">
              <p className={`${fontHeader.className} text-3xl text-start`}>
                Lowest Expense:{" "}
              </p>
              <p className="text-gray-500">
                expensed on
                <span className="text-green-500">
                  {" "}
                  {LowestExpense?.category ? LowestExpense?.category + "👍" : "Nothing"}{" "}
                </span>

              </p>
            </div>
            <p
              className={`${fontHeader.className} text-3xl text-start text-green-500`}
            >
              $ {LowestExpense?.amount ? LowestExpense?.amount : 0}
            </p>
          </div>
          <div className="flex w-full pl-2 sm:justify-evenly">
            <div className="flex flex-col gap-2 w-[300px] ">
              <p className={`${fontHeader.className} text-3xl `}>
                Highest Income:{" "}
              </p>
              <p className="text-gray-500">from {HighestExpense?.category ? HighestExpense?.category + "💪" : "Nothing"}.</p>
            </div>
            <p
              className={`${fontHeader.className} text-3xl text-start text-blue-600`}
            >
              $ {HighestIncome?.amount ? HighestIncome?.amount : 0}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

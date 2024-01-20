import Card from "@/components/protected_pages/Card";
import AddExpense from "@/components/protected_pages/dashboard/AddExpense";
import AddGoal from "@/components/protected_pages/dashboard/AddGoal";
import AddIncome from "@/components/protected_pages/dashboard/AddIncome";
import DashboardTable from "@/components/protected_pages/dashboard/Table/Dashboard-Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fontHeader, inter } from "@/fonts/Fonts";
import { BiDollar } from "react-icons/bi";
import { GiExpense } from "react-icons/gi";
import { IoAddCircleOutline } from "react-icons/io5";
import Image from "next/image";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cn } from "@/lib/utils";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const FetchTableData = async () => {
  const currentMonth = new Date().getMonth() + 1;
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const username = user?.email?.slice(0, user?.email.indexOf("@"));
  const { data } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user?.id)
    .gte("date", `2024-${currentMonth}-01T00:00:00.000Z`)
    .lte("date", `2024-${currentMonth}-30T23:59:59.999Z`);

  const FetchGoal = await supabase
    .from("goal")
    .select("*")
    .eq("user_id", user?.id);
  return { user, data, FetchGoal, username, currentMonth };
};
const SumTotal = async (type: "income" | "expense", data: any) => {
  const total = await data
    ?.filter((item: any) => item.type === type)
    .map((item: any) => Number(item.amount))
    ?.reduce((a: number, b: number) => a + b, 0);
  return total;
};

export default async function Dashboard() {
  const { FetchGoal, data, user, username, currentMonth } =
    await FetchTableData();
  const goalAmount = FetchGoal.data
    ?.map((item) => Number(item.amount))
    .reduce((a: number, b: number) => a + b, 0);
  const income = await SumTotal("income", data);
  const expense = await SumTotal("expense", data);
  const expenseAfterFetch = expense ? expense : 0;
  const balance = income ? income - expenseAfterFetch : 0;
  return (
    <div className="h-full w-full flex flex-col gap-3">
      <header className="flex justify-between items-center px-1 lg:px-4  gap-3 py-3">
        <h1 className={`${inter.className} text-5xl hidden xl:block `}>
          Welcome, {username} !
        </h1>
        <p className={`${fontHeader.className} text-xl md:text-3xl`}>
          {months[currentMonth - 1]}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-3xl xl:hidden">
            <IoAddCircleOutline />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-1 p-2 mr-1">
            <AddIncome />
            <AddExpense />
            <AddGoal
              userId={user ? user.id : ""}
              goalAmount={goalAmount ? goalAmount : 0}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <h1 className={`${fontHeader.className} text-3xl text-center `}>
        Remaining Balance:{" "}
        <span className={cn(balance > 0 ? "text-green-600" : "text-red-600")}>
          {balance}$
        </span>
      </h1>
      <main className="flex flex-col xl:flex-row gap-2">
        <section className="w-full flex flex-col gap-5">
          <div className="grid grid-cols-2 lg:grid-cols-3  gap-2">
            <Card
              title="Income"
              amount={`${income}`}
              background="green"
              icon={<BiDollar />}
            />
            <Card
              title="Expense"
              amount={`${expense}`}
              background="red"
              icon={<GiExpense />}
            />
            <Card title="Goal" amount={`${goalAmount}`} icon={<GiExpense />} />
          </div>
          <DashboardTable tableData={data ? data : [{}]} />
        </section>
        <section className="hidden w-full lg:w-[350px] rounded-md bg-slate-50  xl:flex flex-col justify-between ">
          <div className="flex flex-col gap-2 py-10 px-2">
            <AddIncome />
            <AddExpense />
            <AddGoal
              userId={user ? user.id : ""}
              goalAmount={goalAmount ? goalAmount : 0}
            />
          </div>
          <Image
            src={"/images/coin.png"}
            width={10000}
            height={10000}
            alt="saving img"
            className="w-[400px] mx-auto mt-auto"
          />
        </section>
      </main>
    </div>
  );
}

import Card from "@/components/protected_pages/Card";
import AddExpense from "@/components/protected_pages/dashboard/AddExpense";
import AddGoal from "@/components/protected_pages/dashboard/AddGoal";
import AddIncome from "@/components/protected_pages/dashboard/AddIncome";
import DashboardTable from "@/components/protected_pages/dashboard/Table/Dashboard-Table";
import { MonthSelector } from "@/components/protected_pages/dashboard/MonthSelector";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { fontHeader, inter } from "@/fonts/Fonts";
import { BiDollar } from "react-icons/bi";
import { GiExpense } from "react-icons/gi";
import { IoAddCircleOutline } from "react-icons/io5";
import Image from "next/image";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";


export default async function Dashboard() {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data: { user }, error } = await supabase.auth.getUser()
    const userId = user?.id
    const name = user?.email?.slice(0, user?.email.indexOf("@"))

    return (
        <div className='h-full w-full flex flex-col gap-3'>
            <header className='flex justify-between items-center px-1 lg:px-4  gap-3 py-3'>
                <h1 className={`${inter.className} text-5xl hidden xl:block `}>Welcome, {name} !</h1>
                <MonthSelector />
                <DropdownMenu>
                    <DropdownMenuTrigger className="text-3xl xl:hidden"><IoAddCircleOutline /></DropdownMenuTrigger>
                    <DropdownMenuContent className="flex flex-col gap-1 p-2 mr-1">
                        <AddIncome userId={userId} />
                        <AddExpense />
                        <AddGoal />
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <h1 className={`${fontHeader.className} text-3xl text-center `}>Remaining Balance: 10000$</h1>
            <main className='flex flex-col xl:flex-row gap-2'>
                <section className="w-full flex flex-col gap-5">
                    <div className="grid grid-cols-2 lg:grid-cols-3  gap-2">
                        <Card title="Income" amount="1000" background="green" icon={<BiDollar />} />
                        <Card title="Expense" amount="1000" background="red" icon={<GiExpense />} />
                        <Card title="Goal" amount="1000" icon={<GiExpense />} />
                    </div>
                    <DashboardTable />
                </section>
                <section className="hidden w-full lg:w-[350px] rounded-md bg-slate-50  xl:flex flex-col justify-between ">
                    <div className="flex flex-col gap-2 py-10 px-2">
                        <AddIncome userId={userId} />
                        <AddExpense />
                        <AddGoal />
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
    )
}

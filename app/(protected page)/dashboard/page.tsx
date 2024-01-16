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


export default function Dashboard() {
    return (
        <div className='h-full w-full flex flex-col gap-3'>
            <header className='flex justify-between items-center px-1 lg:px-4  gap-3 py-3'>
                <h1 className={`${inter.className} text-5xl hidden xl:block `}>Welcome, Peter Parker!</h1>
                <MonthSelector />
                <DropdownMenu>
                    <DropdownMenuTrigger className="text-3xl xl:hidden"><IoAddCircleOutline /></DropdownMenuTrigger>
                    <DropdownMenuContent className="flex flex-col gap-1 p-2 mr-1">
                        <AddIncome />
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
                <section className="hidden w-full lg:w-[350px] rounded-md bg-slate-100  xl:flex flex-col gap-2 p-10">
                    <AddIncome />
                    <AddExpense />
                    <AddGoal />
                </section>
            </main>
        </div>
    )
}

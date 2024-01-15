import Card from "@/components/protected_pages/Card";
import TransactionTable from "@/components/protected_pages/dashboard/TransactionTable";
import { fontHeader, inter } from "@/fonts/Fonts";
import { cn } from "@/lib/utils";
import { BiDollar } from "react-icons/bi";
import { GiExpense, GiMoneyStack } from "react-icons/gi";


export default function Dashboard() {

    const card = ({ title, amount, icon, background }:
        {
            title: string,
            amount: string,
            icon: any,
            background: "red" | "blue" | "green"
        }
    ) => (
        <div className={cn(`bg-card-green rounded-md text-xl py-3 sm:py-5 md:py-7 lg:py-10  flex gap-1 items-center sm:justify-center  `
            , background && `bg-card-${background} text-white`)}>
            <p className={cn(`text-2xl lg:text-5xl bg-white p-2 rounded-md m-2 text-green-500`,
                background && `text-${background}-500`
            )}>
                {icon}
            </p>
            <div className={`${inter.className} sm:text-2xl  md:text-4xl  flex flex-col items-center justify-center  text-white p-2`}>
                <p className="uppercase xl:text-2xl">{title}</p>
                <p>{amount}$</p>
            </div>
        </div>
    )

    return (
        <div className='h-full w-full flex flex-col gap-3'>
            <header className='flex justify-between items-center px-1 lg:px-4  gap-3 py-3'>
                <h1 className={`${inter.className} text-5xl hidden lg:block `}>Welcome, Peter Parker!</h1>
                <h2 className='text-2xl'>September </h2>
            </header>
            <h1 className={`${fontHeader.className} text-3xl text-center `}>Remaining Balance: 10000$</h1>
            <main className='flex flex-col xl:flex-row gap-2'>
                <section className="w-full flex flex-col gap-5">
                    <div className="grid grid-cols-2 lg:grid-cols-3  gap-2">
                        <Card title="Income" amount="1000" background="green" icon={<BiDollar />} />
                        <Card title="Expense" amount="1000" background="red" icon={<GiExpense />} />
                        <Card title="Goal" amount="1000" icon={<GiExpense />} />
                    </div>
                    <TransactionTable />
                </section>
                <section className="w-full lg:w-[350px] border-4">a</section>
            </main>
        </div>
    )
}

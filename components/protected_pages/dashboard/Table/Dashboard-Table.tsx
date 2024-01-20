"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fontHeader } from "@/fonts/Fonts";
import React, { useEffect, useMemo, useState } from "react";
import { MoreHorizontal, ShoppingBagIcon } from "lucide-react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { GiFirstAidKit } from "react-icons/gi";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { IFormData } from "../../CategorySelector";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Edit from "./EditExpense";
import Delete from "./Delete";

const tabs = ["today", "week", "month", "year"];
const getFirstAndLastDayOfWeek = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const firstDayOfWeek = new Date(currentDate);
  const lastDayOfWeek = new Date(currentDate);

  firstDayOfWeek.setDate(currentDate.getDate() - currentDay);
  lastDayOfWeek.setDate(currentDate.getDate() + (6 - currentDay));

  return { firstDayOfWeek, lastDayOfWeek };
};

const IconHandler = (cate: string) => (
  <span>
    {cate === "shopping" && <ShoppingBagIcon className="text-yellow-500" />}
    {cate === "other" && <MdOutlineCheckCircleOutline />}
    {cate === "bills" && <FaMoneyBillTrendUp className="text-green-500" />}
    {cate === "hospital" && <GiFirstAidKit className="text-red-600 " />}
  </span>
);

interface ITable {
  tableData: IFormData[];
}
export default function DashboardTable({ tableData }: ITable) {
  const [tab, setTab] = useState("today");
  const [transactions, setTransaction] = useState<IFormData[]>();
  const date = new Date();
  const supabase = createClientComponentClient();
  const { firstDayOfWeek, lastDayOfWeek } = getFirstAndLastDayOfWeek();
  const startDayOfWeek = firstDayOfWeek.toLocaleString(undefined, {
    day: "numeric",
  });
  const endDayOfWeek = lastDayOfWeek.toLocaleString(undefined, {
    day: "numeric",
  });
  const queryHandler = (props: { query: "gte" | "lte" }) => {
    if (props.query === "gte") {
      if (tab === "today")
        return `2024-${date.getMonth() + 1}-${date.getDate()}`;
      if (tab === "month") return `2024-${date.getMonth() + 1}-1`;
      if (tab === "week")
        return `2024-${date.getMonth() + 1}-${startDayOfWeek}`;
      if (tab === "year") return `${date.getFullYear()}-1-1`;
    }
    if (props.query === "lte") {
      if (tab === "today")
        return `2024-${date.getMonth() + 1}-${date.getDate()}`;
      if (tab === "month") return `2024-${date.getMonth() + 1}-30`;
      if (tab === "week") return `2024-${date.getMonth() + 1}-${endDayOfWeek}`;
      if (tab === "year") return `${date.getFullYear()}-12-30`;
    }
  };
  useEffect(() => {
    const Fetch = async () => {
      const {
        data: { user },
      }: any = await supabase.auth.getUser();

      const { error, data } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false })
        .gte("date", queryHandler({ query: "gte" }) + "T00:00:00.000Z")
        .lte("date", queryHandler({ query: "lte" }) + "T00:00:00.000Z");
      if (data) {
        setTransaction(data);
      }
      if (error) {
        toast.error(error.message);
      }
    };
    Fetch();
  }, [tableData, tab]);

  return (
    <div className="flex flex-col gap-3">
      <section className="flex gap-2 px-2 items-center  w-full ">
        {tabs.map((item: string, i: number) => (
          <button
            key={i}
            className={cn(
              `${fontHeader.className} opacity-55 transition-all w-full text-lg md:text-2xl lg:text-3xl text-center uppercase py-2 rounded-md text-gray-500`,
              tab === item && "bg-green-100 text-[#11CD6F] opacity-100"
            )}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </section>
      <header className="flex text-lg justify-between px-4 items-center ">
        <p>Recent Transactions:</p>
        <button>See All</button>
      </header>
      <Table>
        <TableHeader className=" flex text-white w-full">
          <TableRow className="flex w-full mb-4">
            <TableHead className="p-4 w-1/2 sm:w-1/4">Category</TableHead>
            <TableHead className="p-4 w-1/3">Amount</TableHead>
            <TableHead className="p-4 w-1/4 hidden sm:block">Date</TableHead>
            <TableHead className="p-4 w-1/4">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-grey-light flex flex-col items-center  overflow-y-scroll w-full h-[300px] border-b  border-gray-300">
          {transactions &&
            transactions?.map((item, i) => (
              <TableRow className="flex w-full mb-4 " key={i}>
                <TableCell
                  className={cn(
                    "p-4 w-1/2 sm:w-1/4 flex items-center gap-1  text-lg"
                  )}
                >
                  <p className="text-xl">{IconHandler(`${item.category}`)}</p>
                  <p className="first-letter:uppercase">{item.category}</p>
                </TableCell>
                <TableCell
                  className={cn(
                    "p-4 w-1/3 sm:w-1/4",
                    item.type === "income" ? "text-green-600" : "text-red-600"
                  )}
                >
                  {item.amount}$
                </TableCell>
                <TableCell className="p-4 w-1/4 hidden sm:block">
                  {item.date}
                </TableCell>
                <TableCell className="p-4 w-1/4">
                  {" "}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-xl flex items-center">
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="flex gap-1 items-center mr-2"
                      side="bottom"
                    >
                      <Edit
                        amount={item.amount}
                        date={item.date}
                        category={item.category}
                        id={item.id}
                      />
                      <Delete id={`${item.id}`} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          {!transactions && (
            <TableRow className="flex w-full mb-4 ">
              <TableCell className="p-4 w-full text-center text-lg">
                No Data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

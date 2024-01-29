"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fontHeader, inter } from "@/fonts/Fonts";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { MoreHorizontal, ShoppingBagIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { IFormData } from "../../CategorySelector";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Delete from "./Delete";
import { IconHandler } from "../../Category-Icons";
import Edit from "./Edit";

const tabs = ["today", "week", "month", "year"];
const formatDate = (date: any) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const getFirstAndLastDayOfWeek = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const firstDayOfWeek = new Date(currentDate);
  const lastDayOfWeek = new Date(currentDate);

  firstDayOfWeek.setDate(currentDate.getDate() - currentDay);
  lastDayOfWeek.setDate(currentDate.getDate() + (6 - currentDay));
  return { firstDayOfWeek, lastDayOfWeek };
};

interface ITable {
  tableData: IFormData[];
}

export const queryHandler = (props: { query: "gte" | "lte"; tab: string }) => {
  const { firstDayOfWeek, lastDayOfWeek } = getFirstAndLastDayOfWeek();
  const date = new Date();
  if (props.query === "gte") {
    if (props.tab === "today")
      return `2024-${date.getMonth() + 1}-${date.getDate()}`;
    if (props.tab === "month")
      return `${date.getFullYear()}-${date.getMonth() + 1}-1`;
    if (props.tab === "week") return formatDate(firstDayOfWeek);
    if (props.tab === "year") return `${date.getFullYear()}-1-1`;
  }
  if (props.query === "lte") {
    if (props.tab === "today")
      return `2024-${date.getMonth() + 1}-${date.getDate()}`;
    if (props.tab === "month") return `2024-${date.getMonth() + 1}-30`;
    if (props.tab === "week") return formatDate(lastDayOfWeek);
    if (props.tab === "year") return `${date.getFullYear()}-12-30`;
  }
};
export default function DashboardTable({ tableData }: ITable) {
  const [tab, setTab] = useState("today");
  const [transactions, setTransaction] = useState<IFormData[]>();
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();
  const { firstDayOfWeek, lastDayOfWeek } = getFirstAndLastDayOfWeek();

  const date = new Date();
  const queryHandler = (props: { query: "gte" | "lte" }) => {
    if (props.query === "gte") {
      if (tab === "today")
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      if (tab === "month")
        return `${date.getFullYear()}-${date.getMonth() + 1}-1`;
      if (tab === "week") return `${formatDate(firstDayOfWeek)}`;
      if (tab === "year") return `${date.getFullYear()}-1-1`;
    }
    if (props.query === "lte") {
      if (tab === "today")
        return `2024-${date.getMonth() + 1}-${date.getDate()}`;
      if (tab === "month")
        return `${date.getFullYear()}-${date.getMonth() + 1}-30`;
      if (tab === "week") return formatDate(lastDayOfWeek);
      if (tab === "year") return `${date.getFullYear()}-12-30`;
    }
  };

  useEffect(() => {
    const Fetch = async () => {
      setLoading(true);
      const {
        data: { user },
      }: any = await supabase.auth.getUser();

      const { error, data } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user?.id)
        .order("date", { ascending: true })
        .gte("date", queryHandler({ query: "gte" }) + "T00:00:00.000Z")
        .lte("date", queryHandler({ query: "lte" }) + "T00:00:00.000Z");
      if (data) {
        setTransaction(data);
      }
      if (error) {
        toast.error(error.message);
      }
      setLoading(false);
    };
    console.log("effect rendered");
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
      <h1 className={`${inter.className} text-xl  `}>Recent Transactions:</h1>
      <Table>
        <TableHeader className=" flex text-white w-full">
          <TableRow className="flex w-full mb-4 ">
            <TableHead className="p-4 w-1/2 sm:w-1/4 ">Category</TableHead>
            <TableHead className="p-4 w-1/3 text-center">Amount</TableHead>
            <TableHead className="p-4 w-1/4 hidden sm:block text-center">
              Date
            </TableHead>
            <TableHead className="p-4 w-1/4 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-grey-light flex flex-col items-center  overflow-y-scroll w-full h-[300px] border-b  border-gray-300">
          {transactions &&
            transactions?.map((item, i) => (
              <TableRow className="flex w-full mb-4 " key={i}>
                <TableCell
                  className={cn(
                    "p-4 w-1/2 sm:w-1/4 flex items-center gap-1  text-lg md:justify-start",
                    item.type === "income" ? "text-green-600" : "text-red-600"
                  )}
                >
                  <p className="text-sm sm:text-base md:text-lg">
                    {IconHandler(`${item.category}`)}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg">
                    {item.category}
                  </p>
                </TableCell>
                <TableCell
                  className={cn(
                    "p-4 w-1/3 sm:w-1/4 flex justify-center items-center",
                    item.type === "income" ? "text-green-600" : "text-red-600"
                  )}
                >
                  {item.amount}$
                </TableCell>
                <TableCell className="p-4 w-1/4 hidden sm:flex justify-center">
                  {item.date}
                </TableCell>
                <TableCell className="p-4 w-1/4 flex justify-center">
                  {" "}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-xl flex justify-center text-center items-center">
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="flex gap-1 items-center mr-2"
                      side="bottom"
                    >
                      <Edit
                        type={item.type}
                        amount={item.amount}
                        date={item.date}
                        category={item.category}
                        id={item.id}
                        description={item.description}
                      />
                      <Delete id={`${item.id}`} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          {!transactions?.length && !loading && (
            <TableRow className="flex w-full mb-4 ">
              <TableCell className="p-4 w-full text-center text-lg">
                No Data
              </TableCell>
            </TableRow>
          )}
          {loading && (
            <TableRow className="flex w-full mb-4 ">
              <TableCell className="p-4 w-full text-center text-lg flex justify-center items-center gap-2">
                <AiOutlineLoading className="animate-spin text-blue-500 text-xl" />
                Getting data...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

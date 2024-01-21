"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fontHeader, fontHero } from "@/fonts/Fonts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
  ShoppingBagIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { IFormData } from "../CategorySelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Edit from "../dashboard/Table/Edit";
import Delete from "../dashboard/Table/Delete";
import { IconHandler } from "../Category-Icons";
import { cn } from "@/lib/utils";
import { AiOutlineLoading } from "react-icons/ai";
import { useRouter } from "next/navigation";

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

const MonthSlider = ({
  userId,
  tableData,
}: {
  userId: string;
  tableData: any;
}) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [onSlide, setOnSlide] = useState("");
  const supabase = createClientComponentClient();
  const [transactions, setTransaction] = useState<IFormData[]>();
  const [loading, setLoading] = useState(false);
  const TotalIncome = transactions
    ? transactions
        ?.filter((item) => item.type === "income")
        .map((item) => Number(item.amount))
        .reduce((a: number, b: number) => a + b, 0)
    : 0;
  const TotalExpense = transactions
    ? transactions
        ?.filter((item) => item.type === "expense")
        .map((item) => Number(item.amount))
        .reduce((a: number, b: number) => a + b, 0)
    : 0;
  const left = TotalIncome - TotalExpense;

  useEffect(() => {
    setOnSlide(months[currentMonthIndex]);
  }, [currentMonthIndex]);
  const goToNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % months.length);
  };

  const goToPreviousMonth = () => {
    setCurrentMonthIndex(
      (prevIndex) => (prevIndex - 1 + months.length) % months.length
    );
  };

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const lastDayOfMonth = new Date(
      date.getFullYear(),
      currentMonthIndex + 1,
      0
    );
    const lastDateOfCurrentMonth = lastDayOfMonth.toLocaleString(undefined, {
      day: "numeric",
    });

    const FetchData = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false })
        .gte("date", `${year}-${currentMonthIndex + 1}-1T00:00:00.000Z`)
        .lte(
          "date",
          `${year}-${
            currentMonthIndex + 1
          }-${lastDateOfCurrentMonth}T00:00:00.000Z`
        );
      setTransaction(data ? data : []);
      setLoading(false);
    };
    FetchData();
  }, [onSlide, tableData]);

  return (
    <main className="flex items-center justify-center flex-col p-2 gap-4">
      <section className="flex justify-between w-full px-10 rounded-md py-4 bg-slate-100">
        <button className="text-2xl " onClick={goToPreviousMonth}>
          <ArrowLeft />
        </button>
        <p
          className={`text-3xl tracking-wide text-center ${fontHero.className}`}
        >
          {months[currentMonthIndex]}
        </p>
        <button className="text-2xl " onClick={goToNextMonth}>
          <ArrowRight />
        </button>
      </section>
      <section className=" w-full">
        <Table>
          <TableHeader className=" flex text-white w-full">
            <TableRow className="flex w-full mb-4">
              <TableHead className="p-4 w-1/2 sm:w-1/4  ">Category</TableHead>
              <TableHead className="p-4 w-1/3  text-center">Amount</TableHead>
              <TableHead className="p-4 w-1/4 hidden sm:block  text-center">
                Date
              </TableHead>
              <TableHead className="p-4 w-1/4  text-center">Action</TableHead>
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
                    <p className="text-sm">{IconHandler(`${item.category}`)}</p>
                    <p className="text-sm">{item.category}</p>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "p-4 w-1/3 sm:w-1/4 flex justify-center",
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
            {!transactions?.length && (
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
      </section>
      <section
        className={`${fontHeader.className} w-full py-1 flex justify-between  text-lg `}
      >
        <div className="flex flex-col items-center justify-center ">
          <p>${TotalIncome}</p>
          <p className=" text-green-500 tracking-wide">INCOME</p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p>${TotalExpense}</p>
          <p className=" text-red-500 tracking-wide">EXPENSE</p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p>${left}</p>
          <p className=" text-blue-500 tracking-wide">LEFT</p>
        </div>
      </section>
    </main>
  );
};

export default MonthSlider;

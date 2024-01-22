"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import Delete from "../dashboard/Table/Delete";
import Edit from "../dashboard/Table/Edit";
import { cn } from "@/lib/utils";
import { IFormData } from "../CategorySelector";
import { AiOutlineLoading } from "react-icons/ai";

export default function HistoryTable({ tableData }: { tableData: any }) {
  const [transactions, setTransaction] = useState<IFormData[]>(tableData);
  const [loading, setLoading] = useState(false);
  return (
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
      <TableBody className="bg-grey-light flex flex-col items-center  overflow-y-scroll w-full h-[500px] border-b  border-gray-300">
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
                  {item.category}
                </p>
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
  );
}

"use client";
import { fontHeader, inter } from "@/fonts/Fonts";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HistoryFilter({
  setTableData,
  Alldata,
  setOpenDrawer,
  tableData,
}: any) {
  const Category = [
    "Housing/Renting",
    "Utilities",
    "Groceries",
    "Transportation",
    "Insurance",
    "Loan Payments",
    "Taxes",
    "Healthcare",
    "Entertainment",
    "Internet and Phone",
    "Clothing",
    "Personal Care",
    "Investments",
    "Education",
    "Gifts/Donations",
    "Travel",
    "Childcare",
    "Subscriptions",
    "other",
    "Salary",
    "Bonus",
    "Tips",
    "Rental",
    "Retirement",
    "Freelance/Contract",
    "Business",
    "other",
  ];
  const [open, setOpen] = useState(false);
  const [userFilter, setUserFilter] = useState([""]);
  const [category, setCategory] = useState("");
  const [filters, setFilters] = useState([
    {
      type: "Date",
      filter: ["Today", "Week", "Month", "Year"],
      selected: "",
    },
    {
      type: "Filter By",
      filter: ["Income", "Expense"],
      selected: "",
    },
    {
      type: "Sort By",
      filter: ["Highest", "Lowest", "Oldest", "Lastest"],
      selected: "",
    },
  ]);

  React.useEffect(() => {
    setUserFilter(filters.map((item) => item.selected));
  }, [filters]);

  const handleSelectedCategory = (
    selectedType: string,
    selectedFilter: string
  ) => {
    setFilters((prev) =>
      prev.map((p) =>
        p.type === selectedType
          ? p.selected === selectedFilter
            ? { ...p, selected: "" }
            : { ...p, selected: selectedFilter }
          : { ...p }
      )
    );
  };

  const HandleFilter = async () => {
    if (category.length > 1) {
      setTableData(Alldata.filter((item: any) => item.category === category));
    }

    if (userFilter.includes("Income")) {
      if (category.length > 1) {
        setTableData(
          Alldata.filter(
            (item: any) => item.type === "income" && item.category === category
          )
        );
      } else {
        setTableData(Alldata.filter((item: any) => item.type === "income"));
      }
    }
    if (userFilter.includes("Expense")) {
      setTableData(Alldata.filter((item: any) => item.type === "expense"));
    }
    setOpenDrawer(false);
    setCategory("");
  };
  const hanldleReset = () => {
    setCategory("");
    setUserFilter([""]);
    setFilters((prev) =>
      prev.map((p) =>
        p.selected.length > 1 ? { ...p, selected: "" } : { ...p }
      )
    );
  };
  return (
    <div className="flex flex-col gap-5 h-full">
      <h1 className={`${fontHeader.className} text-center text-3xl uppercase`}>
        Filter
      </h1>
      <div className=" flex flex-col gap-5">
        {filters.map((item) => (
          <div
            key={item.type}
            className="flex flex-col gap-3 border-b border-gray-400 py-4 "
          >
            <h1 className={`${inter.className} text-lg`}>{item.type}</h1>
            <div className="flex items-center gap-5">
              {item.filter.map((fil) => (
                <button
                  key={fil}
                  className={cn(
                    "w-[80px] py-1 rounded-md text-gray-500 bg-gray-200",
                    userFilter.includes(fil) && "text-white bg-card-green"
                  )}
                  onClick={() => {
                    handleSelectedCategory(item.type, fil);
                  }}
                >
                  {fil}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-3 border-b border-gray-400 py-4 ">
          <h1 className={`${inter.className} text-lg`}>Category</h1>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-[170px] md:w-[200px] justify-between"
              >
                {category.length ? category : "Select Category"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandGroup className="h-[300px] overflow-auto">
                  {Category.map((cate, i) => (
                    <div
                      className=""
                      onClick={() => {
                        setOpen(false), setCategory(cate);
                      }}
                      key={i}
                    >
                      <CommandItem className="flex gap-2">
                        <Check
                          className={cn(
                            "text-white w-4 h-4",
                            category === cate && "text-black"
                          )}
                        />
                        {cate}
                      </CommandItem>
                    </div>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex items-end justify-center gap-2 mt-auto">
        <button
          className="w-full py-2 rounded-lg text-lg bg-card-green text-white"
          onClick={HandleFilter}
        >
          Filter
        </button>
        <button
          className="w-full py-2 rounded-lg  text-lg bg-card-red text-white"
          onClick={hanldleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

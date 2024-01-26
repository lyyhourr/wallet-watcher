"use client";
import { fontHeader, inter } from "@/fonts/Fonts";
import React, { useEffect, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Divide } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { queryHandler } from "../dashboard/Table/Dashboard-Table";
import { expenseCategories, incomeCategories } from "../Category-Icons";
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
export default function HistoryFilter({
  setTableData,
  setOpenDrawer,
  userId,
  tabelData
}: any) {

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const supabase = createClientComponentClient();
  const [filters, setFilters] = useState([
    {
      type: "Date",
      filter: ["Today", "Week", "Month", "Year"],
      selected: "",
    },
    {
      type: "Sort By",
      filter: ["Highest", "Lowest", "Oldest", "Lastest"],
      selected: "",
    },
    {
      type: "Filter By",
      filter: ["Income", "Expense"],
      selected: "",
    },
  ]);

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
    var sortBy
    var sortOn
    if (filters[1].selected.includes("Highest")) {
      sortBy = "amount"
      sortOn = false
    }
    else if (filters[1].selected.includes("Lowest")) {
      sortBy = "amount"
      sortOn = true
    }
    else if (filters[1].selected.includes("Oldest")) {
      sortBy = "date"
      sortOn = true
    }
    else {
      sortBy = "date"
      sortOn = false
    }

    const filterBy = filters[2].selected.toLowerCase()
    if (filters[0].selected.length > 2) {
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId)
        .like("type", `%${filterBy}%`)
        .like("category", `%${category}%`)
        .order(sortBy, { ascending: sortOn })
        .gte("date", queryHandler({ query: "gte", tab: filters[0].selected.toLowerCase() }) + "T00:00:00.000Z")
        .lte("date", queryHandler({ query: "lte", tab: filters[0].selected.toLowerCase() }) + "T00:00:00.000Z")
      setTableData(data)

    } else {


      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId)
        .like("type", `%${filterBy}%`)
        .like("category", `%${category}%`)
        .order(sortBy, { ascending: sortOn })

      setTableData(data)
    }
    setOpenDrawer(false);


  };

  const hanldleReset = async () => {
    setCategory("");
    setFilters((prev) =>
      prev.map((p) =>
        p.selected.length > 1 ? { ...p, selected: "" } : { ...p }
      )
    );
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
    setTableData(data)
    setOpenDrawer(false);
  };


  const categoryFitler = filters[2].selected.length > 1 ? filters[2].selected === "Income" ? incomeCategories : expenseCategories : Category
  return (
    <div className="flex flex-col gap-5 h-full">
      <h1 className={`${inter.className}  text-center text-3xl `}>
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
                    filters.map(item => item.selected === fil && "bg-card-green text-white")
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
                aria-expanded={open}
                className="w-[250px] justify-between"
              >
                {category ? category : "Select a Category"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
              <Command>
                <CommandInput placeholder="Search Category..." />
                <CommandEmpty>No Category found.</CommandEmpty>
                <CommandGroup className="h-[300px] overflow-auto">
                  {categoryFitler.map((cate, i) => (
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
      {
        filters[0].selected.length || filters[1].selected.length || filters[2].selected.length ? (
          <div className="flex items-center gap-2">
            <p>Filtering : </p>
            <div className="flex items-center gap-2">
              {filters.map((item, i) => <span key={i}>{item.selected}</span>)}
            </div>
          </div>
        ) : (<></>)
      }
      {
        category.length ? <p>Category : {category}</p> : <></>
      }

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

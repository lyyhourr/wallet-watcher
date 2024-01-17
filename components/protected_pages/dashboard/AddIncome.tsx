"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fontHeader } from "@/fonts/Fonts";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import React, { useEffect, useState } from "react";
import { CreateIncome } from "@/components/actions/actions";
import toast from "react-hot-toast";
const initialData = {
  type: "",
  amount: "",
  date: "",
  category: "",
};

export default function AddIncome() {
  const [formData, setFormData] = useState(initialData);
  const [tabs, setTabs] = useState("other");
  const [openDialog, setOpenDialog] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const actions = await CreateIncome(formData);
    if (actions) {
      return toast.success("add successfully");
    }
    console.log(actions);
  };
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      type: tabs,
    });
  };
  return (
    <Dialog onOpenChange={setOpenDialog} open={openDialog}>
      <DialogTrigger className="bg-green-500 px-2 py-1 sm:px-4 text-lg sm:py-2 text-white rounded-md">
        Add Income
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-3 lg:gap-10">
        <DialogHeader className={`${fontHeader.className} text-2xl `}>
          Add Income
        </DialogHeader>
        <Tabs>
          <TabsList className="w-full">
            <TabsTrigger
              value="other"
              className="w-full"
              onClick={() => setTabs("other")}
            >
              Other Income
            </TabsTrigger>
            <TabsTrigger
              value="salary"
              className="w-full"
              onClick={() => setTabs("salary")}
            >
              Salary Income
            </TabsTrigger>
          </TabsList>
          <TabsContent value="other">
            <form
              action=""
              className="flex flex-col gap-3"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-4 items-center">
                <label htmlFor="" className="text-sm md:text-base">
                  Amount
                </label>
                <Input
                  placeholder="Amount"
                  className="col-span-3"
                  name="amount"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <label htmlFor="" className="text-xs sm:text-sm md:text-base ">
                  Recived Date
                </label>
                <Input
                  placeholder="date"
                  type="date"
                  className="col-span-3"
                  name="date"
                  onChange={handleChange}
                />
              </div>
              <Category setFormData={setFormData} formData={formData} />
              <div className="flex gap-2 items-center ">
                <Button
                  className="bg-green-500 text-lg w-full"
                  onClick={() => setOpenDialog(false)}
                >
                  Add Income
                </Button>
                <Button
                  className="bg-gray-500 text-lg w-full"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="salary">
            <form
              action=""
              className="flex flex-col gap-3"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-4 items-center">
                <label htmlFor="" className="text-sm md:text-base">
                  Salary
                </label>
                <Input
                  placeholder="Amount"
                  className="col-span-3"
                  name="amount"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <label htmlFor="" className="text-xs sm:text-sm md:text-base ">
                  Recived Date
                </label>
                <Input
                  placeholder="date"
                  type="date"
                  className="col-span-3"
                  name="date"
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 items-center ">
                <Button className="bg-green-500 text-lg w-full">
                  Add Income
                </Button>
                <Button
                  className="bg-gray-500 text-lg w-full"
                  type="button"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function Category({ setFormData, formData }: any) {
  const category = [
    "shopping",
    "foods",
    "clothes",
    "bills",
    "hospital",
    "other",
  ];
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    setFormData({ ...formData, category: value });
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : "Select a Category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {category.map((cate) => (
              <CommandItem
                key={cate}
                value={cate}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === cate ? "opacity-100" : "opacity-0"
                  )}
                />
                {cate}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

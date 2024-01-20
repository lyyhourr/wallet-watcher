"use client";
import { CreateTransaction } from "@/components/actions/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fontHeader } from "@/fonts/Fonts";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CategorySelector from "../CategorySelector";
import { useRouter } from "next/navigation";
import { expenseCategories } from "../Category-Icons";

const initialData = {
  type: "expense",
  amount: "",
  date: "",
  description: "",
  category: "",
};

export default function AddExpense() {
  const [formData, setFormData] = useState(initialData);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validation = () => {
    const amount = Number(formData.amount);
    if (!formData.amount.length) {
      toast.error("empty amount!");
    } else if (isNaN(amount)) {
      toast.error("amount must be number");
      return false;
    } else if (amount < 0) {
      toast.error("amunt cant be negative number");
      return false;
    } else if (!formData.date) {
      toast.error("select a date");
      return false;
    } else if (!formData.category) {
      toast.error("select a category");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validate = validation();
    if (validate) {
      const actions = await CreateTransaction(formData);
      if (actions) {
        toast.success("expense added succesfully");
        setOpenDialog(false);
        router.refresh();
      } else {
        toast.error("add failed");
      }
    }
  };

  return (
    <Dialog onOpenChange={setOpenDialog} open={openDialog}>
      <DialogTrigger className="bg-red-500 px-2 py-1 sm:px-4 text-lg sm:py-2 text-white rounded-md">
        Add Expense
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-3">
        <DialogHeader className={`${fontHeader.className} text-2xl `}>
          Add Expense
        </DialogHeader>
        <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
            <label htmlFor="" className="text-sm md:text-base">
              Category
            </label>
            <CategorySelector
              formData={formData}
              setFormData={setFormData}
              category={expenseCategories}
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
          <div className="grid grid-cols-4 items-center">
            <label htmlFor="" className="text-sm md:text-base">
              Description
            </label>
            <Input
              placeholder="Description"
              className="col-span-3"
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 items-center ">
            <Button className="bg-red-500 text-lg w-full">Add Expense</Button>
            <DialogClose asChild>
              <Button className="bg-gray-500 text-lg w-full" type="button">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

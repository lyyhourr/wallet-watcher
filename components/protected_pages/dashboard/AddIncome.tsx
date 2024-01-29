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
import { fontHeader } from "@/fonts/Fonts";
import React, { useState } from "react";
import { CreateTransaction } from "@/components/actions/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CategorySelector from "../CategorySelector";
import { incomeCategories } from "../Category-Icons";

const initialData = {
  type: "income",
  amount: "",
  date: "",
  description: "",
  category: "",
};

export default function AddIncome() {
  const [formData, setFormData] = useState(initialData);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      toast.error("empty date");
      return false;
    } else if (!formData.category) {
      toast.error("select a category");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const check = validation();
    if (check) {
      const actions = await CreateTransaction(formData);
      if (actions) {
        toast.success("add successfully");
        setOpenDialog(false);
        router.refresh();
      } else {
        toast.error("add failed");
      }
    }
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
              defaultValue={""}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center">
            <label htmlFor="" className="text-xs sm:text-sm md:text-base ">
              Category
            </label>
            <CategorySelector
              formData={formData}
              setFormData={setFormData}
              category={incomeCategories}
            />
          </div>
          <div className="grid grid-cols-4 items-center">
            <label htmlFor="" className="text-xs sm:text-sm md:text-base ">
              Recived Date
            </label>
            <Input
              placeholder="date"
              defaultValue={""}
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
              placeholder="Description (optional)"
              className="col-span-3"
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 items-center ">
            <Button className="bg-green-500 text-lg w-full">Add Income</Button>
            <DialogClose asChild>
              <Button className="bg-gray-500 text-lg w-full">Cancel</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

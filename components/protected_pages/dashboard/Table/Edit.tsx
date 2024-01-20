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
import { TDataTest } from "@/types/types";
import React, { useState } from "react";
import CategorySelector, { IFormData } from "../../CategorySelector";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Edit(props: IFormData) {
  const initialData = {
    amount: props.amount,
    date: props.date,
    category: props.category,
    description: props.description ? props.description : "",
  };
  const [formData, setFormData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validation = () => {
    const amount = Number(formData.amount);
    if (!formData.amount) {
      toast.error("amount can't be empty!");
      return false;
    } else if (isNaN(amount)) {
      toast.error("amount must be number");
      return false;
    } else if (amount < 0) {
      toast.error("amount can't be negative number");
    } else if (!formData.date) {
      toast.error("date can't be empty");
    } else {
      return true;
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const validate = validation();
    if (validate) {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase
        .from("transactions")
        .update([
          {
            amount: formData.amount,
            date: formData.date,
            description: formData.description,
            category: formData.category,
          },
        ])
        .eq("id", props.id);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("transaction updated");
        setOpen(false);
        router.refresh();
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="py-1 w-[70px]  bg-card-blue rounded-md text-white">
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className={`${fontHeader.className} text-3xl`}>
          Edit Expense
        </DialogHeader>
        <form
          action=""
          className="flex flex-col gap-4 "
          onSubmit={handleUpdate}
        >
          <div className="grid grid-cols-4 items-center ">
            <label htmlFor="" className="text-xs sm:text-sm md:text-base ">
              amount
            </label>
            <Input
              placeholder="expense"
              name="amount"
              defaultValue={props.amount}
              className="col-span-3"
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
              category={["salary", "bonus", "other"]}
              defaultValue={props.category}
            />
          </div>
          <div className="grid grid-cols-4 items-center ">
            <label htmlFor="" className="text-xs sm:text-sm md:text-base ">
              date
            </label>
            <Input
              placeholder="expense"
              type="date"
              name="date"
              defaultValue={props.date}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center ">
            <label htmlFor="" className="text-xs sm:text-sm md:text-base ">
              description
            </label>
            <Textarea
              placeholder="description..."
              name="description"
              defaultValue={props.description}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center gap-5 w-full">
            <Button className="bg-card-green w-full text-lg">Update</Button>
            <DialogClose asChild>
              <Button type="button" className="w-full text-lg bg-gray-400">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

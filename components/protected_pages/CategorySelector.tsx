"use client";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "@/lib/utils";

export interface IFormData {
  id?: string | number;
  type?: string;
  amount?: string;
  date?: string;
  description?: string;
  category?: string;
}

interface ICategorySelector {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  category: string[];
  defaultValue?: string;
}

export default function CategorySelector({
  setFormData,
  formData,
  category,
  defaultValue,
}: ICategorySelector) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

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
          className="w-[250px] justify-between"
        >
          {value ? value : "Select a Category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search Category..." />
          <CommandEmpty>No Category found.</CommandEmpty>
          <CommandGroup className="h-[200px] overflow-auto">
            {category.map((cate) => (
              <CommandItem
                key={cate}
                value={cate}
                onSelect={() => {
                  setValue(cate);
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

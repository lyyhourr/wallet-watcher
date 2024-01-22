"use client";
import { IFormData } from "@/components/protected_pages/CategorySelector";
import HistoryFilter from "@/components/protected_pages/history/History-Filter";
import HistoryTable from "@/components/protected_pages/history/History-Table";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
export default function DashbaordHistory() {
  const [data, setData] = useState<IFormData[]>();
  return (
    <div className="bg-white rounded-lg h-full flex gap-2">
      <section className="h-full">
        <div className=" h-full hidden xl:block  bg-slate-50 rounded-md w-[400px] p-5">
          <HistoryFilter data={data} setData={setData} />
        </div>
      </section>
      <section className="h-full w-full">
        <Drawer>
          <DrawerTrigger className="bg-card-green xl:hidden px-5 py-2 rounded-lg text-white">
            Filter
          </DrawerTrigger>
          <DrawerContent>
            <div className="w-[350px] mx-auto px-2 py-3 sm:w-2/3 ">
              <HistoryFilter data={data} setData={setData} />
            </div>
          </DrawerContent>
        </Drawer>
        <div className="h-full flex items-center justify-center bg-slate-50">
          <HistoryTable tableData={data} />
        </div>
      </section>
    </div>
  );
}

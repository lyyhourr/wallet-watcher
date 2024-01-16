"use client"
import { fontHeader } from "@/fonts/Fonts";
import HistoryFilter from "@/components/protected_pages/history/History-Filter";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
export default function DashbaordHistory() {


  return <div className="bg-white rounded-lg h-full flex gap-2">
    <section className="h-full">
      <div className=" h-full hidden xl:block  bg-slate-100 rounded-md w-[400px] p-2">
        <HistoryFilter />
      </div>

    </section>
    <section className="h-full w-full">
      <Drawer>
        <DrawerTrigger className="bg-card-green xl:hidden px-5 py-2 rounded-lg text-white">Filter</DrawerTrigger>
        <DrawerContent>
          <div className="w-[350px] mx-auto px-2 py-3 sm:w-2/3 ">
            <HistoryFilter />
          </div>
        </DrawerContent>
      </Drawer>
      <p className="text-center text-5xl">Query Result</p>
    </section>

  </div>;
}

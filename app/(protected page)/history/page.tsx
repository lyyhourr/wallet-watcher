"use client"
import { fontHeader } from "@/fonts/Fonts";
import HistoryFilter from "@/components/protected_pages/history/History-Filter";
export default function DashbaordHistory() {


  return <div className="bg-white rounded-lg h-full flex gap-2">
    <section className="h-full bg-slate-100 rounded-md w-[500px] flex flex-col p-5 gap-12">
      <HistoryFilter />

    </section>
    <section className="h-full border-2 w-full">
      <p className="text-center text-5xl">Query Result</p>
    </section>

  </div>;
}

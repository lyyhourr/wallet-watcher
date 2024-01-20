import HistoryFilter from "@/components/protected_pages/history/History-Filter";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
export default function DashbaordHistory() {
  return (
    <div className="bg-white rounded-lg h-full flex gap-2">
      <section className="h-full">
        <div className=" h-full hidden xl:block  bg-slate-50 rounded-md w-[400px] p-5">
          <HistoryFilter />
        </div>
      </section>
      <section className="h-full w-full">
        <Drawer>
          <DrawerTrigger className="bg-card-green xl:hidden px-5 py-2 rounded-lg text-white">
            Filter
          </DrawerTrigger>
          <DrawerContent>
            <div className="w-[350px] mx-auto px-2 py-3 sm:w-2/3 ">
              <HistoryFilter />
            </div>
          </DrawerContent>
        </Drawer>
        <div className="h-full flex items-center justify-center bg-slate-50">
          <p className="text-5xl ">Query Result</p>
        </div>
      </section>
    </div>
  );
}

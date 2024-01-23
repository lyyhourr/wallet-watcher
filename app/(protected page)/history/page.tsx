"use client";
import { IFormData } from "@/components/protected_pages/CategorySelector";
import HistoryFilter from "@/components/protected_pages/history/History-Filter";
import HistoryTable from "@/components/protected_pages/history/History-Table";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
export default function DashbaordHistory() {
  const [Alldata, setAllData] = useState<IFormData[]>();
  const [tableData, setTableData] = useState<IFormData[]>();

  const [openDrawer, setOpenDrawer] = useState(false);
  const supabase = createClientComponentClient();
  React.useEffect(() => {
    const FetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user?.id);
      setAllData(data ? data : []);
      setTableData(data ? data : []);
    };
    FetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg h-full flex gap-2">
      <section className="h-full">
        <div className=" h-full hidden xl:block  bg-slate-50 rounded-md w-[400px] p-5">
          <HistoryFilter
            Alldata={Alldata}
            tableData={tableData}
            setTableData={setTableData}
            setOpenDrawer={setOpenDrawer}
          />
        </div>
      </section>
      <section className="h-full w-full">
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
          <DrawerTrigger className="bg-card-green xl:hidden px-5 py-2 rounded-lg text-white">
            Filter
          </DrawerTrigger>
          <DrawerContent>
            <div className="w-[350px] mx-auto px-2 py-3 sm:w-2/3 ">
              <HistoryFilter
                Alldata={Alldata}
                tableData={tableData}
                setTableData={setTableData}
                setOpenDrawer={setOpenDrawer}
              />
            </div>
          </DrawerContent>
        </Drawer>
        <div className="h-full flex items-center justify-center bg-slate-50">
          <HistoryTable tableData={tableData} />
        </div>
      </section>
    </div>
  );
}

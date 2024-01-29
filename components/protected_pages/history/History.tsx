"use client";
import { IFormData } from "@/components/protected_pages/CategorySelector";
import HistoryFilter from "@/components/protected_pages/history/History-Filter";
import HistoryTable from "@/components/protected_pages/history/History-Table";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
export default function History() {
    const [tableData, setTableData] = useState<IFormData[]>();
    const [userId, setUserId] = useState("")
    const [openDrawer, setOpenDrawer] = useState(false);
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const FetchData = async () => {
            setLoading(true)
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUserId(user ? user.id : "")
            const { data } = await supabase
                .from("transactions")
                .select("*")
                .eq("user_id", user?.id);
            setTableData(data ? data : []);
            setLoading(false)

        };
        FetchData();
    }, [supabase]);

    return (
        <div className="bg-white rounded-lg h-full flex gap-2">
            <section className="h-full">
                <div className=" h-full hidden xl:block  bg-slate-50 rounded-md w-[400px] p-5">
                    <HistoryFilter
                        setTableData={setTableData}
                        setOpenDrawer={setOpenDrawer}
                        userId={userId}
                        setLoading={setLoading}
                        tableData={tableData}
                    />
                </div>
            </section>
            <section className="h-full w-full">
                <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
                    <DrawerTrigger asChild className="flex w-full justify-end py-1">
                        <div>
                            <button className="bg-card-green xl:hidden px-5 py-1 text-lg  rounded-lg text-white">Filter</button>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="w-[350px] mx-auto px-2 py-3 sm:w-2/3 ">
                            <HistoryFilter
                                setTableData={setTableData}
                                setOpenDrawer={setOpenDrawer}
                                setLoading={setLoading}
                                userId={userId}
                                tableData={tableData}
                            />
                        </div>
                    </DrawerContent>
                </Drawer>
                <div className="h-full flex  justify-center bg-slate-50">
                    <HistoryTable tableData={tableData} loading={loading} />
                </div>
            </section>
        </div>
    );
}

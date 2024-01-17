import { fontHeader } from "@/fonts/Fonts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

export default async function UserInfo() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { user }, error } = await supabase.auth.getUser()
  console.log(user?.email)

  return <div className="flex justify-center items-center h-full">
    <p className={` text-2xl`}>User :  {user?.email}</p>
  </div>;
}

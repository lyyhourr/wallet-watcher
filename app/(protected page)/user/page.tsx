import { fontHeader } from "@/fonts/Fonts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React, { use } from "react";

export default async function UserInfo() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { user }, error } = await supabase.auth.getUser()
  const name = user?.email?.slice(0, user.email.indexOf("@"))

  return <div className="">
    <p className={` text-2xl mt-10 text-center`}>{name} Information</p>

    <div className="flex  mt-20 flex-col gap-5">

      <div className="flex items-center ">
        <p className="w-[70px]">Email :</p>
        <p>{user?.email}</p>
      </div>
      <div className="flex items-center ">
        <p className="w-[70px]">Name :</p>
        <p>name: {name} </p>
      </div>
    </div>
  </div>;
}

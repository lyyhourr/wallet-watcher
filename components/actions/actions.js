"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function CreateIncome(formData) {
  const cookieStore = cookies();
  const category = formData.get("category");
  const amount = formData.get("amount");
  const date = formData.get("date");
  const type = formData.get("type");
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.from("income").insert([
    {
      user_id: user.id,
      category,
      amount,
      type,
      date,
    },
  ]);
  if (error) {
    console.log("add error");
  }
  return { message: "Pleaseeeee work" };
}

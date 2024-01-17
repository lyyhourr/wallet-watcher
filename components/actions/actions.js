"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function CreateIncome(formData) {
  const cookieStore = cookies();
  const { category, amount, date, type } = formData;
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  const { data, error } = await supabase.from("income").insert([
    {
      user_id: user.id,
      category,
      amount,
      type,
      date,
    },
  ]);
  console.log(data);
  if (error) {
    console.log(error.message);
  }
  return true;
}

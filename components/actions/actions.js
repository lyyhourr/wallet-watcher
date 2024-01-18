"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function CreateTransaction(formData) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { description, amount, date, type, category } = formData;
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  const { data, error } = await supabase.from("transactions").insert([
    {
      user_id: user.id,
      description,
      amount,
      date,
      type,
      category,
    },
  ]);
  if (error) {
    console.log(error);
    return false;
  }
  return true;
}

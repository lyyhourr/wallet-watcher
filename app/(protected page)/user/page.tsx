import About from "@/components/protected_pages/user/About";
import UpdateUser from "@/components/protected_pages/user/UpdateUser";
import { inter } from "@/fonts/Fonts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { MapPinIcon } from "lucide-react";
import { cookies } from "next/headers";
import { FaEarthAmericas } from "react-icons/fa6";
import Password from "@/components/protected_pages/user/Password";
import ResetData from "@/components/protected_pages/user/ResetData";
import DeleteAccount from "@/components/protected_pages/user/DeleteAccount";
import UserAvatar from "@/components/protected_pages/user/User-Avatar";

export default async function UserInfo() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const name = user?.email?.slice(0, user.email.indexOf("@"));
  const joinDate = user?.created_at.slice(0, user?.created_at.indexOf("T"))

  return (
    <div className="">
      <p className={` text-2xl mt-10 text-center`}>Account Information</p>
      <main className="w-full flex gap-2 py-3 flex-col xl:flex-row">
        <section className="  w-full h-full flex flex-col gap-4 px-3 py-2">
          <div className="bg-slate-50 rounded-2xl border-slate-200 border-2 flex flex-col gap-6 p-5">
            <div className="flex w-full justify-between">
              <p className={`${inter.className} text-xl`}>Your Profile</p>
              <p className="text-gray-500"> Joined &nbsp; {joinDate}</p>
            </div>
            <div className="w-full">
              <UserAvatar userId={user ? user.id : ""} />
            </div>
            <div className="flex w-full justify-between">
              <p>{name}</p>
              <UpdateUser defaultValue={name} column="username" />
            </div>
            <div className="flex w-full justify-between">
              <p>Male</p>
              <UpdateUser defaultValue="Male" column="gender" select />
            </div>
            <div className="flex w-full justify-between">
              <p>15/Sep/02</p>
              <UpdateUser defaultValue={"15/Sep/02"} column="dob" date />
            </div>
            <div className="flex w-full justify-between">
              <p>023880880</p>
              <UpdateUser defaultValue={"023880880"} column="phone number" />
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl border-slate-200 border-2 flex flex-col gap-6 p-5">
            <div className="flex w-full flex-col gap-5">
              <p className={`${inter.className} text-xl`}>Emails</p>
              <p className="text-gray-500"> {user?.email}</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl border-slate-200 border-2 flex flex-col gap-6 p-5">
            <About defaultValue="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae accusantium voluptate, tempore expedita placeat, delectus laudantium quas quidem rem adipisci labore iure quod, atque sequi facere similique tempora repellat repellendus!" />
          </div>
        </section>
        <section className=" w-full h-full flex flex-col gap-4 px-3 py-2">
          <div className="bg-slate-50 rounded-2xl border-slate-200 border-2 flex flex-col gap-6 p-5">
            <div className="flex w-full flex-col gap-5">
              <p className={`${inter.className} text-xl`}>Address</p>
              <div className="flex w-full justify-between">
                <div className="flex gap-2">
                  <FaEarthAmericas className="text-lg w-[30px]" />
                  <p>Cambodia</p>
                </div>
                <UpdateUser defaultValue="Cambodia" column="city" />
              </div>
              <div className="flex w-full justify-between">
                <div className="flex gap-2">
                  <MapPinIcon className="text-lg w-[30px]" />
                  <p>Phnom Penh</p>
                </div>
                <UpdateUser defaultValue="Phnom Penh" column="city" />
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl border-slate-200 border-2 h-full flex flex-col gap-6 p-5">
            <div className="flex w-full flex-col gap-5">
              <p className={`${inter.className} text-xl`}>Account Settings</p>
              <div className="flex flex-col gap-3">
                <p>Password</p>
                <Password />
              </div>
              <div className="flex justify-between gap-3 flex-col sm:flex-row">
                <p className="text-red-500 text-xl font-semibold">Danger Zone</p>

                <div className="flex items-center gap-3">
                  <ResetData />
                  <DeleteAccount />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

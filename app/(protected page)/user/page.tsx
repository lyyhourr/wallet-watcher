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
import { cn } from "@/lib/utils";

const FetchData = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const { data } = await supabase.from("user_info").select("*").eq("user_id", user?.id)

  const respone = await supabase.from("auth").select("*")
  console.log(respone)

  const { username, gender, dob, phonenumber, country, city, about } = data?.length && data[0]

  return { data, user, username, gender, dob, phonenumber, country, city, about }
}

export default async function UserInfo() {
  const { data, user, username, gender, dob, phonenumber, country, city, about } = await FetchData()
  const joinDate = user?.created_at.slice(0, user?.created_at.indexOf("T"))

  const name = username?.length ? username : "no username added";
  const gen = gender?.length ? gender : "no gender added"
  const dateOfBirth = dob?.length ? dob : "no DOB added"
  const phoneNumber = phonenumber?.length ? phonenumber : "no phone number added"
  const Country = country?.length ? country : "no country added"
  const City = city?.length ? city : "no city added"
  const AboutUser = about?.length ? about : "no  about added"

  return (
    <div className="">
      <p className={` text-2xl mt-10 text-center`}>Account Information</p>
      <main className="w-full flex gap-2 py-3 flex-col xl:flex-row">
        <section className="  w-full h-full flex flex-col gap-4 px-3 py-2">
          <div className="bg-slate-50 rounded-2xl border-slate-200 border-2 flex flex-col gap-6 p-5">
            <div className="flex w-full justify-between items-center">
              <p className={`${inter.className} text-xl`}>Your Profile</p>
              <p className="text-gray-500 text-sm"> Joined&nbsp;{joinDate}</p>
            </div>
            <div className="w-full">
              <UserAvatar userId={user ? user.id : ""} />
            </div>
            <div className="flex w-full justify-between">
              <p className={cn(!username?.length && "text-gray-600")}>{name}</p>
              <UpdateUser defaultValue={name} column="username" userId={user ? user.id : ""} />
            </div>
            <div className="flex w-full justify-between">
              <p className={cn(!gender?.length && "text-gray-600")}>{gen}</p>
              <UpdateUser defaultValue={gen} column="gender" select userId={user ? user.id : ""} />
            </div>
            <div className="flex w-full justify-between">
              <p className={cn(!dob?.length && "text-gray-600")}>{dateOfBirth} {dob?.length && `( dob )`}</p>
              <UpdateUser defaultValue={dateOfBirth} column="dob" date userId={user ? user.id : ""} />
            </div>
            <div className="flex w-full justify-between">
              <p className={cn(!phonenumber?.length && "text-gray-500 ")}>{phoneNumber}</p>
              <UpdateUser defaultValue={phoneNumber} column="phonenumber" userId={user ? user.id : ""} />
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl border-slate-200 border-2 flex flex-col gap-6 p-5">
            <div className="flex w-full flex-col gap-5">
              <p className={`${inter.className} text-xl`}>Emails</p>
              <p className="text-gray-500"> {user?.email}</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl border-slate-200 border-2 flex flex-col gap-6 p-5">
            <About defaultValue={AboutUser} userId={user?.id ? user?.id : ""} />
          </div>
        </section>
        <section className=" w-full h-full flex flex-col gap-4 px-3 py-2">
          <div className="bg-slate-50 rounded-2xl border-slate-200 border-2 flex flex-col gap-6 p-5">
            <div className="flex w-full flex-col gap-5">
              <p className={`${inter.className} text-xl`}>Address</p>
              <div className="flex w-full justify-between">
                <div className="flex gap-2">
                  {
                    country?.length ?
                      <>
                        <FaEarthAmericas className="text-lg w-[30px]" />
                        <p>{Country}</p>
                      </>
                      :
                      <p className={cn(!country?.length && "text-gray-600")}>{Country}</p>

                  }
                </div>
                <UpdateUser defaultValue={Country} column="country" userId={user ? user.id : ""} />
              </div>
              <div className="flex w-full justify-between">
                <div className="flex gap-2">
                  {
                    city?.length ?
                      <>
                        <MapPinIcon className="text-lg w-[30px]" />
                        <p>{City}</p>
                      </>
                      :
                      <p className={cn(!city?.length && "text-gray-600")}>{City}</p>


                  }

                </div>
                <UpdateUser defaultValue={City} column="city" userId={user ? user.id : ""} />
              </div>
            </div>
          </div>
          <div className="bg-red-100 rounded-2xl border-red-400 border-2 h-full flex flex-col gap-6 p-5">
            <div className="flex w-full flex-col gap-5">
              <p className={`${inter.className} text-xl text-red-600`}>Danger Zone</p>
              <div className="flex gap-3 flex-col sm:flex-row sm:items-center sm:justify-around">
                <Password />
                <ResetData />
                <DeleteAccount />
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

import { fontHeader, fontHero, inter } from "@/fonts/Fonts";
import Image from "next/image";
import Link from "next/link";


const features = [
  {
    feature: "Expense Tracking",
    image: "income.png",
    description: "Log your income and expenses effortlessly, categorized for easy management.",
  },
  {
    feature: "Goal Setting",
    image: "income.png",
    description: "Set and monitor your financial goals, whether it's saving for a vacation or paying off debt.",
  },
  {
    feature: "Query and Sorting",
    image: "income.png",
    description: "Dive deep into your financial data with the ability to query by day, month, year, and category. Sort your data based on your preferences, whether it's the highest, lowest, oldest, or latest.",
  },
  {
    feature: "Account Management",
    image: "income.png",
    description: "Securely manage your account with features like password change, recovery, and account deletion. Your privacy and security are our top priorities.",
  },
]

export default function Home() {
  return (
    <main className="flex flex-col px-5 gap-10 text-secondary-color pt-5 sm:pt-10 ">
      <section className="w-full grid  lg:grid-cols-2 h-full">
        <div className="flex gap-10 md:gap-4 flex-col h-full  ">
          <div className="flex flex-col gap-10">
            <p
              className={`${fontHero.className} text-7xl   md:text-8xl xl:text-9xl  sm:text-start`}
            >
              Feeling the
              <span className="text-primary-color"> Financial </span> Pressure ?
            </p>
            <p className={`${fontHero.className} hidden md:block text-3xl lg:text-4xl `}>
              Let us help you take control of your
              <span className="text-primary-color text-4xl lg:text-5xl">
                {" "}
                finances
              </span>{" "}
              .
            </p>
          </div>
          <div className=" hidden md:flex h-full items-center  ">
            <Link
              href={"/dashboard"}
              className="text-white bg-primary-color hover:bg-slate-900 rounded-md text-xl px-14 py-6"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className=" flex items-start justify-center">
          <Image
            src={"/images/home_page/woman-stressing.png"}
            width={100000}
            height={100000}
            alt="hero img"
            className="w-[500px]  xl:w-[650px]"
          />
        </div>
        <div className="flex flex-col gap-3">

          <div className="flex flex-col gap-10">
            <p className={`${fontHero.className}  md:hidden text-3xl lg:text-4xl `}>
              Let us help you take control of your
              <span className="text-primary-color text-4xl lg:text-5xl">
                {" "}
                finances
              </span>{" "}
              .
            </p>
          </div>
          <div className=" flex md:hidden  ">
            <Link
              href={"/dashboard"}
              className="text-white bg-primary-color hover:bg-slate-900 rounded-md text-xl px-14 py-6"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 pb-28">
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <p className={`${fontHero.className} text-7xl`}>our features</p>
          <p className="text-sm lg:text-balance md:text-base">At Wallet-Watcher,our mission is to simplify your financial management experience. We believe that understanding and controlling your finances should be accessible to everyone.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ">
          {
            features.map((item: any, i: number) => (
              <div className="flex flex-col gap-3  place-items-center" key={i}>
                <Image
                  src={`/images/${item.image}`}
                  width={100000}
                  height={100000}
                  alt=""
                  className="rounded-md w-[200px] "
                />
                <p className={`${inter.className} text-xl`}>{item.feature}</p>
                <p className="lg:w-2/3 text-sm">{item.description}</p>
              </div>
            ))
          }


        </div>
      </section>

    </main>
  );
}

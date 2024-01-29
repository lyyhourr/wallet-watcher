import { fontHeader, fontHero, inter } from "@/fonts/Fonts";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    feature: "Expense Tracking",
    image: "income.png",
    description:
      "Log your income and expenses effortlessly, categorized for easy management.",
  },
  {
    feature: "Goal Setting",
    image: "goal.png",
    description:
      "Set and monitor your financial goals, whether it's saving for a vacation or paying off debt.",
  },
  {
    feature: "Filter and Sorting",
    image: "querysorting.png",
    description:
      "Dive deep into your financial data with the ability to filter by day, month, year, and category.",
  },
  {
    feature: "Account Management",
    image: "accountmanagement.png",
    description:
      "Securely manage your account with features like password change, recovery, and account deletion.",
  },
];
const steps = [
  {
    title: "Login",
    image: "login.png",
    description:
      "Start by securely logging into your personalized account. Your financial dashboard awaits, tailored just for you.",
  },
  {
    title: "Start Tracking",
    image: "tracking.png",
    description:
      "Manage your expenses using our user-friendly app. Input your expenditures, categorize transactions, and stay in control wherever you are.",
  },
  {
    title: "Update Your Profile",
    image: "updatepf.png",
    description:
      "Keep your information current to unlock the latest features aligned with your financial goals.",
  },
];

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
            <p
              className={`${fontHero.className} hidden md:block text-3xl lg:text-4xl `}
            >
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
            <p
              className={`${fontHero.className}  md:hidden text-3xl lg:text-4xl `}
            >
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
      <section className="flex justify-center items-center w-full gap-5 flex-col md:flex-row">
        {steps.map((item: any, i: number) => (
          <div
            className=" w-full  bg-white shadow-lg rounded-xl p-5 flex flex-col gap-3 h-[550px]"
            key={i}
          >
            <p className={`${fontHero.className} text-5xl text-center`}>
              Step {i + 1}{" "}
            </p>
            <div className="flex justify-center ">
              <Image
                src={`/images/${item.image}`}
                width={10000}
                height={10000}
                alt=""
                className="w-[300px] object-cover"
              />
            </div>
            <p className={`${fontHero.className} text-4xl text-center `}>
              {item.title}{" "}
            </p>
            <p className="w-[90%] text-sm sm:text-base">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4 ">
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <p className={`${fontHero.className} text-7xl`}>our features</p>
          <p className="text-sm lg:text-balance md:text-base">
            At Wallet-Watcher,our mission is to simplify your financial
            management experience. We believe that understanding and controlling
            your finances should be accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-10 ">
          {features.map((item: any, i: number) => (
            <div className="flex flex-col gap-3  place-items-center" key={i}>
              <Image
                src={`/images/${item.image}`}
                width={100000}
                height={100000}
                alt=""
                className="rounded-md w-[200px] "
              />
              <p className={`${inter.className} text-xl`}>{item.feature}</p>
              <p className="lg:w-2/3 text-xs sm:text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

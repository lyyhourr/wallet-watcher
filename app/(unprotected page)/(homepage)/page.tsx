import { fontHero } from "@/fonts/Fonts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col px-5 md:h-screen text-secondary-color ">
      <div className="w-full grid  lg:grid-cols-2 h-full">
        <div className="flex gap-10 md:gap-0 md:justify-evenly flex-col h-full  ">
          <div className="flex flex-col gap-10">
            <p
              className={`${fontHero.className} text-7xl   md:text-8xl xl:text-9xl text-center sm:text-start`}
            >
              Feeling the
              <span className="text-primary-color"> Financial </span> Pressure ?
            </p>
            <p className={`${fontHero.className} text-3xl lg:text-4xl `}>
              Let us help you take control of your
              <span className="text-primary-color text-4xl lg:text-5xl">
                {" "}
                finances
              </span>{" "}
              .
            </p>
          </div>
          <div className="flex justify-center md:justify-start ">
            <Link
              href={"/dashboard"}
              className="text-white bg-primary-color hover:bg-slate-900 rounded-md text-xl px-14 py-6"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <Image
            src={"/images/home_page/woman-stressing.png"}
            width={100000}
            height={100000}
            alt="hero img"
            className="w-[500px]  xl:w-[650px]"
          />
        </div>
      </div>
      <p className="text-center  py-10 text-1">more contents</p>
    </main>
  );
}

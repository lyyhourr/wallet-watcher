import { fontHeader } from "@/fonts/Fonts";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IAuthLayout {
  image: string;
  title: string;
  subTitle: string;
  route: {
    href: string;
    title: string;
  };
  children: React.ReactNode;
  footerTitle: string;
}

export default function AuthLayout(props: IAuthLayout) {



  return (
    <main className="h-screen grid bg-main lg:grid-cols-5 overflow-hidden">
      <section className="hidden  border-black border-2 w-full col-span-2 lg:flex items-center bg-white justify-center ">
        <Image
          src={props.image}
          width={10000}
          height={1000}
          alt="sign in image"
          className="w-[600px]"
        />
      </section>
      <section className="w-full h-full border-2 border-black lg:col-span-3  ">
        <div className="flex flex-col justify-between h-full px-5 py-8">
          <Link
            className="text-black flex text-lg items-center  group"
            href={props.route.href}
          >
            <div className="group-hover:-translate-x-1 duration-300">
              <ArrowLeft />
            </div>
            <span>{props.route.title}</span>
          </Link>
          <div></div>
          <div className="flex flex-col gap-10 items-center  justify-center">
            <h1 className={`${fontHeader.className} text-7xl tracking-wide`}>
              {props.title}
            </h1>
            <h5 className={`${fontHeader.className} text-xl `}>
              {props.subTitle}
            </h5>
            {props.children}
          </div>
          <div className="text-xs sm:text-base md:w-[550px] mx-auto">
            <p className="text-gray-600  ">
              By {props.footerTitle}, I have read and I understand and agree to,
              The [web name]{" "}
              <span className="text-black underline">Term of Use</span> and{" "}
              <span className="text-black underline">Privacy Policy (CAM)</span>{" "}
              or{" "}
              <span className="text-black underline">Privacy Policy (US)</span>{" "}
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

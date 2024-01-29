import { fontHero } from "@/fonts/Fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center gap-1">
      <Image
        src={"/images/main-logo.png"}
        width={10000}
        height={10000}
        alt="logo"
        className="w-[60px] h-[60px]"
      />
      <p className={`${fontHero.className} text-2xl uppercase `}>
        Wallet watcher
      </p>
    </Link>
  );
}

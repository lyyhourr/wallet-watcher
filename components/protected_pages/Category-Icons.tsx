import { AiOutlineInsurance } from "react-icons/ai";
import {
  FaHandHoldingDollar,
  FaHouse,
  FaInternetExplorer,
  FaMoneyBillTrendUp,
} from "react-icons/fa6";
import { IoMdBuild } from "react-icons/io";
import {
  MdBusinessCenter,
  MdOutlineCarRental,
  MdOutlineEmojiTransportation,
  MdOutlineLocalGroceryStore,
  MdOutlineSubscriptions,
  MdOutlineTravelExplore,
  MdPayments,
} from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { SiDcentertainment, SiFreelancer } from "react-icons/si";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { TbHealthRecognition } from "react-icons/tb";
import { GiClothes, GiLoveMystery, GiLovers } from "react-icons/gi";
import { BiBookReader, BiMoneyWithdraw } from "react-icons/bi";
import { CiBurger, CiGift } from "react-icons/ci";
import { LiaChildSolid, LiaMoneyBillAlt } from "react-icons/lia";
import { PiDotsThreeCircleVerticalLight } from "react-icons/pi";

export const expenseCategories = [
  "Housing/Renting",
  "Utilities",
  "Groceries",
  "Transportation",
  "Insurance",
  "Loan Payments",
  "Taxes",
  "Healthcare",
  "Entertainment",
  "Internet and Phone",
  "Clothing",
  "Personal Care",
  "Investments",
  "Education",
  "Gifts/Donations",
  "Travel",
  "Childcare",
  "Subscriptions",
  "other",
  "foods",
];
export const incomeCategories = [
  "Salary",
  "Bonus",
  "Tips",
  "Rental",
  "Retirement",
  "Freelance/Contract",
  "Business",
  "other",
];
export const IconHandler = (cate: string) => (
  <span>
    {/* expenses */}
    {cate === "Housing/Renting" && <FaHouse />}
    {cate === "Utilities" && <IoMdBuild />}
    {cate === "Groceries" && <MdOutlineLocalGroceryStore />}
    {cate === "Transportation" && <MdOutlineEmojiTransportation />}
    {cate === "Insurance" && <AiOutlineInsurance />}
    {cate === "Loan Payments" && <MdPayments />}
    {cate === "Taxes" && <HiOutlineReceiptTax />}
    {cate === "Healthcare" && <TbHealthRecognition />}
    {cate === "Entertainment" && <SiDcentertainment />}
    {cate === "Internet and Phone" && <FaInternetExplorer />}
    {cate === "Clothing" && <GiClothes />}
    {cate === "Personal Care" && <GiLovers />}
    {cate === "Investments" && <FaMoneyBillTrendUp />}
    {cate === "Education" && <BiBookReader />}
    {cate === "Gifts/Donations" && <CiGift />}
    {cate === "Travel" && <MdOutlineTravelExplore />}
    {cate === "Childcare" && <LiaChildSolid />}
    {cate === "Subscriptions" && <MdOutlineSubscriptions />}
    {cate === "other" && <PiDotsThreeCircleVerticalLight />}
    {cate === "foods" && <CiBurger />}

    {/* incomes */}
    {cate === "Salary" && <RiMoneyDollarCircleLine />}
    {cate === "Bonus" && <BiMoneyWithdraw />}
    {cate === "Tips" && <LiaMoneyBillAlt />}
    {cate === "Rental" && <MdOutlineCarRental />}
    {cate === "Retirement" && <FaHandHoldingDollar />}
    {cate === "Freelance/Contract" && <SiFreelancer />}
    {cate === "Business" && <MdBusinessCenter />}
  </span>
);

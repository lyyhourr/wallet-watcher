import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
export default function DashboardLoading() {
  return (
    <div className="h-screen flex justify-center items-center gap-4">
      <AiOutlineLoading className="text--blue-600 text-2xl animate-spin" />
      <p>Loading...</p>
    </div>
  );
}

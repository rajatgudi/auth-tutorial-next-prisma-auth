import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import React from "react";
import { FaCheckDouble } from "react-icons/fa";
interface FormSuccessProps {
  message?: string;
}
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div
      className="bg-emerald-100 p-3 rounded-md
    flex items-center gap-x-2 text-sm text-destructive
    "
    >
      <FaCheckDouble className="h-5 w-5 text-green-600" />
      <p className={cn("text-green-600", font.className)}>{message}</p>
    </div>
  );
};

export default FormSuccess;

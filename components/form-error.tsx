import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
interface FormErrorProps {
  message?: string;
}
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div
      className="bg-destructive/15 p-3 rounded-md
    flex items-center gap-x-2 text-sm text-destructive
    "
    >
      <FaExclamationTriangle className="h-4 w-4" />
      <p className={cn("", font.className)}>{message}</p>
    </div>
  );
};

export default FormError;
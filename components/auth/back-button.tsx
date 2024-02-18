"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
interface BackButtonProps {
  label: string;
  url: string;
}
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const BackButton = ({ label, url }: BackButtonProps) => {
  return (
    <Button
      className={cn("font-normal w-full", font.className)}
      size={"sm"}
      variant={"link"}
    >
      <Link href={url}>{label}</Link>
    </Button>
  );
};

export default BackButton;

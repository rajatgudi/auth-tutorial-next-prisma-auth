"use client";

import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export default function Home() {
  return (
    <main
      className="flex h-full flex-col items-center justify-center 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"
    >
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔐Auth
        </h1>
        <p className={cn("text-white text-lg", font.className)}>
          A simple authentication app
        </p>
        <div className="space-x-5">
          <LoginButton>
            <Button className="font-bold" variant={"secondary"} size={"lg"}>
              Sign In
            </Button>
          </LoginButton>

          <RegisterButton>
            <Button className="font-bold" variant={"secondary"} size={"lg"}>
              Register
            </Button>
          </RegisterButton>
        </div>
      </div>
    </main>
  );
}

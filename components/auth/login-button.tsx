"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({ children, asChild, mode }: LoginButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    console.log("Login Button Clicked");
    router.push("/auth/login");
  };
  if (mode === "modal") {
    return <span>Todo! Implement Modal</span>;
  }
  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
};

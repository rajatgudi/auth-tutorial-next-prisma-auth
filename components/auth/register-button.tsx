"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const RegisterButton = ({
  children,
  asChild,
  mode,
}: LoginButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/register");
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

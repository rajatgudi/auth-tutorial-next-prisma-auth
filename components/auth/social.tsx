import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "../ui/button";
const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => {
          alert("Loging in by Google...");
        }}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => {
          alert("Loging in by Github...");
        }}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => {
          alert("Loging in by LinkedIn...");
        }}
      >
        <FaLinkedin className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Social;

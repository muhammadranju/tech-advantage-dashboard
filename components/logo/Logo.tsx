import React from "react";
import { CardHeader } from "../ui/card";
import Image from "next/image";

interface LogoProps {
  title: string;
  paragraph: string;
}
const LogoComponent = ({ title, paragraph }: LogoProps) => {
  return (
    <CardHeader className="text-center  pt-8">
      <div className="flex justify-center ">
        <Image
          src="/logo.png"
          className=" w-52 h-52 object-cover rounded-lg drop-shadow-2xl"
          blurDataURL="/logo.svg"
          alt="logo"
          width={500}
          height={600}
        />
      </div>
      <h2 className="text-xl font-semibold  mt-2">{title}</h2>
      <p>{paragraph || "Tech Advantage Admin Access"}</p>
    </CardHeader>
  );
};

export default LogoComponent;

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="p-5 border-b shadow-sm">
      <div className="flex items-center justify-between">
        <Image src="/logo.svg" width={50} height={50} alt="logo"></Image>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}

export default Header;

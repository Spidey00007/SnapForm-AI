"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

function Header() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className="p-5 border-b shadow-sm">
      <div className="flex items-center justify-between">
        <Image
          className="hover:cursor-pointer"
          onClick={() => {
            router.replace("/");
          }}
          src="/logo.svg"
          width={50}
          height={50}
          alt="logo"
        ></Image>
        {isSignedIn ? (
          <div className="flex items-center gap-5">
            <Button
              variant={"outline"}
              onClick={() => {
                router.replace("/dashboard");
              }}
            >
              Dashboard
            </Button>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export default Header;

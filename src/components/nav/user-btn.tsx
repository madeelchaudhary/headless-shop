"use client";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserBtn = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.authenticated);
  const user = useAppSelector((state) => state.auth.user);
  if (isAuthenticated === "loading") {
    <Skeleton className="w-[18px] h-[18px] rounded-full" />;
  }

  if (isAuthenticated === "unauthenticated") {
    return (
      <Link href="/auth/signin">
        <User2 className="w-[18px] h-[18px]" />
      </Link>
    );
  }

  return (
    <div className="w-[18px] h-[18px]">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <User2 className="w-[18px] h-[18px]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Hi {user?.fullName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuLabel
              onClick={() => {
                console.log("unauthenticated  ");
                localStorage.removeItem("nostra:authToken");
                localStorage.removeItem("nostra:authTokenExpiresAt");
                window.location.href = "/";
              }}
            >
              Sign out
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserBtn;

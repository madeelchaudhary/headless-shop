"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export const SignOutBtn = () => {
  return (
    <Button
      className="w-full"
      onClick={() => {
        localStorage.removeItem("nostra:authToken");
        localStorage.removeItem("nostra:authTokenExpiresAt");
        window.location.href = "/";
      }}
    >
      Sign out
    </Button>
  );
};
export const SignInBtn = () => {
  return (
    <Button className="w-full" asChild>
      <Link href="/auth/signin">Sign in</Link>
    </Button>
  );
};

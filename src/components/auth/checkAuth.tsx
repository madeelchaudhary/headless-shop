"use client";
import { useAppSelector } from "@/store/hooks";
import React from "react";

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const status = useAppSelector((state) => state.auth.authenticated);

  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    return <></>;
  }
};

export default CheckAuth;

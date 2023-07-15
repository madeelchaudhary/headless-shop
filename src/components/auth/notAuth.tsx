"use client";
import { useAppSelector } from "@/store/hooks";
import React from "react";

const NotAuth = ({ children }: { children: React.ReactNode }) => {
  const status = useAppSelector((state) => state.auth.authenticated);

  if (status === "unauthenticated") {
    return <>{children}</>;
  } else {
    return <></>;
  }
};

export default NotAuth;

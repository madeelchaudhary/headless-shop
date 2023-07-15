"use client";
import SignInForm from "@/components/auth/sign-in-form";
import SignUpForm from "@/components/auth/sign-up-form";
import Logo from "@/components/nav/logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.authenticated);
  const router = useRouter();

  if (isAuthenticated === "authenticated") {
    router.push("/");
  }
  return (
    <>
      <main className="flex flex-col items-center py-20 px-4 gap-y-12 ">
        <Logo />
        <Tabs defaultValue="signin" className="max-w-full w-[420px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="py-5">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <SignInForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="py-5">
              <CardHeader>
                <CardTitle>Sign up for an account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <SignUpForm />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default SignInPage;

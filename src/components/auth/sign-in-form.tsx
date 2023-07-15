"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { useToast } from "../ui/use-toast";
import { EyeIcon, Loader2 } from "lucide-react";
import { ToastAction } from "@radix-ui/react-toast";
import { EyeOff } from "lucide-react";

const CREATE_TOKEN = gql`
  mutation createToken($email: String!, $password: String!) {
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        message
      }
    }
  }
`;

const formSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email.")
    .max(255, "Email is too long."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(18, "Password is too long.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    ),
});

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [fetchUser, { called, loading, data, error, reset }] =
    useMutation(CREATE_TOKEN);

  function errorHandler(error: ApolloError | { message: string }) {
    toast.toast({
      title: "Error",
      description: error.message || "Something went wrong.",
      variant: "destructive",
      action: (
        <ToastAction
          altText="Try Again"
          onClick={() => {
            reset();
          }}
        >
          Try Again
        </ToastAction>
      ),
    });
    form.reset();
    console.log(error);
  }

  function authenticateHandler(data: any) {
    const { customerAccessToken } = data.customerAccessTokenCreate;
    if (!customerAccessToken) {
      errorHandler({
        message:
          data.customerAccessTokenCreate.customerUserErrors[0]?.message ||
          "Email or password is incorrect.",
      });
    } else {
      localStorage.setItem("nostra:authToken", customerAccessToken.accessToken);
      localStorage.setItem(
        "nostra:authTokenExpiresAt",
        customerAccessToken.expiresAt
      );
      window.location.href = "/";
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    fetchUser({
      variables: { email, password },
      onCompleted: authenticateHandler,
      onError: errorHandler,
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    {!showPassword && (
                      <EyeIcon
                        onClick={() => setShowPassword(true)}
                        className="absolute right-2 top-2/4 transform -translate-y-2/4 h-4 w-4 cursor-pointer text-slate-700"
                      />
                    )}
                    {showPassword && (
                      <EyeOff
                        onClick={() => setShowPassword(false)}
                        className="absolute right-2 top-2/4 transform -translate-y-2/4 h-4 w-4 cursor-pointer text-slate-700"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button className="h-auto w-full py-3" type="submit">
          {called && loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;

"use client";

import React from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "../ui/toast";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAuth } from "@/store/authSlice";
import { clearCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

const CREATE_CUSTOMER = gql`
  mutation createCustomer(
    $email: String!
    $password: String!
    $acceptMarketing: Boolean
    $fName: String!
    $lName: String!
  ) {
    customerCreate(
      input: {
        email: $email
        password: $password
        acceptsMarketing: $acceptMarketing
        firstName: $fName
        lastName: $lName
      }
    ) {
      customer {
        id
        displayName
        email
      }
      customerUserErrors {
        message
      }
    }
  }
`;

const CREATE_CUSTOMER_ACCESS_TOKEN = gql`
  mutation MyMutation($email: String!, $password: String!) {
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

const CREATE_CART = gql`
  mutation MyMutation(
    $lines: [CartLineInput!]
    $email: String
    $customerAccessToken: String
  ) {
    cartCreate(
      input: {
        lines: $lines
        buyerIdentity: {
          email: $email
          customerAccessToken: $customerAccessToken
        }
      }
    ) {
      cart {
        id
      }
    }
  }
`;

async function setUserCart(cartId: string, userId: string) {
  const res = await fetch("/api/user-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartId, userId }),
  });
  const data = await res.json();
  return data;
}

const formSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(255, "First name is too long."),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(255, "Last name is too long."),
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
  newsletter: z.boolean().default(false).optional(),
});

const SignUpForm = () => {
  const toast = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [registerUser, { loading, called, reset }] =
    useMutation(CREATE_CUSTOMER);
  const [createCustomerAccessToken] = useMutation(CREATE_CUSTOMER_ACCESS_TOKEN);
  const [createCart] = useMutation(CREATE_CART);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      newsletter: false,
    },
  });

  function errorHandler(error: ApolloError | { message: string }) {
    toast.toast({
      title: "Error",
      description: error.message,
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

  function successHandler(data: any) {
    if (!data.customerCreate.customer.id) {
      errorHandler({
        message:
          data.customerCreate.customerUserErrors[0]?.message ||
          "Something went wrong.",
      });
      return;
    }
    const cartItemsList = Object.keys(cartItems);
    if (cartItemsList.length === 0) {
      toast.toast({
        title: "Account created.",
        description: "Now you can login to your account.",
      });
      form.reset();
      return;
    }
    const { email, password } = form.getValues();
    const { customer } = data.customerCreate;
    createCustomerAccessToken({
      variables: {
        email,
        password,
      },
      onCompleted: (data) => {
        if (!data.customerAccessTokenCreate.customerAccessToken.accessToken) {
          errorHandler({
            message:
              data.customerAccessTokenCreate.customerUserErrors[0]?.message ||
              "Something went wrong.",
          });
          return;
        }
        const accessToken =
          data.customerAccessTokenCreate.customerAccessToken.accessToken;
        const expiresAt =
          data.customerAccessTokenCreate.customerAccessToken.expiresAt;
        localStorage.setItem("nostra:authToken", accessToken);
        localStorage.setItem("nostra:authTokenExpiresAt", expiresAt);
        createCart({
          variables: {
            lines: Object.entries(cartItems).map(([key, value]) => ({
              quantity: value.quantity,
              merchandiseId: key,
            })),
            email,
            customerAccessToken: accessToken,
          },
          onCompleted: (cartData) => {
            if (!cartData.cartCreate.cart.id) {
              errorHandler({
                message: "Your cart could not be saved.",
              });
              return;
            }
            localStorage.setItem("nostra:cartId", cartData.cartCreate.cart.id);
            try {
              setUserCart(cartData.cartCreate.cart.id, customer.id);
            } catch (err) {
              console.log(err);
            }
            dispatch(
              addAuth({
                accessToken,
                email,
                fullName: customer.displayName,
                id: customer.id,
              })
            );
            dispatch(clearCart());
            router.push("/cart");
          },
          onError: (error) => {
            errorHandler({ message: "Your cart could not be saved." });
            dispatch(
              addAuth({
                accessToken,
                email,
                fullName: customer.displayName,
                id: customer.id,
              })
            );
            dispatch(clearCart());
            router.push("/");
          },
        });
      },
      onError: errorHandler,
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { first_name, last_name, email, password, newsletter } = values;
    registerUser({
      variables: {
        email,
        password,
        acceptMarketing: newsletter,
        fName: first_name,
        lName: last_name,
      },
      onCompleted: successHandler,
      onError: errorHandler,
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
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
        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="flex gap-x-2 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange as any}
                    />
                  </FormControl>
                  <FormLabel className="m-0">
                    Sign up for our newsletter.
                  </FormLabel>
                </div>
              </FormItem>
            );
          }}
        />
        <Button type="submit">
          {called && loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;

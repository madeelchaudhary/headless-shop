"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAuth, emptyAuth } from "@/store/authSlice";
import gql from "graphql-tag";
import { setCartId } from "@/store/cartSlice";
import { useLazyQuery } from "@apollo/client";

const GET_USER = gql`
  query getUser($token: String!) {
    customer(customerAccessToken: $token) {
      id
      email
      displayName
      firstName
      lastName
    }
  }
`;

async function getCartId(userId: string) {
  const res = await fetch("/api/user-cart?userId=" + userId);
  return res;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const status = useAppSelector((state) => state.auth.authenticated);

  const dispatch = useAppDispatch();
  const [getUser, { data, loading, error }] = useLazyQuery(GET_USER);

  useEffect(() => {
    const userAccessToken = localStorage.getItem("nostra:authToken");
    const userAccessTokenExpires = localStorage.getItem(
      "nostra:authTokenExpiresAt"
    );

    if (status === "authenticated") {
      return;
    }
    if (!userAccessToken) {
      dispatch(emptyAuth({}));
      return;
    }

    if (
      userAccessTokenExpires &&
      new Date(userAccessTokenExpires) < new Date()
    ) {
      dispatch(emptyAuth({}));
      localStorage.removeItem("nostra:authToken");
      return;
    }

    getUser({
      variables: {
        token: userAccessToken,
      },
      onCompleted: (data) => {
        const { id, email, displayName } = data.customer;
        const user = {
          id,
          email,
          fullName: displayName,
          accessToken: userAccessToken,
        };
        getCartId(id)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Something went wrong");
          })
          .then((data) => {
            if (data) {
              dispatch(setCartId(data.cartId));
            }
          })
          .catch((err) => {
            console.log(err);
          });
        dispatch(addAuth(user));
      },
      onError: (error) => {
        console.log(error);
        dispatch(emptyAuth({}));
      },
    });
  }, [dispatch, getUser, status]);

  return <>{children}</>;
};

export default AuthProvider;

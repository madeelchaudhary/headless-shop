import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { deleteFromCart, updateQuantity } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ApolloError, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";

const REMOVE_FROM_CART = gql`
  mutation MyMutation($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
      }
      userErrors {
        message
      }
    }
  }
`;

const UPDATE_CART = gql`
  mutation MyMutation($cartId: ID!, $id: ID!, $quantity: Int) {
    cartLinesUpdate(cartId: $cartId, lines: { id: $id, quantity: $quantity }) {
      userErrors {
        message
      }
      cart {
        id
      }
    }
  }
`;

const useCartUpdate = () => {
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const [updateCart, { reset: updateReset }] = useMutation(UPDATE_CART);
  const [removeFromCart, { reset: removeReset }] =
    useMutation(REMOVE_FROM_CART);

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.authenticated);
  const cartId = useAppSelector((state) => state.cart.id);
  const user = useAppSelector((state) => state.auth.user);

  function handleError(
    error: ApolloError | { message: string },
    reset?: () => void
  ) {
    setLoading(false);
    toast.toast({
      title: "Error",
      description: error.message || "Something went wrong.",
      variant: "destructive",
      action: reset && (
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
    console.log(error);
  }

  const handleUpdateCart = async (
    lineId: string,
    quantity: number,
    merchandiseId: string,
    refetch: () => void
  ) => {
    console.log(cartId, "cartId");
    setLoading(true);
    if (isAuthenticated === "authenticated") {
      // create cart
      if (!cartId) {
        handleError({ message: "An error occurred." });
      }

      if (cartId) {
        updateCart({
          variables: {
            cartId,
            id: lineId,
            quantity,
          },
          onError: (error) => handleError(error, updateReset),
          onCompleted: () => {
            setLoading(false);
            toast.toast({
              title: "Success",
              description: "Cart updated successfully.",
            });
            refetch();
          },
        });
      }
    } else {
      dispatch(updateQuantity({ id: merchandiseId, quantity }));
      setLoading(false);
      toast.toast({
        title: "Success",
        description: "Cart updated successfully.",
      });
    }
  };

  async function handleRemoveFromCart(
    lineId: string,
    merchandiseId: string,
    refetch: () => void
  ) {
    setLoading(true);
    if (isAuthenticated === "authenticated") {
      // create cart
      if (!cartId) {
        handleError({ message: "An error occurred." });
      }

      if (cartId) {
        removeFromCart({
          variables: {
            cartId,
            lineIds: [lineId],
          },
          onError: (error) => handleError(error, removeReset),
          onCompleted: () => {
            setLoading(false);
            toast.toast({
              title: "Success",
              description: "Cart updated successfully.",
            });
            refetch();
          },
        });
      }
    } else {
      dispatch(deleteFromCart(merchandiseId));
      setLoading(false);
      toast.toast({
        title: "Success",
        description: "Cart updated successfully.",
      });
    }
  }

  return {
    handleUpdateCart,
    handleRemoveFromCart,
    loading,
  };
};

export default useCartUpdate;

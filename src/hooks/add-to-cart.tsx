import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { addToCartByQuantity } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ApolloError, useLazyQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";

const CREATE_CART = gql`
  mutation createCart(
    $customerAccessToken: String
    $email: String
    $quantity: Int
    $merchandiseId: ID!
    $userId: String!
  ) {
    cartCreate(
      input: {
        lines: { quantity: $quantity, merchandiseId: $merchandiseId }
        buyerIdentity: {
          customerAccessToken: $customerAccessToken
          email: $email
        }
        attributes: { key: "userId", value: $userId }
      }
    ) {
      cart {
        id
      }
    }
  }
`;

const ADD_TO_CART = gql`
  mutation addToCart($merchandiseId: ID!, $cartId: ID!, $qty: Int) {
    cartLinesAdd(
      lines: { merchandiseId: $merchandiseId, quantity: $qty }
      cartId: $cartId
    ) {
      cart {
        id
        cost {
          totalAmount {
            amount
          }
        }
      }
    }
  }
`;

const GET_CART = gql`
  query getCart($id: ID!) {
    cart(id: $id) {
      attribute(key: "userId") {
        value
      }
      id
    }
  }
`;

const useAddToCart = () => {
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const [createCart, { reset: createReset }] = useMutation(CREATE_CART);
  const [addToCart, { reset: addReset }] = useMutation(ADD_TO_CART);
  const [getCart] = useLazyQuery(GET_CART, {
    fetchPolicy: "no-cache",
    onError: handleError,
  });

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

  const handleAddToCart = async (
    merchandiseId: string,
    quantity: number | null
  ) => {
    setLoading(true);
    if (isAuthenticated === "authenticated") {
      // create cart
      const localCartId = localStorage.getItem("nostra:cartId");
      if (!cartId && !localCartId) {
        createCart({
          variables: {
            merchandiseId,
            customerAccessToken: user?.accessToken,
            email: user?.email,
            quantity,
            userId: user?.id,
          },
          onError: (error) => handleError(error, createReset),
          onCompleted: (data) => {
            const cartId = data.cartCreate.cart.id;
            localStorage.setItem("nostra:cartId", cartId);
            fetch("/api/user-cart", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user?.id,
                cartId,
              }),
            })
              .then((res) => {
                if (res.ok) {
                  setLoading(false);
                  toast.toast({
                    title: "Success",
                    description: "Item added to cart.",
                  });
                }
              })
              .catch((err) => {
                handleError({ message: "Your cart could not be saved." });
              });
          },
        });
      }

      if (cartId) {
        addToCart({
          variables: {
            merchandiseId,
            cartId,
            qty: quantity,
          },
          onError: (error) => handleError(error, addReset),
          onCompleted: () => {
            setLoading(false);
            toast.toast({
              title: "Success",
              description: "Item added to cart.",
            });
          },
        });
      } else if (localCartId) {
        getCart({
          variables: {
            id: localCartId,
          },
          onCompleted: (data) => {
            const userId = data.cart.attribute.value;
            if (userId !== user?.id) {
              localStorage.removeItem("nostra:cartId");
              handleError({
                message: "Something went wrong. Please try again.",
              });
              return;
            }
            fetch("/api/user-cart", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId,
                cartId: localCartId,
              }),
            })
              .then((res) => {
                if (res.ok) {
                  addToCart({
                    variables: {
                      merchandiseId,
                      cartId: localCartId,
                      qty: quantity,
                    },
                    onError: (error) => handleError(error, addReset),
                    onCompleted: () => {
                      setLoading(false);
                      toast.toast({
                        title: "Success",
                        description: "Item added to cart.",
                      });
                    },
                  });
                }
              })
              .catch((err) => {
                handleError({ message: "Your cart could not be saved." });
              });
          },
        });
      }

      // add to cart
    } else {
      dispatch(
        addToCartByQuantity({ id: merchandiseId, quantity: quantity || 1 })
      );
      setLoading(false);
      toast.toast({
        title: "Success",
        description: "Item added to cart.",
      });
    }
  };

  return {
    handleAddToCart,
    loading,
  };
};

export default useAddToCart;

"use client";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/store/hooks";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import Container from "@/components/ui/container";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Loading from "./loading";
import CartItem from "@/components/cart/cart-item";
import Link from "next/link";

const GET_CART = gql`
  query getCart($id: ID!) {
    cart(id: $id) {
      id
      buyerIdentity {
        customer {
          id
        }
      }
      totalQuantity
      attribute(key: "userId") {
        value
      }
    }
  }
`;

const GET_CART_LINES = gql`
  query getCartLines($id: ID!) {
    cart(id: $id) {
      checkoutUrl
      cost {
        subtotalAmount {
          amount
        }
        totalAmount {
          amount
        }
        totalTaxAmount {
          amount
        }
      }
      lines(first: 25) {
        edges {
          node {
            quantity
            cost {
              amountPerQuantity {
                amount
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                image {
                  url(transform: { maxWidth: 240, maxHeight: 320 })
                }
                quantityAvailable
                product {
                  title
                }
                title
              }
            }
            id
          }
        }
      }
    }
  }
`;

const GET_CART_PRODUCTs = gql`
  query getCart($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on ProductVariant {
        id
        quantityAvailable
        price {
          amount
        }
        image {
          url(transform: { maxHeight: 240, maxWidth: 240 })
        }
        title
        product {
          title
        }
      }
    }
  }
`;

interface Product {
  id: string;
  quantityAvailable: number;
  price: number;
  image: string;
  title: string;
  variantTitle: string;
  quantity: number;
}

const CartPage = () => {
  const toast = useToast();
  const [error, setError] = useState<{
    message: string;
    reload?: () => void;
  } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [fetced, setFetched] = useState(false);
  const [additionals, setAdditionals] = useState<
    Partial<{
      checkoutUrl: string;
      totalPrice: number;
      subtotal: number;
      taxAmount: number;
    }>
  >({});

  const [getCart, { refetch: cartRefetch }] = useLazyQuery(GET_CART);
  const [
    getCartLines,
    { loading: loadingCartLines, refetch: cartLinesRefetch },
  ] = useLazyQuery(GET_CART_LINES, {
    onCompleted: (data) => {
      const lines = data.cart.lines.edges.map((line: any) => ({
        id: line.node.id,
        merchandiseId: line.node.merchandise.id,
        quantityAvailable: line.node.merchandise.quantityAvailable,
        price: line.node.cost.amountPerQuantity.amount,
        image: line.node.merchandise.image.url,
        title: line.node.merchandise.product.title,
        variantTitle: line.node.merchandise.title,
        quantity: line.node.quantity,
      }));
      setProducts(lines);
      setAdditionals({
        checkoutUrl: data.cart.checkoutUrl,
        totalPrice: data.cart.cost.totalAmount.amount,
        subtotal: data.cart.cost.subtotalAmount.amount,
        taxAmount: data.cart.cost.totalTaxAmount?.amount || "0.00",
      });
      setFetched(true);
    },
  });
  const [
    getCartProducts,
    { loading: loadingCartProducts, refetch: productsRefetch },
  ] = useLazyQuery(GET_CART_PRODUCTs, {
    onCompleted: (data) => {
      const lines = data.nodes.map((line: any) => ({
        id: line.id,
        merchandiseId: line.id,
        quantityAvailable: line.quantityAvailable,
        price: line.price.amount,
        image: line.image.url,
        title: line.product.title,
        variantTitle: line.title,
        quantity: cartItems[line.id]?.quantity,
      }));
      const totalPrice = lines.reduce(
        (acc: number, line: any) => acc + line.price * line.quantity,
        0
      );
      setAdditionals({
        totalPrice: totalPrice.toFixed(2),
        subtotal: totalPrice.toFixed(2),
        taxAmount: "0.00" as any,
      });

      setProducts(lines);
      setFetched(true);
    },
  });

  const isAuthenticated = useAppSelector((state) => state.auth.authenticated);
  const user = useAppSelector((state) => state.auth.user);
  const cartIdState = useAppSelector((state) => state.cart.id);
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    if (isAuthenticated === "unauthenticated") {
      const prodIds = Object.keys(cartItems);
      if (prodIds.length === 0) {
        setFetched(true);
      }
      if (prodIds.length > 0) {
        getCartProducts({
          variables: { ids: prodIds },
          onError: (error) => {
            setError({ message: error.message, reload: productsRefetch });
          },
        });
      }
    }
  }, [cartItems, getCartProducts, isAuthenticated, productsRefetch]);

  const userId = user?.id;

  useEffect(() => {
    if (isAuthenticated === "authenticated") {
      const cartIdLocalStorage = localStorage.getItem("nostra:cartId");
      const cartId = cartIdState || cartIdLocalStorage;
      if (cartId) {
        getCart({
          variables: { id: cartId },
          onError: (error) => {
            setError({ message: error.message, reload: cartRefetch });
          },
          onCompleted: (data) => {
            if (data.cart.buyerIdentity.customer.id !== userId) {
              setError({ message: "Cart does not belong to user" });
              setFetched(true);
              return;
            }
            if (data.cart.totalQuantity === 0) {
              setFetched(true);
              return;
            }
            getCartLines({
              variables: { id: cartId },
            });
          },
        });
      }
    }
  }, [
    isAuthenticated,
    cartIdState,
    getCart,
    cartRefetch,
    userId,
    getCartLines,
  ]);

  function handleCheckout() {
    if (isAuthenticated === "authenticated") {
      if (additionals?.checkoutUrl) {
        window.location.href = additionals.checkoutUrl;
      }
    } else {
      toast.toast({
        title: "Please login to checkout",
        description: "You need to login to checkout",
        variant: "destructive",
      });
    }
  }

  if (error) {
    return (
      <main>
        <Container>
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-3xl font-bold text-center">{error.message}</p>
            {error.reload && (
              <button
                className="px-4 py-2 bg-slate-600 text-white rounded-lg mt-4"
                onClick={() => {
                  setError(null);
                  setFetched(false);
                  error.reload!();
                }}
              >
                Reload
              </button>
            )}
          </div>
        </Container>
      </main>
    );
  }

  if (!fetced) {
    return <Loading />;
  }

  if (fetced && products.length === 0) {
    return (
      <main>
        <Container>
          <div className="flex flex-col items-center justify-center py-28">
            <h1 className="text-3xl font-semibold text-center text-slate-800">
              Cart is empty
            </h1>
            <p className="text-center text-gray-500 text-lg mt-2">
              You have no items in your cart
            </p>
            <Button className="mt-4" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="mt-10 pb-8 md:pb-14">
      <Container>
        <div className="grid gap-5 lg:gap-8 md:grid-cols-5 lg:grid-cols-12">
          <div className="md:col-span-3 lg:col-span-8">
            <h1 className="text-3xl font-bold">Cart</h1>
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="uppercase text-gray-500 ">
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <CartItem
                      refetch={cartLinesRefetch}
                      key={product.id}
                      product={product}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className=" md:col-span-2 lg:col-span-4 md:max-w-md">
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <p className="text-slate-500 text-lg">Subtotal</p>
                    <p className="text-slate-900 font-semibold text-xl">
                      ${additionals.subtotal}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-slate-500 text-lg">Tax</p>
                    <p className="text-slate-500 font-medium text-lg">
                      ${additionals.taxAmount}
                    </p>
                  </div>
                </div>
                <Separator className="bg-slate-100" />
                <div className="flex justify-between items-center">
                  <p className="text-slate-900 font-medium text-lg">
                    Grand Total
                  </p>
                  <p className="text-slate-900 font-semibold text-2xl">
                    ${additionals.totalPrice}
                  </p>
                </div>
                <Button
                  onClick={() => handleCheckout()}
                  className="w-full h-auto py-3 text-lg"
                >
                  Checkout Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default CartPage;

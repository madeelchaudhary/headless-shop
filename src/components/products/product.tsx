"use client";

import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import getProductUrl from "@/lib/get-product-url";
import Link from "next/link";
import useAddToCart from "@/hooks/add-to-cart";
import { Loader2 } from "lucide-react";

interface Props {
  product: {
    id: string;
    variantId: string;
    title: string;
    price: number;
    compareAtPrice?: number;
    image: string;
    secondaryImage?: string;
    tags: string[] | null;
    handle: string;
    gender: string;
  };
}

const Product = ({ product }: Props) => {
  const {
    title,
    image,
    price,
    compareAtPrice,
    tags,
    handle,
    gender,
    variantId,
    secondaryImage,
  } = product;

  const { handleAddToCart, loading } = useAddToCart();

  const tag = tags ? tags[0] : null;
  const link = getProductUrl(handle, gender);

  return (
    <article className="w-full">
      <div className="w-full">
        <div className="aspect-[3/4] w-full max-h-[30rem] rounded-lg overflow-hidden relative">
          <Link className="absolute inset-0 z-10 block group" href={link}>
            {tag && (
              <div className="absolute top-4 left-4">
                <Badge
                  className="rounded-md bg-red-700 text-sm uppercase"
                  variant={"destructive"}
                >
                  {tag}
                </Badge>
              </div>
            )}
            <Image
              className={`object-cover w-full h-full ${
                secondaryImage && "group-hover:opacity-0 transition-opacity"
              }`}
              width={320}
              height={540}
              src={image}
              alt={title}
            />
            {secondaryImage && (
              <Image
                className="object-cover w-full h-full opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0"
                width={320}
                height={540}
                src={secondaryImage}
                alt={title}
              />
            )}
          </Link>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="max-w-[75%]">
            <h3 className="text-xl text-slate-900 font-medium mb-1 whitespace-nowrap text-ellipsis overflow-hidden ">
              <Link href={link}>{title}</Link>
            </h3>
            {compareAtPrice && (
              <div className="inline-flex gap-1.5">
                <span className="text-2xl md:text-3xl text-slate-900 font-semibold">
                  ${price}
                </span>
                <span className="text-sm md:text-base text-gray-500 font-semibold line-through self-start mt-1">
                  ${compareAtPrice}
                </span>
              </div>
            )}
            {!compareAtPrice && (
              <span className="text-2xl md:text-3xl text-slate-900 font-bold">
                ${price}
              </span>
            )}
          </div>
          <Button
            className="mt-4 bg-slate-900 p-4 w-auto h-auto rounded-lg"
            size="icon"
            disabled={loading}
            onClick={() => handleAddToCart(variantId, null)}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                Wait
              </>
            ) : (
              <ShoppingCart className="w-5 h-5 text-white" />
            )}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default Product;

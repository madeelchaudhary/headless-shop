import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Image from "next/image";
import React from "react";
import Rating from "../ui/rating";
import Link from "next/link";
import getProductUrl from "@/lib/get-product-url";
import { Skeleton } from "../ui/skeleton";

const GET_PRODUCTS = gql`
  query searchProducts($query: String!) {
    predictiveSearch(types: PRODUCT, limit: 5, query: $query) {
      products {
        title
        featuredImage {
          url(transform: { maxHeight: 200, maxWidth: 200 })
        }
        handle
        id
        priceRange {
          minVariantPrice {
            amount
          }
        }
        metafield(key: "gender", namespace: "custom") {
          value
        }
      }
    }
  }
`;
const SearchResults = ({ term }: { term: string }) => {
  const trimmedTerm = term.trim();
  const searchTerm = '\\"' + trimmedTerm + '\\"';
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { query: searchTerm },
  });

  if (loading)
    return (
      <div className="w-full">
        <div className="grid grid-cols-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-x-4 border-b border-slate-100 last:border-b-0 py-3"
            >
              <div className="aspect-square max-h-16 rounded-lg border border-gray-200 overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-56 h-5" />
                <Skeleton className="w-40 h-5" />
              </div>
              <Skeleton className="w-16 h-6" />
            </div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="w-full">
        <div className="grid grid-cols-1">
          <div className="flex items-center flex-col justify-center w-full py-14">
            <p className="font-bold text-center text-xl text-slate-900">
              Error
            </p>
            <p className="text-center text-base text-gray-500">
              {error.message}
            </p>
          </div>
        </div>
      </div>
    );

  if (!data.predictiveSearch.products.length)
    return (
      <div className="w-full">
        <div className="grid grid-cols-1">
          <div className="flex items-center justify-center w-full py-14">
            <p className="font-bold text-center text-2xl text-slate-800">
              No Results Found
            </p>
          </div>
        </div>
      </div>
    );

  const products = data.predictiveSearch.products.map((product: any) => {
    return {
      title: product.title,
      image: product.featuredImage.url,
      handle: product.handle,
      id: product.id,
      price: product.priceRange.minVariantPrice.amount,
      gender: product.metafield.value,
    };
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-1">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="flex gap-x-4 border-b border-slate-100 last:border-b-0 py-3"
          >
            <Link
              className="block w-fit"
              href={getProductUrl(product.handle, product.gender)}
            >
              <div className="aspect-square max-h-16 rounded-lg border border-gray-200 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full h-full"
                  width={200}
                  height={200}
                />
              </div>
            </Link>
            <div className="flex flex-col gap-2">
              <Link
                className="block w-fit"
                href={getProductUrl(product.handle, product.gender)}
              >
                <p className="font-semibold text-slate-900">{product.title}</p>
              </Link>
              <Rating rating={4.2} />
            </div>
            <p className="text-slate-950 font-semibold text-xl ml-auto">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

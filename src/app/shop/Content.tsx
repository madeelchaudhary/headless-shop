"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import gql from "graphql-tag";
import Product from "@/components/products/product";
import Sidebar from "./sidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearBrand,
  clearType,
  clearPrice,
  clearSize,
} from "@/store/filterSlice";
import { useQuery } from "@apollo/client";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductsSkeletonList from "@/components/products/skeleton-list";

// const PRODUCTS_BY_COLLECTION = gql`
//   query getProdbyCollection(
//     $handle: String
//     $max: Float
//     $min: Float
//     $productVendor: String
//     $name: String
//     $value: String
//     $after: String
//   ) {
//     collection(handle: $handle) {
//       products(
//         filters: {
//           productVendor: $productVendor
//           variantOption: { name: $name, value: $value }
//           price: { max: $max, min: $min }
//         }
//         first: 9
//         after: $after
//       ) {
//         pageInfo {
//           endCursor
//           hasNextPage
//         }
//         edges {
//           node {
//             title
//             featuredImage {
//               url(transform: { maxHeight: 320, maxWidth: 540 })
//             }
//             handle
//             id
//             tags
//             variants(first: 1) {
//               edges {
//                 node {
//                   availableForSale
//                   compareAtPrice {
//                     amount
//                   }
//                   id
//                   price {
//                     amount
//                   }
//                   quantityAvailable
//                 }
//               }
//             }
//             vendor
//             collections(first: 8) {
//               nodes {
//                 id
//                 handle
//                 title
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

const GET_PRODUCTS_LIST = gql`
  query MyQuery($filters: [ProductFilter!], $after: String, $before: String) {
    search(
      query: ""
      types: PRODUCT
      productFilters: $filters
      first: 9
      after: $after
      before: $before
    ) {
      nodes {
        ... on Product {
          id
          title
          tags
          vendor
          images(first: 2) {
            edges {
              node {
                url(transform: { maxHeight: 540, maxWidth: 320 })
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
              }
            }
          }
          productType
          availableForSale
          handle
          metafield(key: "gender", namespace: "custom") {
            value
          }
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

// {
//   "filters": {
//     "productType": "Pants",
//     "productVendor": "",
//     "price": {
//       "min": 3,
//       "max":3
//     },
//     "variantOption": {
//       "name": "",
//       "value": ""
//     },
//     "productMetafield": {
//       "namespace": "custom",
//       "key": "gender",
//       "value": ""
//     }
//   }
// }

const PageContent = () => {
  const dispatch = useAppDispatch();

  const selectedOpts = useAppSelector((state) => state.filters);
  const selectedFilters = Object.entries(selectedOpts.filters);
  let filters = selectedFilters.filter(([key, value]: any) => {
    if (key === "price") {
      return value.min !== 0 || value.max !== 0;
    }

    return value.length > 0;
  });

  const variables: any = {
    filters: {},
  };

  if (filters.length > 0) {
    filters.forEach(([key, value]: any) => {
      switch (key) {
        case "price":
          const price: any = {};
          if (value.min !== 0) {
            price["min"] = value.min;
          }
          if (value.max !== 0) {
            price["max"] = value.max;
          }
          variables.filters.price = price;
          break;
        case "type":
          variables.filters.productType = value;
          break;
        case "brand":
          variables.filters.productVendor = value;
          break;
        case "size":
          variables.filters.variantOption = {
            name: "Size",
            value: value,
          };
          break;
        case "gender":
          variables.filters.productMetafield = {
            namespace: "custom",
            key: "gender",
            value: value,
          };
          break;
        default:
          break;
      }
    });
  }

  const { data, loading, error, fetchMore, refetch } = useQuery(
    GET_PRODUCTS_LIST,
    {
      variables: {
        filters: variables.filters,
      },
    }
  );

  let appliedFilters = null;
  if (filters.length > 0) {
    appliedFilters = filters.map(([key, value]: any) => {
      switch (key) {
        case "price":
          return (
            <Button
              onClick={() => dispatch(clearPrice())}
              variant="outline"
              key={key}
              className="rounded-full text-slate-600 h-auto"
            >
              {value.min} - {value.max}
              <X className="w-4 h-4 ml-2" />
            </Button>
          );
        case "type":
          return (
            <Button
              onClick={() => dispatch(clearType())}
              variant="outline"
              key={key}
              className="rounded-full text-slate-600 h-auto"
            >
              {value}
              <X className="w-4 h-4 ml-2" />
            </Button>
          );
        case "brand":
          return (
            <Button
              onClick={() => dispatch(clearBrand())}
              variant="outline"
              key={key}
              className="rounded-full text-slate-600 h-auto"
            >
              {value}
              <X className="w-4 h-4 ml-2" />
            </Button>
          );
        case "size":
          return (
            <Button
              onClick={() => dispatch(clearSize())}
              variant="outline"
              key={key}
              className="rounded-full text-slate-600 h-auto"
            >
              {value}
              <X className="w-4 h-4 ml-2" />
            </Button>
          );
      }
    });
  }

  if (loading)
    return (
      <div className="sm:pr-4">
        <div className="flex justify-end gap-4 mb-6">
          <div className="md:hidden">
            <Skeleton className="w-20 h-5 rounded-lg" />
          </div>
          <div>
            <Skeleton className="w-20 h-5 rounded-lg" />
          </div>
        </div>
        <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 shop-products-skeleton">
          <ProductsSkeletonList num={9} />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="sm:pr-4">
        <div className="flex justify-end gap-4 mb-6">
          <div className="md:hidden">
            <div className="w-20 h-5 " />
          </div>
          <div>
            <div className="w-20 h-5" />
          </div>
        </div>
        <div className="grid gap-6">
          <p className="text-sm text-gray-600">
            Something went wrong. Please try again.
          </p>
          <Button onClick={() => refetch()} variant="outline">
            Try again
          </Button>
        </div>
      </div>
    );

  const { totalCount, pageInfo } = data.search;
  let filteredProducts = data.search.nodes;
  if (filters.length > 0) {
    console.log("filters", filters);
    filteredProducts = data.search.nodes.filter((node: any) => {
      if (selectedOpts.filters.type.length > 0) {
        if (selectedOpts.filters.type !== node.productType) {
          return false;
        }
      }

      if (selectedOpts.filters.brand.length > 0) {
        if (selectedOpts.filters.brand !== node.vendor) {
          return false;
        }
      }

      if (selectedOpts.filters.gender.length > 0) {
        if (selectedOpts.filters.gender !== node.metafield.value) {
          return false;
        }
      }

      return true;
    });
  }

  const products = filteredProducts.map((node: any) => {
    const price = node.variants.edges[0].node.price.amount;
    const compareAtPrice = node.variants.edges[0].node.compareAtPrice?.amount;
    const variantId = node.variants.edges[0].node.id;

    return {
      id: node.id,
      variantId: variantId,
      title: node.title,
      price: price,
      compareAtPrice: compareAtPrice,
      image: node.images.edges[0].node.url,
      secondaryImage: node.images.edges[1]?.node.url,
      tags: node.tags,
      handle: node.handle,
      gender: node.metafield.value,
      available: node.availableForSale,
    };
  });

  return (
    <div>
      <div className="flex justify-end gap-4 mb-6">
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"}>Filters</Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 rounded-lg border-none">
              <Sidebar />
            </PopoverContent>
          </Popover>
        </div>
        <Select>
          <SelectTrigger className="w-40 text-gray-600 font-medium">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            {/* <SelectItem value="created-desc">Newest</SelectItem>
            <SelectItem value="created-asc">Oldest</SelectItem> */}
            <SelectItem value="price-asc">Price low to high</SelectItem>
            <SelectItem value="price-desc">Price high to low</SelectItem>
            {/* <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="name-desc">Name Z-A</SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      {filters.length > 0 && (
        <div className="flex gap-2 items-center mb-6">
          <p className="text-gray-600 text-sm ">Applied Filters:</p>
          <div className="flex flex-wrap gap-4">{appliedFilters}</div>
        </div>
      )}
      <div className="grid  sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 ">
        {products.length === 0 && (
          <div className="col-span-full">
            <p className="text-gray-600 text-lg text-center my-10">
              No products found. Please try again.
            </p>
          </div>
        )}
        {products.length > 0 &&
          products.map((product: any) => (
            <div
              className="max-w-full overflow-hidden md:max-w-md"
              key={product.id}
            >
              <Product product={product} />
            </div>
          ))}
      </div>
      {pageInfo.hasNextPage && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  after: pageInfo.endCursor,
                },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  fetchMoreResult.search.nodes = [
                    ...prevResult.search.nodes,
                    ...fetchMoreResult.search.nodes,
                  ];
                  return fetchMoreResult;
                },
              });
            }}
            variant="outline"
            className="rounded-full"
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default PageContent;

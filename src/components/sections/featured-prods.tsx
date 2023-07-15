"use client";

import React from "react";
import Container from "../ui/container";
import Slider from "react-slick";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Product from "../products/product";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import ProductsSkeletonList from "../products/skeleton-list";

const GET_FEATURED_PRODUCTS = gql`
  query getFeaturedProducts {
    collection(handle: "featured") {
      products(first: 8, sortKey: BEST_SELLING) {
        edges {
          node {
            id
            title
            tags
            vendor
            handle
            availableForSale
            variants(first: 1) {
              edges {
                node {
                  id
                  compareAtPrice {
                    amount
                  }
                  price {
                    amount
                  }
                }
              }
            }
            images(first: 2) {
              edges {
                node {
                  url(transform: { maxHeight: 540, maxWidth: 320 })
                }
              }
            }
            metafield(key: "gender", namespace: "custom") {
              value
            }
          }
        }
      }
    }
  }
`;

const FeaturedProducts = () => {
  const { data, error, loading, refetch } = useQuery(GET_FEATURED_PRODUCTS, {});

  if (error && !loading) {
    return (
      <div className="text-center">
        <p className="text-slate-900 text-lg mb-4">
          There was an error fetching the featured products.
        </p>
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="featured-products-skeleton">
          <ProductsSkeletonList num={3} />
        </div>
      </div>
    );
  }

  const products = data.collection.products.edges.map((edge: any) => {
    const price = edge.node.variants.edges[0].node.price.amount;
    const compareAtPrice =
      edge.node.variants.edges[0].node.compareAtPrice?.amount;
    const variantId = edge.node.variants.edges[0].node.id;

    return {
      id: edge.node.id,
      variantId,
      title: edge.node.title,
      tags: edge.node.tags,
      vendor: edge.node.vendor,
      handle: edge.node.handle,
      price,
      compareAtPrice,
      available: edge.node.availableForSale,
      image: edge.node.images.edges[0].node.url,
      secondaryImage: edge.node.images.edges[1]?.node.url,
      gender: edge.node.metafield?.value,
    };
  });

  return <ProductSlider products={products} />;
};

export default FeaturedProducts;

function ProductSlider({ products }: { products: any }) {
  const setting = {
    infinite: false,
    dots: true,
    speed: 500,
    slidesToShow: 3,
    arrows: true,
    slidesToScroll: 3,
    cssEase: "linear",
  };
  const prevArrow = (
    <Button id="product-carousel-prev" size={"icon"}>
      <ChevronLeft className="w-5 h-5" />
    </Button>
  );
  const nextArrow = (
    <Button id="product-carousel-next" size={"icon"}>
      <ChevronRight className="w-5 h-5" />
    </Button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <Slider
        responsive={[
          {
            breakpoint: 840,
            settings: { slidesToShow: 2, slidesToScroll: 2 },
          },
          {
            breakpoint: 640,
            settings: { slidesToShow: 1, slidesToScroll: 1 },
          },
        ]}
        nextArrow={nextArrow}
        prevArrow={prevArrow}
        {...setting}
      >
        {products.map((product: any) => (
          <div key={product.id}>
            <div className="flex items-center justify-center w-full">
              <Product product={product} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

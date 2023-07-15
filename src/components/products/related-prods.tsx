"use client";

import React from "react";
import Slider from "react-slick";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Product from "../products/product";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import ProductsSkeletonList from "./skeleton-list";

const GET_RELATED_PRODUCTS = gql`
  query getProductRecommendations($id: ID!) {
    productRecommendations(productId: $id) {
      handle
      id
      vendor
      title
      tags
      variants(first: 1) {
        edges {
          node {
            compareAtPrice {
              amount
            }
            id
            price {
              amount
            }
          }
        }
      }
      availableForSale
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
`;

const RelatedProducts = ({ id }: { id: string }) => {
  const { data, error, loading, refetch } = useQuery(GET_RELATED_PRODUCTS, {
    variables: { id },
  });

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
        <div className="related-products-skeleton">
          <ProductsSkeletonList num={4} />
        </div>
      </div>
    );
  }

  const products = data.productRecommendations.map((edge: any) => {
    const price = edge.variants.edges[0].node.price.amount;
    const compareAtPrice = edge.variants.edges[0].node.compareAtPrice?.amount;
    const variantId = edge.variants.edges[0].node.id;

    return {
      id: edge.id,
      variantId,
      title: edge.title,
      tags: edge.tags,
      vendor: edge.vendor,
      handle: edge.handle,
      price,
      compareAtPrice,
      available: edge.availableForSale,
      image: edge.images.edges[0].node.url,
      secondaryImage: edge.images.edges[1]?.node.url,
      gender: edge.metafield?.value,
    };
  });

  return <ProductSlider products={products} />;
};

export default RelatedProducts;

function ProductSlider({ products }: { products: any[] }) {
  const setting = {
    infinite: false,
    dots: false,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
    slidesToScroll: 2,
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
    <Slider
      responsive={[
        {
          breakpoint: 920,
          settings: { slidesToShow: 3, slidesToScroll: 2 },
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 2, slidesToScroll: 2 },
        },
        {
          breakpoint: 540,
          settings: { slidesToShow: 1, slidesToScroll: 1 },
        },
      ]}
      nextArrow={nextArrow}
      prevArrow={prevArrow}
      {...setting}
    >
      {products.map((product) => (
        <div key={product.id}>
          <div className="flex items-center justify-center w-full">
            <Product
              product={{
                ...product,
                tag: product.tag ? product.tag[0] : undefined,
                link: "/",
              }}
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}

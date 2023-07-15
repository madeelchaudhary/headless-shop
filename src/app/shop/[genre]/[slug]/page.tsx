import ProductContent from "@/components/products/prod-content";
import ProductData from "@/components/products/prod-data";
import RelatedProducts from "@/components/products/related-prods";
import BreadCrums from "@/components/ui/breadcurms";
import Container from "@/components/ui/container";
import { storeFetch } from "@/lib/fetch";
import gql from "graphql-tag";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    genre: string;
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

interface BreadCrum {
  name: string;
  href: string;
  link?: {
    name: string;
    href: string;
    link?: BreadCrum["link"];
  };
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { genre, slug } = params;
  const productData: any = await storeFetch(
    GET_PRODUCT,
    { handle: slug },
    { revalidate: 600 }
  );
  return {
    title: productData.data.product.seo.title,
    description: productData.data.product.seo.description,
  };
};

const GET_PRODUCT = gql`
  query getProduct($handle: String) {
    product(handle: $handle) {
      availableForSale
      vendor
      variants(first: 20) {
        edges {
          node {
            availableForSale
            compareAtPrice {
              amount
            }
            id
            title
            selectedOptions {
              name
              value
            }
            quantityAvailable
            price {
              amount
            }
            image {
              url
              id
            }
          }
        }
      }
      title
      tags
      descriptionHtml
      images(first: 10) {
        edges {
          node {
            id
            url
          }
        }
      }
      seo {
        description
        title
      }
      productType
      options(first: 10) {
        name
        values
        id
      }
      handle
      id
      metafield(key: "gender", namespace: "custom") {
        value
      }
    }
  }
`;

const ProductPage = async ({ params }: Props) => {
  const { genre, slug } = params;

  const productData: any = await storeFetch(
    GET_PRODUCT,
    { handle: slug },
    { revalidate: 600 }
  );

  if (!productData || !productData.data) {
    return notFound();
  }

  const product = productData.data.product;
  if (
    product.metafield &&
    product.metafield.value.toLowerCase() !== genre.toLowerCase()
  ) {
    return notFound();
  }
  const productGenre = product.metafield.value;
  const productType = product.productType;

  const breadcrumb: BreadCrum = {
    name: "Browse Products",
    href: "/shop",
    link: undefined,
  };

  if (productGenre) {
    breadcrumb.link = {
      name: productGenre[0].toUpperCase() + productGenre.slice(1),
      href: `/shop/${productGenre}/`,
      link: {
        name: productType[0].toUpperCase() + productType.slice(1),
        href: `/shop/${productGenre}/${productType}/`,
      },
    };
  } else {
    breadcrumb.link = {
      name: productType[0].toUpperCase() + productType.slice(1),
      href: `/shop/${productType}/`,
    };
  }

  return (
    <>
      <main className="py-10">
        <Container>
          <nav aria-label="Breadcrums Navigation" className="ml-4">
            <BreadCrums lastEnabled={true} links={breadcrumb} />
          </nav>
          <ProductContent product={product} />
          <section className="mt-8">
            <ProductData description={product.descriptionHtml} />
          </section>

          <section id="product-carousel" className="py-10">
            <div className="flex justify-between items-center">
              <h2 className="scroll-m-20 font-bold text-slate-900 tracking-tight text-2xl min-[400px]:text-3xl mb-8">
                Related Products
              </h2>
              <div></div>
            </div>
            <RelatedProducts id={product.id} />
          </section>
        </Container>
      </main>
    </>
  );
};

export default ProductPage;

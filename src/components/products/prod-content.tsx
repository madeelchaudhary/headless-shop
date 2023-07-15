"use client";

import React, { useMemo } from "react";
import ImageCarousel from "./img-carousel";
import Rating from "../ui/rating";
import ProductOptions from "./prod-options";
import AddToCart from "./add-to-cart";

const ProductContent = ({ product }: any) => {
  const variants = product.variants.edges;
  const images = product.images.edges;
  const carouselImages = useMemo(() => {
    return images
      .filter((image: any) => {
        const imgInVariant = variants.find(
          (variant: any) => variant.node.image.id === image.node.id
        );
        if (imgInVariant) {
          return false;
        }
        return true;
      })
      .map((image: any) => image.node.url);
  }, [images, variants]);
  const options = product.options;
  const colors = options.find((option: any) => option.name === "Color");
  const sizes = options.find((option: any) => option.name === "Size");
  const [selectedVariant, setSelectedVariant] = React.useState<any>(
    variants[0].node
  );
  const [selectedOptions, setSelectedOptions] = React.useState(() => {
    if (!colors && !sizes) {
      return;
    }

    if (!colors) {
      const size = variants[0].node.selectedOptions.find(
        (option: any) => option.name === "Size"
      );
      return {
        Size: size.value,
      };
    }

    if (!sizes) {
      const color = variants[0].node.selectedOptions.find(
        (option: any) => option.name === "Color"
      );
      return {
        Color: color.value,
      };
    }
    const color = variants[0].node.selectedOptions.find(
      (option: any) => option.name === "Color"
    );
    const size = variants[0].node.selectedOptions.find(
      (option: any) => option.name === "Size"
    );
    return {
      Color: color.value,
      Size: size.value,
    };
  });

  const selectedColor = selectedOptions?.Color;
  const selectedSize = selectedOptions?.Size;

  const selectedVariantImage = selectedVariant.image;

  function handleOptionChange({ target }: any) {
    setSelectedOptions(
      (prev) => ({ ...prev, [target.name]: target.value } as any)
    );
  }

  React.useEffect(() => {
    const variant = variants.find((variant: any) => {
      const color = variant.node.selectedOptions.find(
        (option: any) => option.name === "Color"
      );
      const size = variant.node.selectedOptions.find(
        (option: any) => option.name === "Size"
      );
      return color?.value === selectedColor && size?.value === selectedSize;
    });
    setSelectedVariant(variant.node);
  }, [selectedColor, selectedSize, variants]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-8">
      <div className="max-w-full">
        <ImageCarousel
          images={[selectedVariantImage.url, ...carouselImages].slice(0, 5)}
        />
      </div>
      <div className="max-w-full">
        <h1 className="text-3xl md:text-4xl text-slate-900 font-semibold mb-4">
          {product.title}
        </h1>
        <div className="mb-6">
          <Rating rating={4.9} />
        </div>
        <p className="text-2xl md:text-3xl lg:text-4xl text-slate-900 font-semibold mb-6">
          $ {selectedVariant.price.amount}{" "}
          {selectedVariant.compareAtPrice && (
            <span className="text-gray-600 text-sm line-through align-top mt-1 inline-block">
              $ {selectedVariant.compareAtPrice.amount}
            </span>
          )}
        </p>
        <div className="mb-6">
          {sizes || colors ? (
            <ProductOptions
              onOptionSelect={handleOptionChange}
              sizes={{
                selected: selectedOptions?.Size,
                name: "Size",
                values: sizes.values,
              }}
              colors={{
                selected: selectedOptions?.Color,
                name: "Color",
                values: colors.values,
              }}
            />
          ) : null}
        </div>
        <p className="text-base mb-6">
          {selectedVariant.quantityAvailable === 0 ? (
            <>
              <span className="text-gray-800 font-semibold">
                Out of stock -{" "}
              </span>
              <span className="text-gray-600 font-medium">
                Notify me when available
              </span>
            </>
          ) : (
            <>
              <span className="text-gray-800 font-semibold">
                Last {selectedVariant.quantityAvailable} left -{" "}
              </span>
              <span className="text-gray-600 font-medium">Make it yours!</span>
            </>
          )}
        </p>
        <AddToCart prodId={selectedVariant.id} />
      </div>
    </section>
  );
};

export default ProductContent;

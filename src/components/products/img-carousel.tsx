"use client";
import React, { useRef } from "react";
import Slider from "react-slick";

import "@/styles/slick.css";
import "@/styles/slick-theme.css";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Props {
  images: string[];
}

const ImageCarousel = ({ images }: Props) => {
  const dotsRef: React.MutableRefObject<null | HTMLUListElement> = useRef(null);
  const sliderRef: React.MutableRefObject<null | Slider> = useRef(null);
  const setting = {
    infinite: false,
    dots: true,
    speed: 300,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
    cssEase: "linear",
  };

  const prevArrow = (
    <Button id="product-img-carousel-prev" size={"icon"}>
      <ChevronLeft className="w-5 h-5" />
    </Button>
  );
  const nextArrow = (
    <Button id="product-img-carousel-next" size={"icon"}>
      <ChevronRight className="w-5 h-5" />
    </Button>
  );

  const dots = (
    <ul ref={dotsRef} className="slick-dots ">
      {images.map((img, i) => (
        <li
          onClick={() => {
            if (!sliderRef.current) return;
            sliderRef.current?.slickGoTo(i);
          }}
          data-index={i}
          key={i}
        >
          <div className="aspect-square max-h-44 rounded-lg overflow-hidden">
            <Image
              src={img}
              alt=""
              className="h-full w-full object-cover"
              width={200}
              height={150}
            />
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div id="product-img-carousel" className="mb-32 md:mb-44">
      <Slider
        prevArrow={prevArrow}
        nextArrow={nextArrow}
        ref={sliderRef}
        onInit={() => {
          dotsRef
            .current!.querySelectorAll("li")[0]
            .classList.add("slick-active");
        }}
        afterChange={(currentSlide) => {
          dotsRef.current!.querySelectorAll("li").forEach((li) => {
            if (li.classList.contains("slick-active"))
              li.classList.remove("slick-active");
            if (li.getAttribute("data-index") === currentSlide.toString())
              li.classList.add("slick-active");
          });
        }}
        appendDots={() => dots}
        {...setting}
      >
        {images.map((img, i) => (
          <div
            className="aspect-[4/3] md:m-h-80 lg:m-h-96 rounded-lg overflow-hidden bg-black bg-opacity-50"
            key={i}
          >
            <Image
              src={img}
              alt=""
              className="object-cover w-full h-full opacity-95"
              width={720}
              height={360}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;

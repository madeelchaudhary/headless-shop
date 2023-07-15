"use client";

import React from "react";
import Slider from "react-slick";
import Container from "../ui/container";
import { Button } from "../ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import "../../styles/slick.css";
import "../../styles/slick-theme.css";
import Link from "next/link";

interface Props {
  slides: {
    id: string;
    title: string;
    btnText: string;
    link: string;
    image: string;
  }[];
}

const Hero = ({ slides }: Props) => {
  const setting = {
    infinite: false,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const prevArrow = (
    <Button id="home-carousel-prev" size={"icon"}>
      <ChevronLeft className="w-5 h-5" />
    </Button>
  );
  const nextArrow = (
    <Button id="home-carousel-next" size={"icon"}>
      <ChevronRight className="w-5 h-5" />
    </Button>
  );

  return (
    <section id="home-carousel" className="my-8">
      <Container>
        <Slider
          className="rounded-md overflow-hidden ring-2 ring-slate-200"
          nextArrow={nextArrow}
          prevArrow={prevArrow}
          {...setting}
        >
          {slides.map((slide) => (
            <div className="h-full" key={slide.id}>
              <div
                className="h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="h-full px-2 min-[495px]:px-5 sm:px-8 xl:px-0 bg-black bg-opacity-50 flex flex-col justify-center items-center pb-20 pt-24">
                  <h1 className="text-white text-xl min-[375px]:text-2xl min-[495px]:text-3xl sm:text-5xl md:text-6xl xl:text-[5.2rem] md:leading-tight xl:leading-none text-center font-semibold max-w-5xl mb-[0.5em]">
                    {slide.title}
                  </h1>
                  <Button
                    className="bg-white text-slate-900 text-base flex items-center justify-center gap-x-2 h-auto w-auto px-5 py-3 hover:text-gray-50"
                    size={"icon"}
                    asChild
                  >
                    <Link href={slide.link}>
                      {slide.btnText}
                      <ArrowRight className="w-6 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Hero;

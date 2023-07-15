import React from "react";
import Container from "../ui/container";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const PICKS = [
  {
    label: "Best Seller",
    image: "/imgs/picks/best.jpeg",
    link: "/",
  },
  {
    label: "Shop Men",
    image: "/imgs/picks/men.jpg",
    link: "/",
  },
  {
    label: "Shop Women",
    image: "/imgs/picks/women.jpeg",
    link: "/",
  },
  {
    label: "Shop Casual",
    image: "/imgs/picks/casual.jpg",
    link: "/",
  },
];

const CollectionsPick = () => {
  return (
    <section className="py-14">
      <Container>
        <h2 className="scroll-m-20 font-bold text-slate-900 tracking-tight text-3xl mb-10">
          Currated picks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {PICKS.map((pick, i) => (
            <div
              key={i}
              className="sm:aspect-square max-h-96 rounded-lg overflow-hidden relative group:"
            >
              <div
                className="max-sm:min-h-[20rem] w-full h-full bg-cover bg-no-repeat bg-top"
                style={{ backgroundImage: `url(${pick.image})` }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center">
                <Button
                  className="bg-white text-slate-900 text-base flex items-center justify-between gap-x-2 h-auto w-10/12 px-5 py-3 hover:text-gray-50 absolute bottom-6"
                  size={"icon"}
                >
                  {pick.label} <ArrowRight className="w-6 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CollectionsPick;

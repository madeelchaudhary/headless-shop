import React from "react";
import Container from "../ui/container";
import Image from "next/image";

const BRANDS_LIST = [
  {
    label: "Chanel",
    src: "/imgs/brands/chanel.png",
  },
  {
    label: "Calvin Klein",
    src: "/imgs/brands/calvin-klein.png",
  },
  {
    label: "Guess",
    src: "/imgs/brands/guess.png",
  },
  {
    label: "Gucci",
    src: "/imgs/brands/gucci.jpg",
  },
  {
    label: "Dolce & Gabbana",
    src: "/imgs/brands/dolce-and-gabbana.png",
  },
  {
    label: "Adidas",
    src: "/imgs/brands/adidas.jpg",
  },
  {
    label: "Levi's",
    src: "/imgs/brands/levis.jpg",
  },
  {
    label: "Versace",
    src: "/imgs/brands/versace.jpg",
  },
];

const Brands = () => {
  return (
    <section>
      <Container>
        <h2 className="scroll-m-20 font-bold text-slate-900 tracking-tight text-3xl ">
          Brands
        </h2>
        <div className="grid justify-between justify-items-center grid-cols-[repeat(auto-fit,minmax(75px,auto))] gap-10 py-14">
          {BRANDS_LIST.map((brand, i) => (
            <div key={i}>
              <Image
                src={brand.src}
                alt={brand.label}
                width={128}
                height={56}
                className="max-h-12 w-auto"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Brands;

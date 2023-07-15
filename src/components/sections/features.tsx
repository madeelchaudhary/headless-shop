import Container from "@/components/ui/container";
import Image from "next/image";
import React from "react";

const FEATURES_LIST = [
  {
    label: "Original Products",
    description:
      "We provide money back guarantee if the product is not original",
    iconSrc: "/imgs/features/cash-flow.png",
  },
  {
    label: "Satifaction Guarantee",
    description:
      "Exchange the product you've purchased if it doesn't fit on you",
    iconSrc: "/imgs/features/mask.png",
  },
  {
    label: "New Arrival EveryDay",
    description: "We update our collections almost everyday",
    iconSrc: "/imgs/features/trolley.png",
  },
  {
    label: "Fast & Free Shipping",
    description: "We offer fast and free shipping for our loyal customers",
    iconSrc: "/imgs/features/cargo-truck.png",
  },
];

const Features = () => {
  return (
    <section className="py-14">
      <Container>
        <header className="lg:flex justify-between text-center lg:text-left">
          <h2 className="scroll-m-20 font-semibold text-slate-900 tracking-tight text-3xl lg:text-4xl lg:max-w-sm mb-3">
            We provide best customer expreriences
          </h2>
          <div className="lg:border-l-2 border-slate-900 pl-6 lg:flex items-center">
            <p className="text-gray-500">
              We ensure our customers have the best shopping experience
            </p>
          </div>
        </header>
        <div className="grid grid-cols-1 gap-10 mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURES_LIST.map((feature) => (
            <div key={feature.label} className="flex flex-col ">
              <div className="flex items-center justify-center w-16 h-16 p-2 rounded-md text-slate-900 bg-slate-50 border border-slate-100">
                <Image
                  width={64}
                  height={64}
                  src={feature.iconSrc}
                  className="h-6 max-w-[1.5rem] w-auto"
                  alt={feature.label}
                />
              </div>
              <h3 className="mt-5 text-xl text-slate-900 font-semibold">
                {feature.label}
              </h3>
              <p className="mt-2 text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;

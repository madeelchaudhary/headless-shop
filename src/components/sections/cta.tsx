import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Container from "../ui/container";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Cta = () => {
  return (
    <section className="py-14">
      <Container>
        <Card className="border-none bg-slate-900 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="max-h-96 lg:w-[46%] overflow-hidden">
              <Image
                loading="lazy"
                alt="cta"
                src="/imgs/cta.jpeg"
                className="max-h-full h-full w-full object-cover"
                width={720}
                height={360}
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-8 md:px-10 lg:px-12 lg:w-[54%]">
              <p className="text-gray-200 uppercase">Limited Offer</p>
              <h2 className="scroll-m-20 font-semibold text-white tracking-tight text-3xl sm:text-4xl lg:text-5xl xl:text-[3.45rem] mb-4">
                35% off only this friday and get special gift
              </h2>
              <Button
                className="bg-white text-slate-900 text-base flex items-center justify-center gap-x-2 h-auto px-5 py-3 hover:text-gray-50 w-fit"
                size={"icon"}
              >
                Grab it now <ArrowRight className="w-6 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
};

export default Cta;

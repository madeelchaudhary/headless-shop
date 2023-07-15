import React from "react";
import Container from "../ui/container";
import Logo from "../nav/logo";
import FooterList from "./list";

const LISTS = [
  {
    label: "Shop",
    items: [
      { label: "All Collections", link: "/" },
      { label: "Winter Edition", link: "/" },
      { label: "Discount", link: "/" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About Us", link: "/" },
      { label: "Contact", link: "/" },
      { label: "Affiliates", link: "/" },
    ],
  },
  {
    label: "Support",
    items: [
      { label: "FAQs", link: "/" },
      { label: "Cookie Policy", link: "/" },
      { label: "Terms of Service", link: "/" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-100 pt-14 pb-10 md:pt-16 lg:pt-20 mt-10">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:justify-between lg:grid-cols-12">
          <div className="lg:col-span-3 xl:col-span-4">
            <div className="md:max-w-xs">
              <div className="mb-5">
                <Logo />
              </div>
              <p className="text-gray-500">
                Specializes in providing high-quality, stylish products for your
                wordrobe.
              </p>
            </div>
          </div>
          <nav
            className="space-y-8 md:space-y-0 md:row-start-2 md:col-span-2 lg:row-auto lg:col-span-6 md:grid md:grid-cols-3"
            aria-label="Secondary Navigation"
          >
            {LISTS.map((list, i) => (
              <FooterList key={i} {...list} />
            ))}
          </nav>
          <div className="md:justify-self-end lg:justify-self-auto lg:col-span-3 xl:col-span-2">
            <h3 className="text-lg font-semibold text-slate-700 mb-5">
              Payment Methods
            </h3>
            <div className="flex gap-x-5">
              <img
                src="/imgs/payments/visa.svg"
                alt="visa"
                className="w-10 h-10"
              />
              <img
                src="/imgs/payments/mastercard.svg"
                alt="mastercard"
                className="w-10 h-10"
              />
              <img
                src="/imgs/payments/paypal.svg"
                alt="paypal"
                className="w-10 h-10"
              />
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-14 lg:mt-16 border-t border-gray-200">
          <p className="text-center text-gray-400 font-medium text-sm mt-10">
            Copyright © 2022 Nostra. All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

import React from "react";
import Logo from "./logo";
import NavBar, { MobileNav } from "./navbar";
import Secondary from "./secondary";
import Container from "../ui/container";

const Nav = () => {
  return (
    <header className="py-6 xl:py-8 relative">
      <Container>
        <div className="flex justify-between items-center">
          <Logo />
          <div className="order-2 md:order-none ">
            <div className="md:hidden flex">
              <MobileNav />
            </div>
            <div className="hidden md:block">
              <NavBar />
            </div>
          </div>
          <div className="order-1 flex-1 flex justify-end items-center mr-4 md:mr-0 md:block md:flex-none md:order-none">
            <Secondary />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Nav;

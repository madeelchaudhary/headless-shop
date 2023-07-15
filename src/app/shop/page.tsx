import Cta from "@/components/sections/cta";
import Newsletter from "@/components/sections/newsletter";
import BreadCrums from "@/components/ui/breadcurms";
import Container from "@/components/ui/container";
import React from "react";
import Sidebar from "./sidebar";
import PageContent from "./Content";

const links = {
  name: "Home",
  href: "/",
  link: {
    name: "Browse Products",
    href: "/shop",
  },
};

const ShopPage = async () => {
  return (
    <>
      <main className="pt-10 pb-20">
        <Container>
          <div className="ml-4">
            <BreadCrums links={links} />
          </div>
          <div className="grid md:grid-cols-[28%,72%] lg:grid-cols-[26%,75%] gap-6 mt-8 sm:pr-4">
            {/* Sidebar */}
            <div className="hidden md:block">
              <Sidebar />
            </div>
            {/* Products */}
            <PageContent />
          </div>
        </Container>
        <Cta />
        <Newsletter />
      </main>
    </>
  );
};

export default ShopPage;

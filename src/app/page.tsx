import Brands from "@/components/sections/brands";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import CollectionsPick from "@/components/sections/collections-pick";
import Cta from "@/components/sections/cta";
import Newsletter from "@/components/sections/newsletter";
import Container from "@/components/ui/container";
import FeaturedProducts from "@/components/sections/featured-prods";

const HERO_SLIDES = [
  {
    id: Math.random().toString(),
    title: "Level up your style with our summer collections",
    btnText: "Shop Now",
    link: "/shop",
    image: "/imgs/hero/summer.jpeg",
  },
  {
    id: Math.random().toString(),
    title: "New season, new style. Discover latest collections.",
    btnText: "Shop Now",
    link: "/shop",
    image: "/imgs/hero/new.jpeg",
  },
  {
    id: Math.random().toString(),
    title: "Stomp the streets with our new sneaker collection",
    btnText: "Shop Now",
    link: "/shop",
    image: "/imgs/hero/sneakers.jpg",
  },

  {
    id: Math.random().toString(),
    title: "Sign up now and get 10% off your first order",
    btnText: "Shop Now",
    link: "/shop",
    image: "/imgs/hero/offer.jpeg",
  },
  {
    id: Math.random().toString(),
    title: "Enjoy free shipping on all orders over $100",
    btnText: "Shop Now",
    link: "/shop",
    image: "/imgs/hero/shipping.jpeg",
  },
];

export const revalidate = 5;

export default async function Home() {
  return (
    <>
      <main>
        <Hero slides={HERO_SLIDES} />
        <Brands />
        <Features />
        <CollectionsPick />
        {/* Featured Products */}
        <section id="product-carousel" className="py-14 pb-20">
          <Container>
            <div className="flex justify-between items-center">
              <h2 className="scroll-m-20 font-bold text-slate-900 tracking-tight text-2xl min-[400px]:text-3xl mb-8">
                Featured Products
              </h2>
              <div></div>
            </div>
            <FeaturedProducts />
          </Container>
        </section>

        <Cta />
        <Newsletter />
      </main>
    </>
  );
}

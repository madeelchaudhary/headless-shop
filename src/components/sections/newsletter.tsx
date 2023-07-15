import React from "react";
import Container from "../ui/container";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-14">
      <Container>
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-4 max-w-3xl md:px-8 mx-auto">
          Subscribe to our newsletter to get updates to our latest collections
        </h2>
        <p className="text-center text-gray-600 font-medium">
          Get 20% off on your first order just by subscribing to our newsletter
        </p>
        <div className="flex flex-wrap w-full max-w-md  justify-center mx-auto mt-6 gap-2">
          <div className="relative flex-1">
            <span className="absolute top-1/2 left-4 text-slate-300 -translate-y-1/2">
              <Mail />
            </span>
            <Input
              type="email"
              placeholder="Enter your email"
              className="pl-12 py-3 placeholder:text-slate-400 placeholder:font-medium h-auto w-full min-w-[300px]"
            />
          </div>

          <Button className="h-full py-3 w-full sm:w-auto" type="submit">
            Subscribe
          </Button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">
          You will be able to unsubscribe at any time.
          <br />
          Read our Privacy Policy{" "}
          <Link className="text-slate-900 font-medium underline" href="/">
            here
          </Link>
        </p>
      </Container>
    </section>
  );
};

export default Newsletter;

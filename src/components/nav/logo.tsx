import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      className="uppercase font-bold text-2xl xl:text-3xl text-slate-900"
      href="/"
    >
      Nostra
    </Link>
  );
};

export default Logo;

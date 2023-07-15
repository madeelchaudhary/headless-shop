"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { ShoppingCart, Search } from "lucide-react";
import UserBtn from "./user-btn";
import { Button } from "../ui/button";
import Link from "next/link";
import SearchResults from "./search-results";

const Secondary = () => {
  const [searchfocus, setSearchFocus] = useState(false);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const fieldRef = React.useRef<HTMLInputElement>(null);

  const handleSearchFocus = useCallback((e: FocusEvent) => {
    e.target !== fieldRef.current && setSearchFocus(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(search);
    }, 750);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (searchfocus) {
      document.addEventListener("click", handleSearchFocus);
      fieldRef.current?.focus();
    }
    return () => {
      document.removeEventListener("click", handleSearchFocus);
    };
  }, [searchfocus, handleSearchFocus]);

  return (
    <div className="flex items-center gap-x-4 xl:gap-x-5">
      {searchfocus && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center w-full h-full md:h-3/5 bg-gray-50 z-20 max-w-7xl px-4 md:px-0 md:rounded-md overflow-hidden">
          <div className="relative w-full font-medium text-gray-500">
            <span className="pointer-events-none">
              <Search className="absolute top-1/2 left-3 md:left-5 transform -translate-y-1/2 text-slate-400 w-5 h-6" />
            </span>
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              ref={fieldRef}
              type="search"
              placeholder="Search"
              className="pl-10 py-5 w-full border-none bg-gray-50 focus:ring-0 md:focus-visible:ring-0 md:focus-visible:shadow-none md:h-full md:pl-14 md:text-base focus-visible:ring-offset-0 placeholder:text-gray-400"
            />
          </div>
        </div>
      )}
      {searchfocus && searchTerm && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 flex items-center w-full bg-white z-20 max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 py-5 rounded-lg shadow-md overflow-hidden">
          <SearchResults term={searchTerm} />
        </div>
      )}
      <div className="relative min-w-[240px hidden lg:block">
        <Input
          readOnly
          onClick={(e) => {
            setSearchFocus(true);
          }}
          type="search"
          placeholder="Search"
          className="pl-10 py-5 border-slate-100 bg-gray-50 w-full cursor-pointer"
        />
        <span>
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-400 w-5 h-6 " />
        </span>
      </div>
      <Button
        onClick={() => {
          setSearchFocus(true);
        }}
        className="lg:hidden w-auto h-auto p-0 border-none bg-transparent hover:bg-transparent text-slate-950"
      >
        <Search className="w-[18px] h-[18px]" />
      </Button>
      <div className="hidden md:flex gap-4 items-center">
        <Link href="/cart" aria-label="Go to Cart">
          <ShoppingCart className="w-[18px] h-[18px]" />
        </Link>
        <UserBtn />
      </div>
    </div>
  );
};

export default Secondary;

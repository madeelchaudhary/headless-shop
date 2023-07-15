"use client";
import React, { useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { Button } from "../ui/button";
import { AlignCenter } from "lucide-react";
import { SignInBtn, SignOutBtn } from "../auth/auth";
import CheckAuth from "../auth/checkAuth";
import NotAuth from "../auth/notAuth";

const NAV_LIST = [
  {
    href: "/shop",
    label: "Shop",
  },
  {
    href: "#",
    label: "Most wanted",
  },
  {
    href: "#",
    label: "New arrivals",
  },
  {
    href: "#",
    label: "Brands",
  },
];

const NavBar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NAV_LIST.map((item, i) => (
          <NavigationMenuItem key={i}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavBar;

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          setIsOpen(false);
        }
      });
    }
  }, [isOpen]);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <SheetTrigger onClick={() => setIsOpen(true)}>
        <AlignCenter />
      </SheetTrigger>
      <SheetContent side="left" className="my-own">
        <NavigationMenu
          className="mt-14 max-w-none nav-width-full"
          data-orientation="vertical"
        >
          <NavigationMenuList
            className="flex-col items-start gap-4 space-x-0"
            data-orientation="vertical"
          >
            {NAV_LIST.map((item, i) => (
              <NavigationMenuItem key={i}>
                <SheetClose asChild>
                  <NavigationMenuLink
                    asChild
                    className={
                      navigationMenuTriggerStyle() +
                      " h-auto text-xl !p-0 bg-transparent hover:bg-transparent font-normal"
                    }
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </SheetClose>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem className="w-full">
              <SheetClose asChild>
                <Button className="w-full mt-2" variant="outline" asChild>
                  <Link href="/cart">Cart</Link>
                </Button>
              </SheetClose>
            </NavigationMenuItem>
            <CheckAuth>
              <NavigationMenuItem className="w-full">
                <SheetClose asChild>
                  <Button className="w-full mt-2" variant="outline">
                    My Account
                  </Button>
                </SheetClose>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <SheetClose asChild>
                  <SignOutBtn />
                </SheetClose>
              </NavigationMenuItem>
            </CheckAuth>
            <NotAuth>
              <NavigationMenuItem className="w-full">
                <SheetClose asChild>
                  <Button className="w-full" asChild>
                    <Link href="/auth/signin">Sign in</Link>
                  </Button>
                </SheetClose>
              </NavigationMenuItem>
            </NotAuth>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
}

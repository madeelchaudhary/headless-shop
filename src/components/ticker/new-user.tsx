"use client";
import React, { useEffect } from "react";
import { AlertDescription, Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "@/components/ui/container";
import { X } from "lucide-react";
import { getCookie, setCookie } from "@/lib/cookie";

const NewUserTicker = () => {
  const [show, setShow] = React.useState(true);

  useEffect(() => {
    let userTickerData = getCookie("newUserTicker");
    if (userTickerData === "1" || userTickerData === "true") {
      setShow(false);
    }
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Alert className="border-none rounded-none bg-gray-900 text-gray-50 !px-0 py-3">
      <Container>
        <div className="relative flex gap-4 justify-between">
          <AlertDescription className="md:ml-auto">
            <p>
              Sign up and{" "}
              <span className="text-white font-medium">GET 20% OFF</span> for
              your first order.{" "}
              <Link href="#" className="text-white font-medium underline">
                Sign up now
              </Link>
            </p>
          </AlertDescription>
          <Button
            onClick={() => {
              setCookie("newUserTicker", "1", 30 * 24);
              setShow(false);
            }}
            className="h-auto p-0 md:ml-auto self-start"
            variant={"link"}
          >
            <X className="w-5 h-5 text-gray-50" />
          </Button>
        </div>
      </Container>
    </Alert>
  );
};

export default NewUserTicker;

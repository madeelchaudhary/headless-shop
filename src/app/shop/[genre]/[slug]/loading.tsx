import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="py-10">
      <Container>
        <div aria-label="Breadcrums Navigation" className="ml-4">
          <Skeleton className="w-72 h-6 rounded-lg" />
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-8">
          <div className="max-w-full">
            <div id="product-img-carousel" className="mb-32 md:mb-44">
              <div>
                <div className="aspect-[4/3] md:m-h-80 lg:m-h-96 rounded-lg overflow-hidden">
                  <Skeleton className="w-full h-full opacity-95" />
                </div>
                <ul className="slick-dots ">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>
                      <div className="aspect-square max-h-44 rounded-lg overflow-hidden">
                        <Skeleton className="h-full w-full" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-full">
            <Skeleton className="w-40 h-20 rounded-lg mb-4" />
            <div className="mb-6">
              <Skeleton className="w-40 h-5 rounded-lg" />
            </div>
            <div className="mb-6">
              <Skeleton className="w-24 h-10 rounded-lg" />
            </div>
            <div className="mb-6">
              <div>
                <Separator className="h-[3px] bg-slate-100" />
                <div className="flex flex-wrap gap-x-14 lg:gap-x-20 gap-y-6 py-7">
                  <div>
                    <div className="mb-3">
                      <Skeleton className="w-20 h-6 rounded-lg" />
                    </div>
                    <div className="flex gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="w-6 h-6 rounded-full" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3">
                      <Skeleton className="w-20 h-6 rounded-lg" />
                    </div>
                    <div className="h-1/2 flex items-center gap-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i}>
                          <div
                            className={`w-6 h-6 flex justify-center items-center rounded-full border-2 border-slate-200`}
                          >
                            <Skeleton className="w-3 h-3 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-100" />
              </div>
            </div>
            <div className="mb-6">
              <Skeleton className="w-48 h-5 rounded-lg" />
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center justify-center">
                <Skeleton className="w-28 h-12" />
              </div>
              <div className="inline-flex gap-2">
                <Skeleton className="w-28 h-12 rounded-lg" />
                <Skeleton className="w-28 h-12 rounded-lg" />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Loading;

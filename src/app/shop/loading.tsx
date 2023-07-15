import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import ProductsSkeletonList from "@/components/products/skeleton-list";

const Loading = () => {
  return (
    <div className="pt-10 pb-20">
      <Container>
        <div className="ml-4">
          <div className="flex gap-x-2">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-20 h-5 rounded-lg" />
          </div>
        </div>
        <div className="grid md:grid-cols-[28%,72%] lg:grid-cols-[25%,75%] gap-6 mt-8">
          {/* Sidebar */}
          <div className="hidden md:block">
            <div className="border border-gray-200 w-full rounded-lg p-4 pb-6">
              <div className="flex flex-col gap-x-2 px-3">
                <div className="py-4 border-b border-slate-100">
                  <Skeleton className="w-20 h-5 rounded-lg" />
                </div>
                <div className="py-4 border-b border-slate-100">
                  <Skeleton className="w-20 h-5 rounded-lg" />
                </div>
                <div className="py-4 border-b border-slate-100">
                  <Skeleton className="w-20 h-5 rounded-lg" />
                </div>
                <div className="py-4 border-b border-slate-100">
                  <Skeleton className="w-20 h-5 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
          {/* Products */}
          <div className="sm:pr-4">
            <div className="flex justify-end gap-4 mb-6">
              <div className="md:hidden">
                <Skeleton className="w-20 h-5 rounded-lg" />
              </div>
              <div>
                <Skeleton className="w-20 h-5 rounded-lg" />
              </div>
            </div>
            <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 shop-products-skeleton">
              <ProductsSkeletonList num={9} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Loading;

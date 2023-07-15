import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductsSkeletonList = ({ num }: { num: number }) => {
  const array = Array.from({ length: num }, (_, i) => i);
  return (
    <>
      {array.map((i) => (
        <div key={i} className="w-full">
          <div className="w-full">
            <div className="aspect-[3/4] w-full max-h-[30rem] rounded-lg overflow-hidden relative">
              <Skeleton className="absolute inset-0 z-10 block" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="w-3/4">
                <Skeleton className="h-7 w-full mb-1" />
                <Skeleton className="h-9 w-1/4 " />
              </div>
              <Skeleton className="rounded-lg w-10 h-10" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsSkeletonList;

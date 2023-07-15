import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const Loading = () => {
  return (
    <div className="mt-10 pb-8 md:pb-14">
      <Container>
        <div className="grid gap-5 lg:gap-8 md:grid-cols-5 lg:grid-cols-12">
          <div className="col-span-3 lg:col-span-8">
            <Skeleton className="w-40 h-12" />
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="uppercase text-gray-500 ">
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex gap-4 flex-wrap">
                          <div className="aspect-square min-w-[110px] max-h-28 rounded-lg border border-gray-200 overflow-hidden">
                            <Skeleton className="w-full h-full" />
                          </div>
                          <div>
                            <Skeleton className="w-44 h-7 mb-2" />
                            <Skeleton className="w-20 h-5" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="flex justify-center border border-slate-200 rounded-lg w-28 h-11">
                          <Skeleton className="w-full h-full" />
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        <Skeleton className="w-20 h-7" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-4 md:max-w-md">
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <Skeleton className="w-12 h-6" />
                    <Skeleton className="w-12 h-6" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="w-12 h-6" />
                    <Skeleton className="w-12 h-6" />
                  </div>
                </div>
                <Separator className="bg-slate-100" />
                <div className="flex justify-between items-center">
                  <Skeleton className="w-12 h-6" />
                  <Skeleton className="w-12 h-6" />
                </div>
                <Skeleton className="w-full h-12" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Loading;

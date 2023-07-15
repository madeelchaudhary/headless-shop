import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import sanizite from "sanitize-html";

interface Props {
  description: string;
}

const ProductData = ({ description }: Props) => {
  const sanitizeHtml = sanizite(description);
  return (
    <div>
      <Tabs defaultValue="details">
        <TabsList className="flex bg-transparent h-auto text-gray-500 rounded-none mb-10 overflow-x-auto">
          <TabsTrigger
            className="text-base flex-1 bg-transparent rounded-none px-4 py-3 border-b-2 border-slate-100 data-[state=active]:border-slate-950 ring-0 shadow-none data-[state=active]:shadow-none"
            value="details"
          >
            The Details
          </TabsTrigger>
          <TabsTrigger
            className="text-base flex-1 bg-transparent rounded-none px-4 py-3 border-b-2 border-slate-100 data-[state=active]:border-slate-950 ring-0 shadow-none data-[state=active]:shadow-none"
            value="reviews"
          >
            Ratings & Reviews
          </TabsTrigger>
          <TabsTrigger
            className="text-base flex-1 bg-transparent rounded-none px-4 py-3 border-b-2 border-slate-100 data-[state=active]:border-slate-950 ring-0 shadow-none data-[state=active]:shadow-none"
            value="discussion"
          >
            Discussion
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div
            className="product-details"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml }}
          ></div>
        </TabsContent>
        <TabsContent value="reviews">
          <p className="text-base mb-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt
            temporibus quia, suscipit doloremque hic sequi ad accusamus vero,
            nisi dicta eveniet. Sapiente placeat minus laudantium vero
            reprehenderit praesentium at ab.
          </p>
        </TabsContent>
        <TabsContent value="discussion">
          <p className="text-base mb-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt
            temporibus quia, suscipit doloremque hic sequi ad accusamus vero,
            nisi dicta eveniet. Sapiente placeat minus laudantium vero
            reprehenderit praesentium at ab.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductData;

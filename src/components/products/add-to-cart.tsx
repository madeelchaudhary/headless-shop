import React from "react";
import { Button } from "../ui/button";
import { Loader2, Minus, Plus } from "lucide-react";
import useAddToCart from "@/hooks/add-to-cart";

const AddToCart = ({ prodId }: { prodId: string }) => {
  const [qty, setQty] = React.useState(1);

  const { handleAddToCart, loading } = useAddToCart();

  function increment() {
    setQty((prev) => {
      if (prev === 5) return prev;
      return prev + 1;
    });
  }

  function decrement() {
    setQty((prev) => {
      if (prev === 1) return prev;
      return prev - 1;
    });
  }

  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex items-center justify-center font-medium border border-slate-200 py-1 px-4 rounded-lg">
        <div className="flex gap-x-5 items-center justify-center">
          <Button
            disabled={qty === 1}
            onClick={decrement}
            className="text-slate-800 text-base h-auto w-auto p-0 bg-transparent hover:bg-transparent"
            size={"icon"}
          >
            <Minus className="w-4" />
          </Button>
          <span>{qty}</span>
          <Button
            disabled={qty === 5}
            onClick={increment}
            className="text-slate-800 text-base h-auto w-auto p-0 bg-transparent hover:bg-transparent"
            size={"icon"}
          >
            <Plus className="w-4" />
          </Button>
        </div>
      </div>
      <div className="inline-flex gap-2">
        <Button
          className="text-slate-900 text-base h-auto w-auto px-6 py-3 font-medium"
          size={"icon"}
          variant={"outline"}
        >
          Buy Now
        </Button>
        <Button
          className="bg-slate-900 text-slate-50 text-base h-auto w-auto px-5 py-3 font-medium"
          size={"icon"}
          disabled={loading}
          onClick={() => handleAddToCart(prodId, qty)}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
              Wait
            </>
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;

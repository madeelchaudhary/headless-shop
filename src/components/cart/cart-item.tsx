import React from "react";
import { TableRow, TableCell } from "../ui/table";
import Image from "next/image";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import useCartUpdate from "@/hooks/cart-item-update";

const CartItem = ({
  product,
  refetch,
}: {
  product: any;
  refetch: () => Promise<any>;
}) => {
  const qty = product.quantity;
  const { handleRemoveFromCart, handleUpdateCart, loading } = useCartUpdate();

  function increment() {
    if (qty >= product.quantityAvailable) return;
    handleUpdateCart(product.id, qty + 1, product.merchandiseId, refetch);
  }

  function decrement() {
    if (qty === 1) return;
    handleUpdateCart(product.id, qty - 1, product.merchandiseId, refetch);
  }

  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-4 flex-wrap relative pb-20 sm:pb-0">
          <div className="aspect-square max-h-20 min-[415px]:max-h-28 rounded-lg border border-gray-200 overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              className="object-cover w-full h-full"
              width={200}
              height={200}
            />
          </div>
          <div className="absolute bottom-2 left-0 sm:static">
            <h3 className="mb-2 font-semibold text-slate-800 text-base sm:text-lg max-w-[180px] lg:max-w-xs whitespace-pre overflow-hidden text-ellipsis">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500">{product.variantTitle}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="align-top">
        <div className="flex flex-col gap-2 items-center justify-center font-medium ">
          <div className="flex gap-x-5 items-center justify-center px-4  border border-slate-200 py-2 rounded-lg">
            <Button
              disabled={qty === 1 || loading}
              onClick={decrement}
              className="text-slate-800 text-base h-auto w-auto p-0 bg-transparent hover:bg-transparent"
              size={"icon"}
            >
              <Minus className="w-4" />
            </Button>
            <span className="text-base">{qty}</span>
            <Button
              disabled={qty >= product.quantityAvailable || loading}
              onClick={increment}
              className="text-slate-800 text-base h-auto w-auto p-0 bg-transparent hover:bg-transparent"
              size={"icon"}
            >
              <Plus className="w-4" />
            </Button>
          </div>
          <Button
            onClick={() =>
              handleRemoveFromCart(product.id, product.merchandiseId, refetch)
            }
            className="py-0 px-0 w-auto h-auto bg-transparent hover:bg-transparent text-gray-500"
          >
            <Trash2 className="w-4 mr-2" />
            Remove
          </Button>
        </div>
      </TableCell>
      <TableCell className="align-top">
        <p className="text-slate-900 font-semibold text-lg">${product.price}</p>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;

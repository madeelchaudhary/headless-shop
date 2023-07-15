import { Separator } from "@/components/ui/separator";
import React from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import colorPallete from "@/lib/colors";

interface Props {
  sizes: {
    selected: string | null;
    name: string;
    values: string[];
  };
  colors: {
    selected: string | null;
    name: string;
    values: string[];
  };
  onOptionSelect: ({ target }: any) => void;
}

const ProductOptions = ({ sizes, colors, onOptionSelect }: Props) => {
  return (
    <div>
      <Separator className="h-[3px] bg-slate-100" />
      <div className="flex flex-wrap gap-x-14 lg:gap-x-20 gap-y-6 py-7">
        {sizes.values.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">
              Available Size
            </h3>
            <div className="flex gap-2">
              {sizes.values.map((size) => (
                <button
                  role={"option"}
                  aria-selected={size === sizes.selected}
                  onClick={() =>
                    onOptionSelect({
                      target: { name: sizes.name, value: size },
                    })
                  }
                  key={size}
                  className={`py-2 px-4 rounded-lg border border-slate-300 text-slate-900 font-medium aria-selected:bg-slate-900 aria-selected:text-slate-100`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        {colors.values.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">
              Available Color
            </h3>
            <div className="h-1/2 flex items-center gap-3">
              <TooltipProvider>
                {colors.values.map((color) => (
                  <div key={color}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          role={"option"}
                          aria-selected={color === colors.selected}
                          onClick={() =>
                            onOptionSelect({
                              target: { name: colors.name, value: color },
                            })
                          }
                          key={color}
                          className={`w-6 h-6 flex justify-center items-center rounded-full border-2 border-slate-200 text-slate-900 aria-selected:border-slate-900`}
                        >
                          <span
                            className={`w-3 h-3 rounded-full inline-block opacity-90 `}
                            style={{
                              backgroundColor:
                                colorPallete[
                                  color.toLowerCase() as keyof typeof colorPallete
                                ] || color,
                            }}
                          ></span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{color}</TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>

      <Separator className="bg-slate-100" />
    </div>
  );
};

export default ProductOptions;

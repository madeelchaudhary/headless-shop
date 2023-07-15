"use client";
import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  setBrand,
  setSize,
  setType,
  setPrice as setFilterPrice,
} from "@/store/filterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ApolloError, useQuery } from "@apollo/client";
import gql from "graphql-tag";

import React, { useEffect, useMemo } from "react";

const ALL_FILTERS = gql`
  query getFilters {
    products(first: 250) {
      edges {
        node {
          productType
          metafield(key: "gender", namespace: "custom") {
            value
          }
        }
      }
    }
    search(productFilters: {}, query: "", first: 250) {
      productFilters {
        id
        label
        type
        values {
          count
          id
          input
          label
        }
      }
    }
  }
`;

const Sidebar = () => {
  const toast = useToast();
  const filters = useAppSelector((state) => state.filters);
  const [price, setPrice] = React.useState({
    min: "",
    max: "",
  });

  function handleError(
    error: ApolloError | { message: string },
    reload?: () => void
  ) {
    toast.toast({
      title: "Error",
      description: error.message,
      action: reload && (
        <ToastAction onClick={reload} altText="Retry">
          Retry
        </ToastAction>
      ),
    });
  }

  const { data, loading, error, refetch } = useQuery(ALL_FILTERS, {
    onError: (error) => {
      handleError(error, refetch);
    },
  });
  const dispatch = useAppDispatch();

  const brandsAndCount = useMemo(() => {
    if (!data) return;
    const vendorData = data.search.productFilters.find(
      (filter: any) => filter.id === "filter.p.vendor"
    );
    return vendorData.values;
  }, [data]);

  const priceRange = useMemo(() => {
    if (!data) return;
    const rangeData = data.search.productFilters.find(
      (filter: any) => filter.id === "filter.v.price"
    );
    const range = JSON.parse(rangeData.values[0].input);
    return range;
  }, [data]);

  const maxPrice = filters.filters.price.max;
  const minPrice = filters.filters.price.min;

  useEffect(() => {
    if (maxPrice === 0 && minPrice === 0) {
      setPrice({ min: "", max: "" });
    }
  }, [maxPrice, minPrice]);

  const sizesAndCount = useMemo(() => {
    if (!data) return;
    const sizeData = data.search.productFilters.find(
      (filter: any) => filter.id === "filter.v.option.size"
    );
    return sizeData.values;
  }, [data]);

  const gendersAndTypes = useMemo(() => {
    if (!data) return;
    const categoryData: { [key: string]: { [key: string]: number } } = {};
    data.products.edges.forEach((edge: any) => {
      if (!(edge.node.metafield.value in categoryData)) {
        categoryData[edge.node.metafield.value] = {
          [edge.node.productType]: 1,
        };
      } else {
        if (!(edge.node.productType in categoryData[edge.node.metafield.value]))
          categoryData[edge.node.metafield.value][edge.node.productType] = 1;
        else
          categoryData[edge.node.metafield.value][edge.node.productType] += 1;
      }
    });
    return Object.entries(categoryData);
  }, [data]);

  function handleApplyPrice() {
    const priceMax = Number(price.max);
    const priceMin = Number(price.min);
    if (!priceMax && !priceMin) return;

    if (!priceMin && priceMax > priceRange.price.min) {
      dispatch(setFilterPrice({ min: 0, max: priceMax }));
      return;
    }

    if (!priceMax && priceMin <= priceRange.price.max) {
      dispatch(setFilterPrice({ min: priceMin, max: 0 }));
      return;
    }

    if (
      price.min > price.max ||
      priceMin > priceRange.price.max ||
      priceMax < priceRange.price.min
    )
      return;
    dispatch(setFilterPrice({ min: priceMin, max: priceMax }));
  }

  return (
    <div className="border border-gray-200 w-full rounded-lg p-4 pb-6">
      <Accordion
        collapsible={true}
        className="text-gray-600"
        type="single"
        title="Filters"
      >
        <AccordionItem value="1">
          <AccordionTrigger className="px-3 text-gray-600 hover:no-underline aria-expanded:bg-slate-100 rounded-md ">
            Category
          </AccordionTrigger>
          <AccordionContent className="pl-5 pr-4 pt-4">
            {error && (
              <div className="text-red-500 text-sm">
                <p>Error: {error.message}</p>
                <Button
                  className="ml-2 h-auto px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                  onClick={() => refetch()}
                >
                  Retry
                </Button>
              </div>
            )}
            {loading && <p>Loading...</p>}
            {data && data.products.edges && (
              <Accordion collapsible={true} type="single" typeof="Genders">
                {gendersAndTypes?.map(([gender, genderOpts]: any) => (
                  <AccordionItem
                    className="border-b-0"
                    key={gender}
                    value={gender}
                  >
                    <AccordionTrigger className="px-3 text-gray-600 hover:no-underline aria-expanded:bg-slate-100 rounded-md ">
                      {gender}
                    </AccordionTrigger>
                    <AccordionContent className="pl-5 pr-4 pt-4">
                      <ul className="flex flex-col gap-3">
                        {Object.entries(genderOpts).map(([type, count]) => (
                          <li
                            className="flex justify-between items-center"
                            key={type}
                          >
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={type}
                                className="text-sm rounded-md"
                                checked={
                                  filters.filters.type === type &&
                                  gender === filters.filters.gender
                                }
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    dispatch(setType({ gender, type }));
                                  }
                                }}
                              />
                              <Label htmlFor={type}>{type}</Label>
                            </div>
                            <Badge className="text-xs bg-gray-100 text-gray-800">
                              {count as number}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger className="px-3 text-gray-600 hover:no-underline aria-expanded:bg-slate-100 rounded-md ">
            Brands
          </AccordionTrigger>
          <AccordionContent className="pl-5 pr-4 pt-4">
            {error && (
              <div className="text-red-500 text-sm">
                <p>Error: {error.message}</p>
                <Button
                  className="ml-2 h-auto px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                  onClick={() => refetch()}
                >
                  Retry
                </Button>
              </div>
            )}
            {loading && <p>Loading...</p>}
            {data && data.search.productFilters && (
              <ul className="space-y-2">
                {brandsAndCount.map((brand: any) => (
                  <li
                    className="flex justify-between items-center"
                    key={brand.id}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={brand.id}
                        className="text-sm rounded-md"
                        checked={filters.filters.brand === brand.label}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            dispatch(setBrand(brand.label));
                          }
                        }}
                      />
                      <Label htmlFor={brand.id}>{brand.label}</Label>
                    </div>
                    <Badge className="text-xs bg-gray-100 text-gray-800">
                      {brand.count}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger className="px-3 text-gray-600 hover:no-underline aria-expanded:bg-slate-100 rounded-md ">
            Price
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div>
              <div className="flex items-center justify-between gap-1">
                <Input
                  value={price.min}
                  onChange={(e) =>
                    setPrice((prev) => ({
                      ...prev,
                      min: e.target.value,
                    }))
                  }
                  placeholder="Min"
                  type="number"
                  max={priceRange?.price?.max}
                  min={0}
                />
                <span className="text-gray-600">-</span>
                <Input
                  placeholder="Max"
                  type="number"
                  min={priceRange?.price?.min}
                  value={price.max}
                  onChange={(e) =>
                    setPrice((prev) => ({
                      ...prev,
                      max: e.target.value,
                    }))
                  }
                />
                <Button onClick={handleApplyPrice} className="h-auto w-auto">
                  Apply
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-none" value="4">
          <AccordionTrigger className="px-3 text-gray-600 hover:no-underline aria-expanded:bg-slate-100 rounded-md ">
            Size
          </AccordionTrigger>
          <AccordionContent className="pl-5 pr-4 pt-4">
            {error && (
              <div className="text-red-500 text-sm">
                <p>Error: {error.message}</p>
                <Button
                  className="ml-2 h-auto px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                  onClick={() => refetch()}
                >
                  Retry
                </Button>
              </div>
            )}
            {loading && <p>Loading...</p>}
            {data && data.search.productFilters && (
              <ul className="space-y-2">
                {sizesAndCount.map((size: any) => (
                  <li
                    className="flex justify-between items-center"
                    key={size.id}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={size.id}
                        className="text-sm rounded-md"
                        checked={filters.filters.size === size.label}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            dispatch(setSize(size.label));
                          }
                        }}
                      />
                      <Label htmlFor={size.id}>{size.label}</Label>
                    </div>
                    <Badge className="text-xs bg-gray-100 text-gray-800">
                      {size.count}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;

import { DocumentNode } from "graphql";

export async function storeFetch(
  body: string | DocumentNode,
  variables?: any,
  options?: NextFetchRequestConfig | undefined
) {
  const query = typeof body === "string" ? body : body.loc?.source.body;
  const res = await fetch(process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: query,
      variables,
    }),
    next: options,
  });

  const json = await res.json();
  return json;
}

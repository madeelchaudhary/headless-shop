export default function getProductUrl(
  handle: string,
  gender: string | null
): string {
  if (!gender) {
    return `/shop/${handle}`;
  }

  return `/shop/${gender.toLowerCase()}/${handle}`;
}

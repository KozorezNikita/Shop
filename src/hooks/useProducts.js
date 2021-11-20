import { useMemo } from "react";

export const useSortedProducts = (products, sort) => {
  const sortedProducts = useMemo(() => {
    if (sort) {
      return [...products].sort((a, b) =>
        a[sort] === b[sort] ? 0 : a[sort] > b[sort] ? 1 : -1
      );
    }
    return products;
  }, [sort, products]);
  return sortedProducts;
};

export const useProducts = (products, sort, text) => {
  const sortedProducts = useSortedProducts(products, sort);
  const sortedandSearchedProducts = useMemo(() => {
    return sortedProducts.filter(
      (product) =>
        product.title.toLowerCase().indexOf(text.toLowerCase()) !== -1
    );
  }, [text, sortedProducts]);
  return sortedandSearchedProducts;
};

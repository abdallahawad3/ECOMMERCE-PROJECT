import type { IProduct } from "../interfaces";

export const sliceText = (tsx: string, maxVal: number) => {
  if (tsx.length > maxVal) {
    return `${tsx.slice(0, maxVal)}...`;
  }
  return tsx;
};

export const addItemToShoppingCart = (cartItems: IProduct[], product: IProduct) => {
  //** exist ==>  increase quantity
  const exists = cartItems.find((item) => item.id === product.id);
  if (exists) {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  //** not exists => increase the product
  return [...cartItems, { ...product, quantity: 1 }];
};

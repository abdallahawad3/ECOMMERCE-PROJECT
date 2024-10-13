import toast from "react-hot-toast";
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
    // Displaying a success toast notification
    toast.success("This product exists, increase the quantity. 😊", {
      duration: 3000, // Duration in milliseconds
      position: "top-right", // Position on the screen
      icon: "✅", // Custom icon
      style: {
        background: "#4caf50", // Background color
        color: "#fff", // Text color
      },
    });
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  //** not exists => increase the product
  toast.success("Added To Your Cart");
  return [...cartItems, { ...product, quantity: 1 }];
};

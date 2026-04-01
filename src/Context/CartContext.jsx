// ------------------- PRODUCT ADD, UPDATE OR REMOVE ------------------------//
// CartContext.jsx
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    setCartItem((prev) => {
      console.log("CartItem :", cartItem);

      const itemInCart = prev.find((item) => item.id === product.id);

      if (itemInCart) {
        // If item already in cart, increase quantity
        toast.success("Quantity increased in cart");
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      } else {
        // New product add with quantity 1
        toast.success("Product added to cart");
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Update quantity of a product
  const UpdateQuantity = (productId, action) => {
    setCartItem((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            let newQty = item.quantity;

            if (action === "increase") {
              newQty += 1;
              toast.success("Quantity increased");
            } else if (action === "decrease") {
              newQty -= 1;
              // Show message only if item fully removed
              if (newQty <= 0) {
                toast.error("Item removed from cart");
              } else {
                toast.info("Quantity decreased");
              }
            }

            // Remove item if quantity <= 0
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item) => item !== null),
    );
  };

  // Remove item completely from cart
  const removeItem = (productId) => {
    setCartItem((prev) => {
      toast.error("Item removed from cart");
      return prev.filter((item) => item.id !== productId);
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItem, addToCart, UpdateQuantity, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using CartContext
export const useCart = () => useContext(CartContext);

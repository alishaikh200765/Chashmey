import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "chashmey_cart";

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, { qty = 1, color, size, lens } = {}) => {
    let newLineId = null;
    setItems((prev) => {
      const lineId = `${product._id}-${color || "default"}-${size || product.size || "default"}-${Date.now()}`;
      newLineId = lineId;
      return [
        ...prev,
        {
          lineId,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          color: color || product.colorSwatches?.[0] || null,
          size: size || product.size,
          qty,
          lens: lens || null, // { type, prescriptionMethod, sph/cyl/axis/add per eye, pd } or null = frame only
        },
      ];
    });
    return newLineId;
  };

  const attachLens = (lineId, lens) => {
    setItems((prev) => prev.map((i) => (i.lineId === lineId ? { ...i, lens } : i)));
  };

  const removeFromCart = (lineId) => {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId));
  };

  const updateQty = (lineId, qty) => {
    if (qty < 1) return removeFromCart(lineId);
    setItems((prev) => prev.map((i) => (i.lineId === lineId ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        attachLens,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

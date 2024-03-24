"use client";
import { createContext, useState } from "react";

export const GlobalContext = createContext(null as any);

export default function GlobalState({ children }: { children: any }) {
  const [pageLevelLoader, setPageLevelLoader] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setIsAuthUser] = useState({});
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  return (
    <GlobalContext.Provider
      value={{
        pageLevelLoader,
        setPageLevelLoader,
        cartItems,
        address,
        wishlist,
        setWishlist,
        setAddress,
        setCartItems,
        isAuthUser,
        setIsAuthUser,
        componentLevelLoader,
        setComponentLevelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

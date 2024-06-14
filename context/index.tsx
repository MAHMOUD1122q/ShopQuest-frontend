"use client";
import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const GlobalContext = createContext(null as any);

export default function GlobalState({ children }: { children: any }) {
  const [pageLevelLoader, setPageLevelLoader] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isAuthUser, setIsAuthUser] = useState({} as any);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathName.includes("admin-view")) {
      if (isAuthUser?.role !== "admin") {
        router.push("/unauthorized-page");
      }
    }
  }, [ pathName ,isAuthUser, router]);

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
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

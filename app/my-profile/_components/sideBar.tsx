"use client";
import { GlobalContext } from "@/context";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState, useContext } from "react";

import { useRouter } from "next/navigation";

export default function SideBar() {
  const { cartItems, address, setAddress, setIsAuthUser, setCartItems } =
    useContext(GlobalContext);
  const router = useRouter();
  const logout = async (e: any) => {
    fetch("https://shopquest-backend.onrender.com/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setIsAuthUser(null);
      setCartItems(0);
      router.push("/");
    });
  };

  return (
    <div className=" lg:mx-10 mx-4 mb-5 lg:mb-0  border h-fit rounded-lg lg:basis-2/12 w-fit ">
      <ul className=" flex flex-wrap lg:block ">
        <li
          className=" lg:mb-4 mb-0 text-lg cursor-pointer py-2 lg:px-6 px-4 hover:bg-slate-300 duration-300"
          onClick={() => router.push("/my-profile")}
        >
          {" "}
          your profie
        </li>
        <li
          className=" lg:mb-4 mb-0 text-lg cursor-pointer py-2 lg:px-6 px-4 hover:bg-slate-300 duration-300"
          onClick={() => router.push("/my-profile/orders")}
        >
          {" "}
          orders
        </li>
        <li
          className=" lg:mb-4 mb-0 text-lg cursor-pointer py-2 lg:px-6 px-4 hover:bg-slate-300 duration-300"
          onClick={() => router.push("/my-profile/my-address")}
        >
          {" "}
          your address
        </li>
        <li
          className=" lg:mb-4 mb-0 text-lg cursor-pointer py-2 lg:px-6 px-4 hover:bg-slate-300 duration-300"
          onClick={() => router.push("/my-profile/my-wishlist")}
        >
          {" "}
          your wishlist
        </li>
        <li
          className="text-lg cursor-pointer py-2 lg:px-6 px-4  hover:bg-slate-300 duration-300"
          onClick={logout}
        >
          {" "}
          logout
        </li>
      </ul>
    </div>
  );
}

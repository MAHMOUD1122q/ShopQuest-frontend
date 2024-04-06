/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/context";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cartItems, setCartItems } = useContext(GlobalContext);
  const router = useRouter();
  const incrementCartItem = async (id: any) => {
    const data = await fetch(
      `https://shopquest-backend.onrender.com/api/auth/increment-item-cart/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const finalData = await data.json();
    if (finalData.success) {
      fetch("https://shopquest-backend.onrender.com/api/auth/all-cart", {
        credentials: "include",
      }).then((response) => {
        response.json().then((data) => {
          setCartItems(data);
        });
      });
    }
  };
  const decrementCartItem = async (id: any) => {
    const data = await fetch(
      `https://shopquest-backend.onrender.com/api/auth/dencrement-item-cart/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const finalData = await data.json();
    if (finalData.success) {
      fetch("https://shopquest-backend.onrender.com/api/auth/all-cart", {
        credentials: "include",
      }).then((response) => {
        response.json().then((data) => {
          setCartItems(data);
        });
      });
    }
  };

  const deleteCartItem = async (id: any) => {
    const data = await fetch(
      `https://shopquest-backend.onrender.com/api/auth/delete-item-cart/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const finalData = await data.json();
    if (finalData.success) {
      fetch("https://shopquest-backend.onrender.com/api/auth/all-cart", {
        credentials: "include",
      }).then((response) => {
        response.json().then((data) => {
          setCartItems(data);
        });
      });
      toast({
        variant: "success",
        title: finalData.message,
      });
    }
  };

  const cartItemsCount = cartItems.count;

  return (
    <>
      <title>Cart</title>
      <div className=" flex flex-col lg:flex-row justify-between lg:mx-10 mx-2 mb-5">
        <div className=" border-sky-600 border basis-3/5 mb-4 lg:mb-0">
          <h3 className=" p-5 text-2xl">({cartItemsCount}) Cart</h3>
          <div className=" p-5">
            {cartItems.data === null || cartItems.data === undefined ? (
              <p>the cart is emty </p>
            ) : cartItems.data.length === 0 ? (
              <p>the cart is empty </p>
            ) : (
              cartItems.data.map((item: any) => (
                <div key={item._id} className=" flex mt-6 relative">
                  <span
                    className=" absolute top-0 bg-sky-600 text-white rounded-full h-6 w-6 flex justify-center items-center lg:right-10 right-0 cursor-pointer duration-300"
                    onClick={() => deleteCartItem(item._id)}
                  >
                    x
                  </span>
                  <img
                    src={item.productID.images[0]}
                    alt=""
                    className=" w-24 h-24"
                  />
                  <div className="mx-5 relative w-full">
                    <p>product :{item.productID.name}</p>
                    <p className=" flex md:justify-center items-center capitalize">
                      <span
                        className={` text-sky-600 cursor-pointer text-3xl  mr-2 ${
                          item.quantity <= 1
                            ? " pointer-events-none opacity-65 "
                            : ""
                        }`}
                        onClick={() => decrementCartItem(item._id)}
                      >
                        -
                      </span>{" "}
                      quantity: {item.quantity}{" "}
                      <span
                        className=" text-sky-600 cursor-pointer text-3xl  ml-2"
                        onClick={() => incrementCartItem(item._id)}
                      >
                        +
                      </span>{" "}
                    </p>
                    <p className="md:mt-[-30px]">
                      price:{" "}
                      {item.productID.isSale === true
                        ? item.productID.price - item.productID.discount
                        : item.productID.price}
                      EGB
                    </p>
                    <p className=" flex items-center mt-3">
                      {item.color === undefined || item.color === "" ? null : (
                        <>
                          color :{" "}
                          <p
                            className={`bg-[${item.color}] w-5 h-5 rounded-full ml-2`}
                          ></p>
                        </>
                      )}
                      {item.size === undefined || item.size === "" ? null : (
                        <p className=" ml-4">size : {item.size}</p>
                      )}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className=" basis-2/6 border-sky-600 border h-fit p-4">
          <h3 className=" font-semibold text-xl"> cart details</h3>
          <div>
            <p className=" mt-2">number of product: {cartItemsCount}</p>
            <div className=" my-4 ">
              total price :{" "}
              {cartItems && cartItems.data
                ? cartItems.data.reduce(
                    (total: any, item: any) =>
                      item.productID.isSale === true
                        ? (item.productID.price - item.productID.discount) *
                            item.quantity +
                          total
                        : item.productID.price + total,
                    0
                  ) + " EGB"
                : "0 EGB"}
            </div>
            <button
              className=" w-full py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 duration-500 "
              onClick={() => router.push("/checkout")}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

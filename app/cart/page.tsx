/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/context";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cartItems, setCartItems, isAuthUser } = useContext(GlobalContext);
  const router = useRouter();
  let dis = false;
  useEffect(() => {
    try {
      fetch("http://localhost:4000/api/auth/all-cart", {
        credentials: "include",
        headers: {
          Authorization: "Bearer " + isAuthUser?.token,
        },
      }).then((response) => {
        response.json().then((data) => {
          try {
            setCartItems(data);
          } catch (e) {}
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, [setCartItems, isAuthUser]);
  const incrementCartItem = async (id: any) => {
    const data = await fetch(
      `http://localhost:4000/api/auth/increment-item-cart/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + isAuthUser?.token,
        },
      }
    );
    const finalData = await data.json();
    if (finalData.success) {
      fetch("http://localhost:4000/api/auth/all-cart", {
        credentials: "include",
        headers: {
          Authorization: "Bearer " + isAuthUser?.token,
        },
      }).then((response) => {
        response.json().then((data) => {
          setCartItems(data);
        });
      });
    }
  };
  const decrementCartItem = async (id: any) => {
    const data = await fetch(
      `http://localhost:4000/api/auth/dencrement-item-cart/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + isAuthUser?.token,
        },
      }
    );
    const finalData = await data.json();
    if (finalData.success) {
      fetch("http://localhost:4000/api/auth/all-cart", {
        credentials: "include",
        headers: {
          Authorization: "Bearer " + isAuthUser?.token,
        },
      }).then((response) => {
        response.json().then((data) => {
          setCartItems(data);
        });
      });
    }
  };

  const deleteCartItem = async (id: any) => {
    const data = await fetch(
      `http://localhost:4000/api/auth/delete-item-cart/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + isAuthUser?.token,
        },
      }
    );
    const finalData = await data.json();
    if (finalData.success) {
      fetch("http://localhost:4000/api/auth/all-cart", {
        credentials: "include",
        headers: {
          Authorization: "Bearer " + isAuthUser?.token,
        },
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
      <title>Shopa</title>
      <div
        className=" flex flex-col lg:flex-row justify-between lg:mx-10 mx-2 mb-5"
        dir="rtl"
      >
        <div className=" border-sky-600 border basis-3/5 mb-4 lg:mb-0">
          <h3 className=" p-5 text-2xl">({cartItemsCount}) السلة</h3>
          <div className=" p-5">
            {cartItems.data === null || cartItems.data === undefined ? (
              <p> السلة فارفة </p>
            ) : cartItems.data.length === 0 ? (
              <p> السلة فارفة </p>
            ) : (
              cartItems.data.map((item: any) => (
                <div key={item._id} className=" flex mt-6 relative">
                  {item.productID.isShow === false ||
                  item.productID === undefined ||
                  item.productID.status === "Sold" ? (
                    <>
                      {item.productID.isShow === false ||
                      item.productID === undefined ||
                      item.productID.status === "Sold"
                        ? (dis = true)
                        : (dis = false)}
                      <div className=" absolute w-full h-full bg-slate-300/70 z-[200] text-center p-4">
                        <h3>هذا المننج غير متوفر يجب ازاله من السله</h3>
                        <button
                          className=" bg-red-600 rounded-lg text-white py-2 px-4 hover:bg-red-700 duration-300"
                          onClick={() => deleteCartItem(item._id)}
                        >
                          ازاله من السله
                        </button>
                      </div>
                    </>
                  ) : null}
                  <span
                    className=" absolute z-40 top-0 bg-sky-600 text-white rounded-full h-6 w-6 flex justify-center items-center lg:left-10 left-0 cursor-pointer duration-300"
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
                    <p>{item.productID.name}</p>
                    <p className=" flex md:justify-center items-center capitalize">
                      <span
                        className={` text-sky-600 cursor-pointer text-3xl  ml-2 ${
                          item.quantity <= 1
                            ? " pointer-events-none opacity-65 "
                            : ""
                        }`}
                        onClick={() => decrementCartItem(item._id)}
                      >
                        -
                      </span>{" "}
                      الكمية: {item.quantity}{" "}
                      <span
                        className=" text-sky-600 cursor-pointer text-3xl  mr-2"
                        onClick={() => incrementCartItem(item._id)}
                      >
                        +
                      </span>{" "}
                    </p>
                    <p className="md:mt-[-30px]">
                      السعر:{" "}
                      {item.productID.isSale === true
                        ? item.productID.price - item.productID.discount
                        : item.productID.price
                        }
                      ج.م
                    </p>
                    <p className=" flex items-center mt-3">
                      {item.color === undefined || item.color === "" ? null : (
                        <>
                          اللون :{" "}
                          <p
                            className={`w-5 h-5 rounded-full mr-2`}
                            style={{ backgroundColor: `${item.color}` }}
                          ></p>
                        </>
                      )}
                      {item.size === undefined || item.size === "" ? null : (
                        <p className=" mr-4">المقاس : {item.size}</p>
                      )}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className=" basis-2/6 border-sky-600 border h-fit p-4">
          <h3 className=" font-semibold text-xl"> تفاصيل الطلب</h3>
          <div>
            <p className=" mt-2"> عدد المنتجات: {cartItemsCount}</p>
            <div className=" my-4 ">
              اجمالي السعر:{" "}
              {cartItems && cartItems.data
                ? cartItems.data.reduce(
                    (total: any, item: any) =>
                      item.productID.isSale === true
                        ? (item.productID.price - item.productID.discount) *
                            item.quantity +
                          total
                        : item.productID.price * item.quantity + total,
                    0
                  ) + " ج.م "
                : "0 ج.م "}
            </div>
            <button
              className=" w-full py-2 rounded-xl disabled:opacity-60 disabled:pointer-events-none bg-sky-600 text-white hover:bg-sky-700 duration-500 "
              onClick={() => router.push("/checkout")}
              disabled={
                cartItems.data === null || cartItems.data === undefined
                  ? true
                  : cartItems.data.length === 0 || dis
                  ? true
                  : false
              }
            >
              استكمال الطلب
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

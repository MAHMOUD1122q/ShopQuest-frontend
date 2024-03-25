/* eslint-disable @next/next/no-img-element */

"use client";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/context";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const [selecting, setSelecting] = useState("" as any);
  const { cartItems, address, setAddress } = useContext(GlobalContext);
  const [discountData, setDiscountData] = useState(0);
  const [coupon, setCoupon] = useState("");

  const checkCoupon = async (e: any) => {
    e.preventDefault();
    const data = await fetch(`https://shopquest-backend.onrender.com/api/coupon/check-coupon`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: coupon,
      }),
    });
    const finalData = await data.json();
    if (finalData.success) {
      setDiscountData(finalData.discount);
      toast({
        variant: "success",
        title: finalData.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: finalData.message,
      });
    }
  };

  const createOrder = async (e: any) => {
    e.preventDefault();
    const response = await fetch("https://shopquest-backend.onrender.com/api/order/add-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        shippingAddress: {
          fullName: selecting.fullName,
          address: selecting.address,
          mobile: selecting.mobile,
          anotherMobile: selecting.anotherMobile,
          country: selecting.country,
        },
        orderItems: cartItems.data.map((item: any) => ({
          qty: item.quantity,
          productId: item.productID,
          productImage: item.productID.images[0],
          productName: item.productID.name,
          productPrice:
            item.productID.isSale === true
              ? item.productID.price - item.productID.discount
              : item.productID.price,
          color: item.color,
          size: item.size,
        })),
        totalPrice:
          cartItems.data.reduce(
            (total: any, item: any) =>
              item.productID.isSale === true
                ? (item.productID.price - item.productID.discount) *
                    item.quantity +
                  total
                : item.productID.price + total,
            0
          ) -
          (discountData === undefined
            ? 0
            : discountData === 0
            ? 0
            : discountData),
      }),
    });
    const finalData = await response.json();
    if (finalData.success) {
      toast({
        variant: "success",
        title: finalData.message,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      toast({
        variant: "destructive",
        title: finalData.message,
      });
    }
  };

  useEffect(() => {
    fetch("https://shopquest-backend.onrender.com/api/address/all-address", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        setAddress(data);
      });
    });
  }, []);
  const router = useRouter();
  const cartItemsCount = cartItems.count;
  return (
    <>
      <title>shopQuest</title>
      <div className=" flex justify-between flex-col lg:flex-row mx-8 mb-5">
        <div className=" border-sky-600 border basis-2/4 h-fit p-5 lg:mb-0 mb-4">
          <h3 className="  text-2xl">Shipping address details</h3>
          <p className="text-gray-400 font-bold">
            Complete your order by selecting address below
          </p>
          <div className="">
            {address === undefined ||
            address === null ||
            address.data === null ||
            address.data === undefined ? null : address.data.length === 0 ? (
              <>
                <p className="mt-5 capitalize"> no address added</p>
                <button
                  className=" bg-sky-600 text-white py-2 rounded-xl px-10 mt-2  hover:bg-sky-700 duration-300 "
                  onClick={() => router.push("/my-profile/add-address")}
                >
                  add address{" "}
                </button>
              </>
            ) : (
              <>
                {address.data.map((address: any) => (
                  <>
                    <div
                      className={` border p-6 mt-4 relative ${
                        selecting === address ? " border-sky-600" : ""
                      }`}
                      onClick={() => setSelecting(address)}
                    >
                      <div>
                        <p>fullname : {address.fullName}</p>
                        <p className=" md:inline">mobile : {address.mobile}</p>
                        <p className=" md:inline md:ml-20">
                          anotherMobile :{" "}
                          {address.anotherMobile === "" ? (
                            <span>nothing</span>
                          ) : (
                            <span> {address.anotherMobile}</span>
                          )}
                        </p>
                        <p>country : {address.country}</p>
                        <p>address : {address.address}</p>
                      </div>
                    </div>
                  </>
                ))}
                <button
                  className=" bg-sky-600 text-white py-2 rounded-xl px-10 mt-4  hover:bg-sky-700 duration-300 "
                  onClick={() => router.push("/my-profile/add-address")}
                >
                  add new address{" "}
                </button>
              </>
            )}
          </div>
        </div>
        <div className=" basis-[45%] border-sky-600 border h-fit p-7">
          <h3 className=" font-semibold text-xl"> order summery</h3>
          {cartItems.data === null || cartItems.data === undefined ? (
            <p>the cart is emty </p>
          ) : cartItems.data.length === 0 ? (
            <p>the cart is empty </p>
          ) : (
            cartItems.data.map((item: any) => (
              <div key={item._id} className=" flex mt-3 relative">
                <img
                  src={item.productID.images[0]}
                  alt=""
                  className=" w-20 h-20"
                />
                <div className=" flex flex-col md:flex-row">
                  <div className=" mx-5 relative">
                    <p>product :{item.productID.name}</p>
                    <p className="">quantity: {item.quantity} </p>
                    <p className=" flex items-center ">
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
                  <div>
                    <p className=" md:mx-0 mx-5 ">
                      price:{" "}
                      {item.productID.isSale === true
                        ? item.productID.price - item.productID.discount
                        : item.productID.price}
                      EGB
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className=" flex justify-between mt-5">
            <p>subTotal ({cartItemsCount}) : </p>
            <p>
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
            </p>
          </div>
          <div className=" flex justify-between mt-5">
            <p>shapping : </p>
            <p>
              0 EGB
            </p>
          </div>
          <div className=" my-3">
            <form onSubmit={checkCoupon}>
              <label htmlFor="">enter the coupon</label>
              <input
                type="text"
                className="block p-2 mt-2 w-full opacity-100 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
                name="coupon"
                value={coupon}
                onChange={(e: any) => setCoupon(e.target.value)}
              />
              <button className=" bg-sky-600 text-white rounded-lg py-2 px-4 hover:bg-sky-700 mt-2 duration-300">
                {" "}
                apply
              </button>
            </form>
            <div>
              {discountData === undefined ? null : discountData === 0 ? null : (
                <p className=" mt-2">discount : -{discountData} EGB</p>
              )}
            </div>
          </div>
          <div className=" flex justify-between mt-5 border-t pt-2">
            <p>total Price : </p>
            <p>
              {cartItems && cartItems.data
                ? cartItems.data.reduce(
                    (total: any, item: any) =>
                      item.productID.isSale === true
                        ? (item.productID.price - item.productID.discount) *
                            item.quantity +
                          total
                        : item.productID.price + total,
                    0
                  ) -
                  (discountData === undefined
                    ? 0
                    : discountData === 0
                    ? 0
                    : discountData) +
                  " EGB"
                : "0 EGB"}
            </p>
          </div>
          <form onSubmit={createOrder}>
            <button
             className=" w-full bg-sky-600 py-2 disabled:opacity-65 disabled:pointer-events-none text-white mt-4 hover:bg-sky-700 duration-300 rounded-xl"
             disabled ={selecting === "" ? true : false }
             >
              checkout
            </button>
            {
              selecting === '' ? <span className=" text-red-600"> must choose address</span> : null
            }
          </form>
        </div>
      </div>
    </>
  );
}

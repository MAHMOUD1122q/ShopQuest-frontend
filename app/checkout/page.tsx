/* eslint-disable @next/next/no-img-element */

"use client";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/context";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ComponentLevelLoader from "@/components/Loader/componentlevel";

export default function Checkout() {
  const [selecting, setSelecting] = useState("" as any);
  const {
    setCartItems,
    cartItems,
    address,
    setAddress,
    isAuthUser,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);
  const [discountData, setDiscountData] = useState(0);
  const [coupon, setCoupon] = useState("");
  let dis = false;

  const checkCoupon = async (e: any) => {
    e.preventDefault();
    const data = await fetch(`http://localhost:4000/api/coupon/check-coupon`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + isAuthUser?.token,
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

  const createOrder = async (e: any) => {
    setPageLevelLoader(true);
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/order/add-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + isAuthUser?.token,
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
      setPageLevelLoader(false);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      toast({
        variant: "destructive",
        title: finalData.message,
      });
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    fetch("http://localhost:4000/api/address/all-address", {
      headers: {
        Authorization: "Bearer " + isAuthUser?.token,
      },
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        setAddress(data);
      });
    });
  }, [isAuthUser]);
  const router = useRouter();
  const cartItemsCount = cartItems.count;
  return (
    <>
      <title>shopQuest</title>
      <div
        className=" flex justify-between flex-col lg:flex-row mx-8 mb-5"
        dir="rtl"
      >
        <div className=" border-sky-600 border basis-2/4 h-fit p-5 lg:mb-0 mb-4">
          <h3 className="  text-2xl">تفاصيل عنوان الشحن</h3>
          <p className="text-gray-400 font-bold">
            أكمل طلبك عن طريق تحديد العنوان أدناه
          </p>
          <div className="">
            {address === undefined ||
            address === null ||
            address.data === null ||
            address.data === undefined ? null : address.data.length === 0 ? (
              <>
                <p className="mt-5 capitalize"> لم تتم إضافة أي عنوان</p>
                <button
                  className=" bg-sky-600 text-white py-2 rounded-xl px-10 mt-2  hover:bg-sky-700 duration-300 "
                  onClick={() => router.push("/my-profile/add-address")}
                >
                  اضف عنوان{" "}
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
                        <p>الاسم كامل : {address.fullName}</p>
                        <p className=" md:inline">
                          {" "}
                          رقم الهاتف : {address.mobile}
                        </p>
                        <p className=" md:inline md:mr-20">
                          رقم هاتف اخر :{" "}
                          {address.anotherMobile === "" ? (
                            <span> لا يوجد </span>
                          ) : (
                            <span> {address.anotherMobile}</span>
                          )}
                        </p>
                        <p> المحافظة : {address.country}</p>
                        <p> العنوان : {address.address}</p>
                      </div>
                    </div>
                  </>
                ))}
                <button
                  className=" bg-sky-600 text-white py-2 rounded-xl px-10 mt-4  hover:bg-sky-700 duration-300 "
                  onClick={() => router.push("/my-profile/add-address")}
                >
                  اضافة عنوان جديد{" "}
                </button>
              </>
            )}
          </div>
        </div>
        <div className=" basis-[45%] border-sky-600 border h-fit p-7">
          <h3 className=" font-semibold text-xl"> ملخص الطلب </h3>
          {cartItems.data === null || cartItems.data === undefined ? (
            <p> السله فارغة </p>
          ) : cartItems.data.length === 0 ? (
            <p> السله فارغة </p>
          ) : (
            cartItems.data.map((item: any) => (
              <div key={item._id} className=" flex mt-3 relative">
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
                <img
                  src={item.productID.images[0]}
                  alt=""
                  className=" w-20 h-20"
                />
                <div className=" flex flex-col md:flex-row">
                  <div className=" mx-5 relative">
                    <p>{item.productID.name}</p>
                    <p className="">الكمية: {item.quantity} </p>
                    <p className=" flex items-center ">
                      {item.color === undefined || item.color === "" ? null : (
                        <>
                          اللون :{" "}
                          <p
                            className={` w-5 h-5 rounded-full ml-2`}
                            style={{ backgroundColor: `${item.color}` }}
                          ></p>
                        </>
                      )}
                      {item.size === undefined || item.size === "" ? null : (
                        <p className=" ml-4"> المقاس : {item.size}</p>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className=" md:mx-0 mx-5 ">
                      السعر:{" "}
                      {item.productID.isSale === true
                        ? item.productID.price - item.productID.discount
                        : item.productID.price}
                      ج.م
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className=" flex justify-between mt-5">
            <p> سعر المنتجات ({cartItemsCount}) : </p>
            <p>
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
            </p>
          </div>
          <div className=" flex justify-between mt-5">
            <p>سعر الشحن : </p>
            <p>0 ج.م </p>
          </div>
          <div className=" my-3">
            <form onSubmit={checkCoupon}>
              <label htmlFor=""> ادخل الكوبون </label>
              <input
                type="text"
                className="block p-2 mt-2 w-full opacity-100 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
                name="coupon"
                value={coupon}
                onChange={(e: any) => setCoupon(e.target.value)}
              />
              <button className=" bg-sky-600 text-white rounded-lg py-2 px-4 hover:bg-sky-700 mt-2 duration-300">
                {" "}
                تاكيد
              </button>
            </form>
            <div>
              {discountData === undefined ? null : discountData === 0 ? null : (
                <p className=" mt-2">خصم : -{discountData} ج.م</p>
              )}
            </div>
          </div>
          <div className=" flex justify-between mt-5 border-t pt-2">
            <p> المستحق للدفع: </p>
            <p>
              {cartItems && cartItems.data
                ? cartItems.data.reduce(
                    (total: any, item: any) =>
                      item.productID.isSale === true
                        ? (item.productID.price - item.productID.discount) *
                            item.quantity +
                          total
                        : item.productID.price * item.quantity + total,
                    0
                  ) -
                  (discountData === undefined
                    ? 0
                    : discountData === 0
                    ? 0
                    : discountData) +
                  " ج.م"
                : "0 ج.م"}
            </p>
          </div>
          <form onSubmit={createOrder}>
            <button
              className=" w-full bg-sky-600 py-2 disabled:opacity-65 disabled:pointer-events-none text-white mt-4 hover:bg-sky-700 duration-300 rounded-xl"
              disabled={
                cartItems.data === null || cartItems.data === undefined
                  ? true
                  : cartItems.data.length === 0 || selecting === "" || dis
                  ? true
                  : false
              }
            >
              {pageLevelLoader ? (
                <ComponentLevelLoader
                  text={" لحظة من فضلك "}
                  loading={pageLevelLoader}
                />
              ) : (
                " ارسال الطلب "
              )}
            </button>
            {selecting === "" ? (
              <span className=" text-red-600"> يجب اختيار العنوان </span>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
}

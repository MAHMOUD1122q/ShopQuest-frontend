/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/context";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
export default function MyWishList() {
  const [wishList, setWishList] = useState([]);
  const router = useRouter();

  const { isAuthUser, setCartItems, setWishlist } = useContext(GlobalContext);

  const addToWishList = async (getItem: any) => {
    const response = await fetch(
      `http://localhost:4000/api/auth/add-wishlist`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + isAuthUser?.token,
        },
        credentials: "include",
        body: JSON.stringify({
          prodId: getItem._id,
        }),
      }
    );
    const finalData = await response.json();
    if (finalData.success) {
      fetch("http://localhost:4000/api/auth/all-wishlist", {
        credentials: "include",
        headers: {
          Authorization: "Bearer " + isAuthUser?.token,
        },
      }).then((response) => {
        response.json().then((data) => {
          setWishlist(data.data.wishlist);
          setWishList(data.alldata.wishlist);
        });
      });
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
  useEffect(() => {
    fetch("http://localhost:4000/api/auth/all-wishlist", {
      credentials: "include",
      headers: {
        Authorization: "Bearer " + isAuthUser?.token,
      },
    }).then((response) => {
      response.json().then((data) => {
        setWishList(data.alldata.wishlist);
      });
    });
  }, [isAuthUser]);

  return (
    <>
      <title> Shopa </title>
      <div className=" border p-5 w-full ">
        <div className="">
          <h3 className=" text-2xl font-semibold "> قائمة المفضلة </h3>
          <div>
            <div className="">
              {wishList === undefined || wishList.length === 0 ? (
                <>
                  <p className="mt-5 capitalize"> لا يوجد منتجات في المفضلة </p>
                </>
              ) : (
                <>
                  {wishList.map((wishList: any) => (
                    <>
                      <div className=" border p-6 mt-4 relative">
                        <span
                          className=" absolute md:left-5 md:top-5 top-0 left-0 rounded-xl md:rounded-none bg-black p-2 md:p-0 text-white md:text-black md:bg-white cursor-pointer"
                          onClick={() => addToWishList(wishList)}
                        >
                          X
                        </span>
                        <div className=" flex flex-col md:flex-row">
                          <img
                            src={wishList.images[0]}
                            className=" md:w-32 md:h-32 w-full h-52  rounded-xl"
                            alt=""
                          />
                          <div className=" mr-4">
                            <p className=" mb-2 mt-2 md:mt-0">
                              {" "}
                              {wishList.name}{" "}
                            </p>
                            <p className="mb-2">
                              {" "}
                              فئة المنتج : {wishList.category}
                            </p>
                            <p className="mb-2">
                              {" "}
                              السعر :{" "}
                              {wishList.isSale === true ? (
                                <>
                                  <span className=" text-slate-400 line-through ">
                                    {wishList.price}{" "}
                                  </span>{" "}
                                  {wishList.price - wishList.discount} ج.م
                                </>
                              ) : (
                                <span>{wishList.price} </span>
                              )}
                            </p>
                          </div>
                          <div className=" md:ml-10 ml-4 mt-3 md:mt-0">
                            حالة المنتج :{" "}
                            {wishList.status === "default" ? (
                              <p className=" text-green-600 inline">متاح</p>
                            ) : wishList.status === "New" ? (
                              <p className=" text-green-600 inline">متاح</p>
                            ) : (
                              <p className=" text-red-600 inline">
                                {wishList.status}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          className=" md:absolute mt-6 md:mt-0 disabled:opacity-65 disabled:pointer-events-none mr-4 md:ml-0 md:left-4 md:top-14 rounded-lg  bg-sky-600 py-2 text-white duration-300 hover:bg-sky-700 lg:px-10 px-4 "
                          disabled={wishList.status === "Sold" ? true : false}
                          onClick={() =>
                            router.push(`/product/${wishList._id}`)
                          }
                        >
                          عرض المنتج
                        </button>
                      </div>
                    </>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

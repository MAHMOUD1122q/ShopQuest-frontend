/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/context";
import { toast } from "../ui/use-toast";

export default function Navbar() {
  const [focus, setFocus] = useState("opacity-100");
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  const {
    setIsAuthUser,
    isAuthUser,
    cartItems,
    setCartItems,
    setAddress,
    setWishlist,
  } = useContext(GlobalContext);

  const router = useRouter();

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

  useEffect(() => {
    fetch("https://shopquest-backend.onrender.com/api/auth/all-cart", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        setCartItems(data);
      });
    });
  }, [setCartItems]);

  useEffect(() => {
    fetch("https://shopquest-backend.onrender.com/api/auth/all-wishlist", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        setWishlist(data.data.wishlist);
      });
    });
  }, [setWishlist]);

  useEffect(() => {
    fetch("https://shopquest-backend.onrender.com/api/auth/profile", {
      method: "GET"
      credentials: "include",
    })
      .then((response) => {
        response.json().then((data) => {
          setIsAuthUser(data);
        });
      })
      .catch((err) => {
        console.log(err);
        setIsAuthUser(null);
        setCartItems(0);
        setAddress(null);
        setWishlist(null);
      });
  }, []);

  const logout = async (e: any) => {
    fetch("https://shopquest-backend.onrender.com/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setIsAuthUser(null);
      setCartItems(0);
      setAddress(null);
      setWishlist(null);
      router.push("/");
    });
  };

  const cartItemsCount = cartItems.count;
  const auth = isAuthUser?.email;
  const admin = isAuthUser?.role === "admin";
  return (
    <>
      <nav className=" shadow-md z-[900] fixed w-full top-0 bg-white">
        <div className=" flex flex-wrap justify-between items-center mx-10 pt-4 pb-3 ">
          <Image src="/ShopQuest.png" alt="logo" height={130} width={130} />
          <ul className=" lg:flex flex-1 ml-16 hidden ">
            <li
              className={` mr-4 py-2 px-4 duration-300 cursor-pointer  hover:bg-sky-200/20 hover:text-sky-700 ${
                pathname.endsWith("/") ? " text-sky-700 bg-sky-200/20" : null
              } rounded-md`}
              onClick={() => router.push("/")}
            >
              Home
            </li>
            <li
              className={`py-2 px-4 duration-300 cursor-pointer hover:bg-sky-200/20 hover:text-sky-700 ${
                pathname.endsWith("/shop")
                  ? " text-sky-700 bg-sky-200/20"
                  : null
              } rounded-md`}
              onClick={() => router.push("/shop")}
            >
              Shop
            </li>
          </ul>
          <div>
            <div className="items-center px-4 lg:flex justify-center hidden">
              <div className="relative mr-3">
                <div
                  className={`absolute top-3 left-3 items-center ${focus} duration-300`}
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <form
                  action={() => router.push(`/shop/search?search=${search}`)}
                >
                  <input
                    type="text"
                    className="block p-2 pl-10 w-96 opacity-100 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
                    name="search"
                    placeholder="Search Here..."
                    onFocus={() => setFocus("opacity-0")}
                    onBlur={() => setFocus(" opacity-100")}
                    onChange={(e: any) => setSearch(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>
          <div>
            <Popover>
              <PopoverTrigger className=" relative mr-6">
                <p className=" absolute top-[-18px] right-0 bg-sky-600 rounded-full text-white w-6 h-6 flex items-center justify-center">
                  {cartItemsCount}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 mx-3 text-gray-700/70"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </PopoverTrigger>
              <PopoverContent className=" w-[500px] mr-4 z-[1000]">
                <div className=" h-fit max-h-96 overflow-y-scroll">
                  {cartItems.data === null || cartItems.data === undefined ? (
                    <p>the cart is empty </p>
                  ) : cartItems.data.length === 0 ? (
                    <p>the cart is empty </p>
                  ) : (
                    cartItems.data.map((item: any) => (
                      <div key={item._id} className=" flex mt-3 relative">
                        <span
                          className=" absolute top-0 bg-sky-600 text-white rounded-full h-6 w-6 flex justify-center items-center right-10 cursor-pointer duration-300"
                          onClick={() => deleteCartItem(item._id)}
                        >
                          x
                        </span>
                        <img
                          src={item.productID.images[0]}
                          alt=""
                          className=" w-24 h-24"
                        />
                        <div className=" mx-5">
                          <p>name :{item.productID.name}</p>
                          <p>
                            price:{" "}
                            {item.productID.isSale === true
                              ? item.productID.price - item.productID.discount
                              : item.productID.price}
                            EGB
                          </p>
                          <p className=" flex items-center">
                            {item.color === undefined ||
                            item.color === "" ? null : (
                              <>
                                color :{" "}
                                <p
                                  className={`bg-[${item.color}] w-5 h-5 rounded-full ml-2`}
                                ></p>
                              </>
                            )}
                            {item.size === undefined ||
                            item.size === "" ? null : (
                              <p className=" ml-4">size : {item.size}</p>
                            )}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div>
                  <div className=" flex justify-between ">
                    {cartItems.data === null ||
                    cartItems.data === undefined ? null : cartItems.data
                        .length === 0 ? null : (
                      <button
                        className=" mt-5 bg-sky-600 text-white hover:bg-sky-700 duration-300 py-2 px-8"
                        onClick={() => router.push("/cart")}
                      >
                        continue
                      </button>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {/* <Popover>
              <PopoverTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 mx-3 text-gray-700/70"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] mr-3">
                <h3 className=" text-sky-700">Messages</h3>
                <ul>
                  <div className=" flex items-center">
                    <li className=" list-disc ml-4 bg-sky-200/20 p-2 text-sky-600 my-2 text-sm">
                      use copone shop50 to get 50% discont
                    </li>
                
                  </div>
                  <div className=" flex items-center">
                    <li className=" list-disc ml-4 bg-sky-200/20 p-2 text-sky-600 my-2 text-sm">
                      {" "}
                      <span className=" text-xs">(14-10-2024 )</span>use copone
                      shop50 to get 50% discont end in (14-11-2024)
                    </li>
                  </div>
                </ul>
              </PopoverContent>
            </Popover> */}
            <Popover>
              <PopoverTrigger className="lg:inline-block hidden ">
                {auth ? (
                  <img
                    src={isAuthUser.image}
                    alt="logo"
                    className="w-[40px] h-[40px]"
                  />
                ) : (
                  <Image
                    src="/default_avatar.png"
                    alt="logo"
                    width={40}
                    height={40}
                    className="ml-2"
                  />
                )}
              </PopoverTrigger>
              <PopoverContent className=" w-[300px] z-[1000]">
                {auth ? (
                  <ul className=" p-2">
                    <li
                      className="mb-2 text-md font-semibold hover:pl-1 hover:bg-sky-200/20 duration-300 capitalize cursor-pointer text-sky-600 border-b-[1px] py-2"
                      onClick={() => router.push("/my-profile")}
                    >
                      my profile
                    </li>
                    <li
                      className="text-md font-semibold hover:pl-1 hover:bg-sky-200/20 duration-300 capitalize cursor-pointer text-sky-600 py-2"
                      onClick={logout}
                    >
                      logout
                    </li>
                    {admin ? (
                      <li
                        className="text-md font-semibold hover:pl-1 hover:bg-sky-200/20 duration-300 capitalize cursor-pointer text-sky-600 border-t-[1px] py-2"
                        onClick={() => router.push("/admin-view")}
                      >
                        admin
                      </li>
                    ) : null}
                  </ul>
                ) : (
                  <ul className=" p-2">
                    <li
                      className=" mb-2 text-md font-semibold hover:pl-1 hover:bg-sky-200/20 duration-300 capitalize cursor-pointer text-sky-600 border-b-[1px] py-2"
                      onClick={() => router.push("/login")}
                    >
                      login
                    </li>
                    <li
                      className="text-md font-semibold hover:pl-1 hover:bg-sky-200/20 duration-300 capitalize cursor-pointer text-sky-600 py-2"
                      onClick={() => router.push("/register")}
                    >
                      register
                    </li>
                  </ul>
                )}
              </PopoverContent>
            </Popover>
            <Sheet>
              <SheetTrigger className="lg:hidden mx-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </SheetTrigger>
              <SheetContent className="bg-white text-white z-[1000]">
                <SheetHeader>
                  <SheetTitle>
                    <div className="logo">
                      <h3 className="logo-grediant text-3xl"> AL JAZEERA </h3>
                    </div>
                  </SheetTitle>
                  <SheetDescription className="flex">
                    <div className=" h-fit w-[40px]">
                      {auth ? (
                        <img
                          src={isAuthUser.image}
                          alt="logo"
                          className="min-w-[40px] h-[40px]"
                        />
                      ) : (
                        <Image
                          src="/default_avatar.png"
                          alt="logo"
                          width={40}
                          height={40}
                        />
                      )}
                    </div>
                    <div>
                      <ul className=" flex flex-1 ml-7">
                        <li
                          className={` mr-4 py-2 px-4 duration-300 cursor-pointer  hover:bg-sky-200/20 hover:text-sky-700 ${
                            pathname.endsWith("/")
                              ? " text-sky-700 bg-sky-200/20"
                              : null
                          } rounded-md`}
                          onClick={() => router.push("/")}
                        >
                          Home
                        </li>
                        <li
                          className={`py-2 px-4 duration-300 cursor-pointer hover:bg-sky-200/20 hover:text-sky-700 ${
                            pathname.endsWith("/shop")
                              ? " text-sky-700 bg-sky-200/20"
                              : null
                          } rounded-md`}
                          onClick={() => router.push("/shop")}
                        >
                          Shop
                        </li>
                      </ul>
                      <div>
                        <div className="items-center justify-center ">
                          <div className="relative mr-3 mt-4">
                            <div
                              className={`absolute top-3 left-3 items-center ${focus} duration-300`}
                            >
                              <svg
                                className="w-5 h-5 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </div>
                            <form
                              action={() =>
                                router.push(`/shop/search?search=${search}`)
                              }
                            >
                              <input
                                type="text"
                                className="block p-2 pl-10 w-52 opacity-100 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
                                name="search"
                                placeholder="Search Here..."
                                onFocus={() => setFocus("opacity-0")}
                                onBlur={() => setFocus(" opacity-100")}
                                onChange={(e: any) => setSearch(e.target.value)}
                              />
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className=" mt-5">
                        {auth ? (
                          <ul className=" text-xl flex flex-wrap">
                            <li
                              className=" mr-4 w-24"
                              onClick={() => router.push("/my-profile")}
                            >
                              my profile
                            </li>
                            <li className=" mr-4" onClick={logout}>
                              logout
                            </li>
                            {admin ? (
                              <li
                                onClick={() => router.push("/admin-view")}
                                className="mt-4 md:mt-0"
                              >
                                admin
                              </li>
                            ) : null}
                          </ul>
                        ) : (
                          <ul className=" text-xl flex ">
                            <li
                              className=" mr-4"
                              onClick={() => router.push("/login")}
                            >
                              login
                            </li>
                            <li onClick={() => router.push("/register")}>
                              register
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}

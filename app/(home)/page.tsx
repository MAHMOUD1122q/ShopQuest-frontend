/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";

import { useRouter } from "next/navigation";
import { Heart, Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function Home() {
  const { setCartItems, wishlist, setWishlist } = useContext(GlobalContext);
  const [sliders, setSliders] = useState([]);
  const [products, setProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const router = useRouter();

  console.log(wishlist);
  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  useEffect(() => {
    fetch(`https://shopquest-backend.onrender.com/api/product/all-products`, {}).then(
      (response) => {
        response.json().then((data) => {
          setProducts(data.data);
          setSaleProducts(data.saleData);
        });
      }
    );
  }, []);
  useEffect(() => {
    fetch(`https://shopquest-backend.onrender.com/api/slider/all-slider`, {}).then(
      (response) => {
        response.json().then((data) => {
          setSliders(data.data);
        });
      }
    );
  }, []);
  useEffect(() => {
    fetch(`https://shopquest-backend.onrender.com/api/category/all-category`, {}).then(
      (response) => {
        response.json().then((data) => {
          setCategorys(data.data);
        });
      }
    );
  }, []);
  const addToWishList = async (getItem: any) => {
    const response = await fetch(
      `https://shopquest-backend.onrender.com/api/auth/add-wishlist`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          prodId: getItem._id,
        }),
      }
    );
    const finalData = await response.json();
    if (finalData.success) {
      fetch("https://shopquest-backend.onrender.com/api/auth/all-wishlist", {
        credentials: "include",
      }).then((response) => {
        response.json().then((data) => {
          setWishlist(data.data.wishlist);
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

  const addToCart = async (getItem: any) => {
    const response = await fetch(`https://shopquest-backend.onrender.com/api/auth/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        productID: getItem._id,
        color: getItem.color[0],
        size: getItem.sizes[0],
      }),
    });
    const finalData = await response.json();
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
    } else {
      toast({
        variant: "destructive",
        title: finalData.message,
      });
    }
  };
  return (
    <>
      <title>Home</title>
      <meta />
      <div>
        <div className="mx-5 lg:mx-20 my-5">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={pagination}
            grabCursor={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper"
          >
            {sliders.map((slider: any) => (
              <>
                <SwiperSlide className=" cursor-pointer">
                  <img
                    src={slider.image}
                    alt="image"
                    className="w-full h-[480px] rounded-xl"
                  />
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </div>
        <div className="mx-5 lg:mx-20 mt-10">
          <div className="flex justify-between">
            <h3 className="mb-10 font-semibold text-xl">Categorys</h3>
          </div>
          <Swiper
            slidesPerView={"auto"}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            spaceBetween={30}
            grabCursor={true}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {categorys.map((category: any) => (
              <>
                <SwiperSlide className=" cursor-pointer">
                  <img
                    src={category.image}
                    alt="image"
                    className="w-full h-[150px] rounded-2xl"
                    onClick={() => router.push(`/shop/${category.name}`)}
                  />
                  <p className=" text-center">{category.name}</p>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </div>
        <div className="mx-5 lg:mx-20 mt-10">
          <div className="flex justify-between ">
            <h3 className="mb-10 font-semibold text-xl">New Arrive</h3>
            <p
              className=" cursor-pointer hover:text-sky-600 duration-300"
              onClick={() => router.push("/shop")}
            >
              Show All
            </p>
          </div>
          <Swiper
            slidesPerView={"auto"}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            spaceBetween={30}
            grabCursor={true}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {products.map((product: any) => (
              <>
                <SwiperSlide className=" border-[1px] mx-0 lg:mx-4 cursor-pointer my-4 relative">
                  {product.isSale === true ? (
                    <div className=" text-white bg-black p-2 absolute top-1 left-1 rounded-3xl font-bold ">
                      sale
                    </div>
                  ) : null}
                  {product.status === "Sold" ? (
                    <div className=" text-white bg-red-600 p-2 absolute top-1 left-1 rounded-3xl font-bold ">
                      sold
                    </div>
                  ) : null}
                  <img
                    src={product.images[0]}
                    alt="product image"
                    className="w-full h-[180px] rounded-md"
                    onClick={() => router.push(`/product/${product._id}`)}
                  />
                  <div
                    className=" px-6"
                    onClick={() => router.push(`/product/${product._id}`)}
                  >
                    <h3 className=" mt-5">{product.name}</h3>
                    <div className=" flex mt-2">
                      <p className=" mr-2 ">
                        {" "}
                        rating : {product.rating.toFixed(1)}
                      </p>
                      <Star
                        className={product.rating >= 1 ? "text-[#ffe642]" : ""}
                        fill={product.rating >= 1 ? "#ffe642" : "#fff"}
                      />
                      <Star
                        className={product.rating >= 2 ? "text-[#ffe642]" : ""}
                        fill={product.rating >= 2 ? "#ffe642" : "#fff"}
                      />
                      <Star
                        className={product.rating >= 3 ? "text-[#ffe642]" : ""}
                        fill={product.rating >= 3 ? "#ffe642" : "#fff"}
                      />
                      <Star
                        className={product.rating >= 4 ? "text-[#ffe642]" : ""}
                        fill={product.rating >= 4 ? "#ffe642" : "#fff"}
                      />
                      <Star
                        className={product.rating === 5 ? "text-[#ffe642]" : ""}
                        fill={product.rating === 5 ? "#ffe642" : "#fff"}
                      />
                    </div>
                    <p className=" my-2">
                      price:{" "}
                      {product.isSale === true ? (
                        <>
                          <span className=" text-slate-400 line-through ">
                            {product.price}{" "}
                          </span>{" "}
                          {product.price - product.discount} EGB
                        </>
                      ) : (
                        <span>{product.price} </span>
                      )}
                    </p>
                  </div>
                  <div className=" flex justify-between mt-5 items-center  px-6 mb-5">
                    <button
                      className="text-white relative z-50 bg-sky-600 disabled:opacity-65 disabled:pointer-events-none py-2 px-10 rounded-md hover:bg-sky-700 duration-300"
                      disabled={product.status === "Sold" ? true : false}
                      onClick={() => addToCart(product)}
                    >
                      Add To Cart
                    </button>
                    <button
                      className={` hover:text-red-600 duration-300 cursor-pointer ${
                        wishlist === undefined || wishlist === null
                          ? ""
                          : wishlist.includes(product._id) === true
                          ? "text-[#de2929]"
                          : ""
                      }`}
                      onClick={() => addToWishList(product)}
                    >
                      <Heart
                        fill={
                          wishlist === undefined || wishlist === null
                            ? "#fff"
                            : wishlist.includes(product._id) === true
                            ? "#de2929"
                            : "#fff"
                        }
                        className=" w-8 h-8"
                      />
                    </button>
                  </div>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </div>
        <div className="mx-5 lg:mx-20 mt-10">
          <div className="flex justify-between">
            <h3 className="mb-10 font-semibold text-xl">Sale</h3>
            <p
              className=" cursor-pointer hover:text-sky-600 duration-300"
              onClick={() => router.push("/shop")}
            >
              Show All
            </p>
          </div>
          <Swiper
            slidesPerView={"auto"}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            spaceBetween={30}
            grabCursor={true}
            pagination={pagination}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {saleProducts.map((product: any) => (
              <>
                <SwiperSlide className=" border-[1px] mx-0 lg:mx-4 cursor-pointer my-4 relative">
                  {product.isSale === true ? (
                    <div className=" text-white bg-black p-2 absolute top-1 left-1 rounded-3xl font-bold ">
                      sale
                    </div>
                  ) : null}
                  {product.status === "Sold" ? (
                    <div className=" text-white bg-red-600 p-2 absolute top-1 left-1 rounded-3xl font-bold ">
                      sold
                    </div>
                  ) : null}
                  <img
                    src={product.images[0]}
                    alt="product image"
                    className="w-full h-[180px] rounded-md"
                    onClick={() => router.push(`/product/${product._id}`)}
                  />
                  <div
                    className=" px-6"
                    onClick={() => router.push(`/product/${product._id}`)}
                  >
                    <h3 className=" mt-5">{product.name}</h3>
                    <div className=" flex mt-2">
                      <p className=" mr-2 ">
                        {" "}
                        rating : {product.rating.toFixed(1)}
                      </p>
                      <Star
                        className={product.rating >= 1 ? "text-[#ffe642]" : ""}
                        fill={product.rating >= 1 ? "#ffe642" : "#fff"}
                      />
                      <Star
                        className={product.rating >= 2 ? "text-[#ffe642]" : ""}
                        fill={product.rating >= 2 ? "#ffe642" : "#fff"}
                      />
                      <Star
                        className={product.rating >= 3 ? "text-[#ffe642]" : ""}
                        fill={product.rating >= 3 ? "#ffe642" : "#fff"}
                      />
                      <Star
                        className={product.rating >= 4 ? "text-[#ffe642]" : ""}
                        fill={product.rating >= 4 ? "#ffe642" : "#fff"}
                      />
                      <Star
                        className={product.rating === 5 ? "text-[#ffe642]" : ""}
                        fill={product.rating === 5 ? "#ffe642" : "#fff"}
                      />
                    </div>
                    <p className=" my-2">
                      price:{" "}
                      {product.isSale === true ? (
                        <>
                          <span className=" text-slate-400 line-through ">
                            {product.price}{" "}
                          </span>{" "}
                          {product.price - product.discount} EGB
                        </>
                      ) : (
                        <span>{product.price} </span>
                      )}
                    </p>
                  </div>
                  <div className=" flex justify-between mt-5 items-center  px-6 mb-5">
                    <button
                      className="text-white relative z-50 bg-sky-600 disabled:opacity-65 disabled:pointer-events-none  py-2 px-10 rounded-md hover:bg-sky-700 duration-300"
                      disabled={product.status === "Sold" ? true : false}
                      onClick={() => addToCart(product)}
                    >
                      Add To Cart
                    </button>
                    <button
                      className={` hover:text-red-600 duration-300 cursor-pointer ${
                        wishlist === undefined || wishlist === null
                          ? ""
                          : wishlist.includes(product._id) === true
                          ? "text-[#de2929]"
                          : ""
                      }`}
                      onClick={() => addToWishList(product)}
                    >
                      <Heart
                        fill={
                          wishlist === undefined || wishlist === null
                            ? "#fff"
                            : wishlist.includes(product._id) === true
                            ? "#de2929"
                            : "#fff"
                        }
                        className=" w-8 h-8"
                      />
                    </button>
                  </div>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

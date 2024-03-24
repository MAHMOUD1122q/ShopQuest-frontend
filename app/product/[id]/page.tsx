/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { GlobalContext } from "@/context";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Navigation, Autoplay } from "swiper/modules";
import { Heart, Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
export default function ProductPage() {
  const [product, setProduct] = useState([] as any);
  const [rating, setRating] = useState(0 as any);
  const [comment, setComment] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [chooseColor, setChooseColor] = useState("");
  const [chooseSize, setChooseSize] = useState("");
  const [sliderImage, setSliderImage] = useState([] as any);
  const { isAuthUser, setCartItems, wishlist, setWishlist } =
    useContext(GlobalContext);

  const [commentField, setCommentField] = useState(false);
  const router = useRouter();

  const { id } = useParams();

  const addToCart = async (getItem: any) => {
    const response = await fetch(`http://localhost:4000/api/auth/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        productID: getItem._id,
        color: chooseColor,
        size: chooseSize,
      }),
    });
    const finalData = await response.json();
    if (finalData.success) {
      fetch("http://localhost:4000/api/auth/all-cart", {
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
  const addToCartAlsoProduct = async (getItem: any) => {
    const response = await fetch(`http://localhost:4000/api/auth/add-to-cart`, {
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
      fetch("http://localhost:4000/api/auth/all-cart", {
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
  useEffect(() => {
    fetch(`http://localhost:4000/api/product/all-products`, {}).then(
      (response) => {
        response.json().then((data) => {
          setProductsData(data.data);
        });
      }
    );
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/api/product/single-product?id=${id}`, {}).then(
      (response) => {
        response.json().then((data) => {
          setProduct(data.data);
        });
      }
    );
  }, [id]);
  const createReview = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:4000/api/product/${id}/review`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          rating,
          comment,
        }),
      }
    );
    const finalData = await response.json();
    if (finalData.success) {
      toast({
        variant: "success",
        title: finalData.message,
      });
      setTimeout(() => {
        history.go(0);
      }, 1000);
    } else {
      toast({
        variant: "destructive",
        title: finalData.message,
      });
    }
  };

  const addToWishList = async (getItem: any) => {
    const response = await fetch(
      `http://localhost:4000/api/auth/add-wishlist`,
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
      fetch("http://localhost:4000/api/auth/all-wishlist", {
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

  const auth = isAuthUser?.username;

  return (
    <>
      <title>ShopQuest</title>
      <div className=" flex flex-col md:flex-row md:mx-10 mx-4 my-10 justify-between">
        <div className=" basis-2/5 mb-4 md:mb-0">
          {product.images === undefined ? (
            <p></p>
          ) : (
            <img
              src={
                product.images === undefined
                  ? null
                  : sliderImage.length === 0
                  ? product.images[0]
                  : sliderImage
              }
              className=" w-full h-80 border border-sky-600"
            />
          )}
          <div>
            {product.images === undefined ? (
              <p></p>
            ) : (
              <div className=" flex mt-4 w-full flex-wrap">
                {product.images.map((image: any) => (
                  <>
                    <img
                      src={image}
                      className={` w-32 h-32 mr-2 ${
                        sliderImage === image
                          ? " border-sky-600 border opacity-70"
                          : ""
                      } cursor-pointer hover:border hover:border-sky-600 duration-300 mt-3`}
                      onClick={() => setSliderImage(image)}
                    />
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="border relative border-sky-600 h-fit p-10 basis-2/5">
          <span
            className={` absolute top-2 left-2 ${
              product.status === "New" ? "bg-black" : "bg-red-600"
            }  text-white rounded-2xl p-1`}
          >
            {product.status === "default" ? null : product.status}
          </span>
          <h3 className=" text-xl font-bold mb-2">{product.name}</h3>
          {product.sku === undefined || "" ? null : (
            <p className="mb-2">code: {product.sku}</p>
          )}
          <p className=" flex ">
            {" "}
            price:{" "}
            {product.isSale === true ? (
              <p className="text-slate-400 line-through  mx-2">
                {product.price}
              </p>
            ) : null}{" "}
            {product.isSale === true
              ? product.price - product.discount
              : product.price}{" "}
            EGB
          </p>
          {product.color === undefined ? (
            <p>{""}</p>
          ) : (
            <>
              <div className=" flex mt-4 w-full flex-wrap">
                {product.color.length === 0 ||
                product.color === undefined ? null : (
                  <>
                    <p className=" mr-2">choose color : </p>
                    {
                      <>
                        {product.color.map((color: any) => (
                          <>
                            <div className=" flex mb-2">
                              <li
                                className={`${
                                  chooseColor === color
                                    ? "opacity-80 border-[3px]"
                                    : ""
                                } list-none bg-[${color}] p-1 border mr-2 border-sky-600 rounded-full h-6 w-6`}
                                onClick={() => setChooseColor(color)}
                              />
                            </div>
                          </>
                        ))}
                        <p className=" text-sm text-red-500">
                          {" "}
                          must choose color
                        </p>
                      </>
                    }
                  </>
                )}
              </div>
            </>
          )}
          {product.sizes === undefined ? (
            <p></p>
          ) : (
            <div className=" flex mt-2">
              {product.sizes.length === 0 ||
              product.sizes === undefined ? null : (
                <p className=" mr-2">choose size :</p>
              )}
              {product.sizes.length === 0 ||
              product.sizes === undefined ? null : (
                <>
                  {product.sizes.map((size: any) => (
                    <div key={size}>
                      <div className=" flex ">
                        <p
                          className={` ${
                            chooseSize === size
                              ? "opacity-80 text-sky-600 "
                              : ""
                          } p-2 border mr-2 flex justify-center items-center border-sky-600 rounded-full h-7 w-7 cursor-pointer `}
                          onClick={() => setChooseSize(size)}
                        >
                          {size}
                        </p>
                      </div>
                    </div>
                  ))}
                  <p className=" text-sm text-red-500"> must choose size</p>
                </>
              )}
            </div>
          )}
          <div className="">
            <div className=" flex mt-2">
              <p className=" mr-2">
                {" "}
                rating :{" "}
                {product.rating === undefined
                  ? null
                  : product.rating.toFixed(1)}
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
            {product.numReviews === 0 ? (
              <p className=" mt-2">noRating(0)</p>
            ) : (
              <p className=" mt-2">number of rating :({product.numReviews})</p>
            )}
          </div>
          <button
            disabled={
              product.status === "Sold"
                ? true
                : product.color === undefined || product.sizes === undefined
                ? false
                : product.color.length !== 0 && product.sizes.length !== 0
                ? chooseColor === "" || chooseSize === ""
                  ? true
                  : false
                : product.color.length !== 0
                ? chooseColor === ""
                  ? true
                  : false
                : product.sizes.length !== 0
                ? chooseSize === ""
                  ? true
                  : false
                : product.color.length === 0 && product.sizes.length === 0
                ? false
                : true
            }
            className=" disabled:opacity-65 disabled:pointer-events-none capitalize py-2 px-16 rounded-xl bg-sky-600 hover:bg-sky-700 duration-300 font-semibold  text-white  mt-5 "
            onClick={() => addToCart(product)}
          >
            add to cart
          </button>
          <div className=" flex mt-6 items-center justify-between">
            <div
              className={` flex hover:opacity-65 duration-300 cursor-pointer ${
                wishlist === undefined || wishlist === null
                  ? ""
                  : wishlist.includes(product._id) === true
                  ? "text-[#de2929]"
                  : ""
              }`}
              onClick={() => addToWishList(product)}
            >
              <Heart
                className=" w-7 h-7"
                fill={
                  wishlist === undefined || wishlist === null
                    ? "#fff"
                    : wishlist.includes(product._id) === true
                    ? "#de2929"
                    : "#fff"
                }
              />
              <p className=" ml-2 capitalize">add to wishlist</p>
            </div>
            <div>
              {auth ? (
                <Dialog>
                  <DialogTrigger>
                    <p className=" flex w-fit capitalize rounded-xl border border-sky-600 hover:bg-sky-600 hover:text-white cursor-pointer duration-300  py-2 px-4 ">
                      <Star fill="#ffe642" className=" mr-2 text-[#ffe642]" />{" "}
                      add review
                    </p>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>add review</DialogTitle>
                      <DialogDescription>
                        <form onSubmit={createReview}>
                          <div className=" mx-4">
                            <div>
                              <p className=" capitalize "> add rating</p>
                              <div className=" flex my-2">
                                <Star
                                  className=" flex w-8 h-8 text-[#ffe642]"
                                  fill={rating >= 1 ? "#ffe642" : "#fff"}
                                  onClick={() => setRating(1)}
                                />
                                <Star
                                  className=" flex w-8 h-8 text-[#ffe642]"
                                  fill={rating >= 2 ? "#ffe642" : "#fff"}
                                  onClick={() => setRating(2)}
                                />
                                <Star
                                  className=" flex w-8 h-8 text-[#ffe642]"
                                  fill={rating >= 3 ? "#ffe642" : "#fff"}
                                  onClick={() => setRating(3)}
                                />
                                <Star
                                  className=" flex w-8 h-8 text-[#ffe642]"
                                  fill={rating >= 4 ? "#ffe642" : "#fff"}
                                  onClick={() => setRating(4)}
                                />
                                <Star
                                  className=" flex w-8 h-8 text-[#ffe642]"
                                  fill={rating === 5 ? "#ffe642" : "#fff"}
                                  onClick={() => setRating(5)}
                                />
                              </div>
                            </div>
                            <textarea
                              placeholder=" add comment for this product"
                              className=" h-64 bg-gray-100 w-full my-4 p-2 resize-none"
                              onChange={(e: any) => setComment(e.target.value)}
                            />
                            <button className=" flex w-fit capitalize rounded-xl border border-sky-600 hover:bg-sky-600 hover:text-white cursor-pointer duration-300  py-2 px-8 ">
                              add review
                            </button>
                          </div>
                        </form>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ) : (
                <p
                  className=" flex w-fit mt-2 capitalize rounded-xl border border-sky-600 hover:bg-sky-600 hover:text-white cursor-pointer duration-300  py-2 px-4 "
                  onClick={() => router.push("/login")}
                >
                  <Star fill="#ffe642" className=" mr-2 text-[#ffe642]" /> add
                  review
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:mx-20 mx-4">
        <div className=" flex mt-8 bg-slate-200 p-4 ">
          {" "}
          <p
            className={` mr-3 cursor-pointer hover:opacity-60 p-2 duration-500 ${
              commentField === false
                ? "border-b-4 border-sky-600 opacity-80"
                : ""
            }`}
            onClick={() => setCommentField(false)}
          >
            {" "}
            Description
          </p>{" "}
          <p
            className={`cursor-pointer hover:opacity-60 p-2 duration-500 ${
              commentField === true
                ? "border-b-4 border-sky-600 opacity-80"
                : ""
            }`}
            onClick={() => setCommentField(true)}
          >
            Comments
          </p>
        </div>
        {commentField === false ? (
          <div className=" p-4 border-sky-600 border mt-3 w-full">
            {product.description}
          </div>
        ) : (
          <div className=" p-4 mt-3 w-full flex justify-between flex-wrap">
            {product.reviews.map((review: any) => (
              <>
                <div className=" lg:basis-[32%] md:basis-[40%] border bg-gray-100 p-6 shadow-lg my-3">
                  <div className=" flex items-center mb-4">
                    <img
                      src={review.img}
                      alt="img"
                      className=" w-10 h-10 mr-4"
                    />
                    <div>
                      <p className=" mr-2 ">{review.name}</p>
                      <p>
                        posted on :{" "}
                        {format(
                          review.createdAt === undefined
                            ? null
                            : review.createdAt,
                          "yyyy-MM-dd"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className=" flex">
                    <Star
                      className={review.rating >= 1 ? "text-[#ffe642]" : ""}
                      fill={review.rating >= 1 ? "#ffe642" : "#fff"}
                    />
                    <Star
                      className={review.rating >= 2 ? "text-[#ffe642]" : ""}
                      fill={review.rating >= 2 ? "#ffe642" : "#fff"}
                    />
                    <Star
                      className={review.rating >= 3 ? "text-[#ffe642]" : ""}
                      fill={review.rating >= 3 ? "#ffe642" : "#fff"}
                    />
                    <Star
                      className={review.rating >= 4 ? "text-[#ffe642]" : ""}
                      fill={review.rating >= 4 ? "#ffe642" : "#fff"}
                    />
                    <Star
                      className={review.rating === 5 ? "text-[#ffe642]" : ""}
                      fill={review.rating === 5 ? "#ffe642" : "#fff"}
                    />
                    <p className=" ml-2 text-[#ffd749] text-bold text-lg">
                      {review.rating}
                    </p>
                  </div>
                  <div className=" mt-3 w-full">{review.comment}</div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
      <div className="mx-5 lg:mx-20 mt-10">
        <div className="flex justify-between ">
          <h3 className="mb-10 font-semibold text-xl">Sale</h3>
          <p
            className=" cursor-pointer hover:text-sky-600 duration-300"
            onClick={() => router.push("/shop")}
          >
            Show All
          </p>
        </div>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2,
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
          {productsData.map((product: any) => (
            <>
              <SwiperSlide className=" border-[1px]  mx-4 cursor-pointer my-4 relative">
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
                    className="text-white relative z-50 disabled:opacity-65 disabled:pointer-events-none bg-sky-600 py-2 px-10 rounded-md hover:bg-sky-700 duration-300"
                    disabled={product.status === "Sold" ? true : false}
                    onClick={() => addToCartAlsoProduct(product)}
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
                      className=" w-8 h-8"
                      fill={
                        wishlist === undefined || wishlist === null
                          ? "#fff"
                          : wishlist.includes(product._id) === true
                          ? "#de2929"
                          : "#fff"
                      }
                    />
                  </button>
                </div>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </>
  );
}

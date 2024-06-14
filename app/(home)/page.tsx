/* eslint-disable @next/next/no-img-element */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import { ArrowBigRight, Heart, Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { DotLoader } from "react-spinners";

export default function Home() {
  const { wishlist, setWishlist, isAuthUser } = useContext(GlobalContext);
  const [sliders, setSliders] = useState([]);
  const [homeCategory, setHomeCategory] = useState([]);
  const [clothesCategory, setClothesCategory] = useState([]);
  const [watchsCategory, setWatchsCategory] = useState([]);
  const [accssorysCategory, setAccssorysCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([] as any);
  const [categorys, setCategorys] = useState([]);
  const router = useRouter();

  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  useEffect(() => {
    fetch(`http://localhost:4000/api/product/all-products`, {}).then(
      (response) => {
        response.json().then((data) => {
          setProducts(data.data);
          setSaleProducts(data.saleData);
          setFeatureProducts(data.feature);
        });
      }
    );
  }, []);
  useEffect(() => {
    fetch(`http://localhost:4000/api/slider/all-slider`, {}).then(
      (response) => {
        response.json().then((data) => {
          setSliders(data.data);
        });
      }
    );
  }, []);
  useEffect(() => {
    fetch(`http://localhost:4000/api/category/all-category`, {}).then(
      (response) => {
        response.json().then((data) => {
          setCategorys(data.data);
        });
      }
    );
  }, []);
  useEffect(() => {
    fetch(`http://localhost:4000/api/auth/all-wishlist`, {
      credentials: "include",
      headers: {
        Authorization: "Bearer " + isAuthUser?.token,
      },
    }).then((response) => {
      response.json().then((data) => {
        try {
          setWishlist(data.data.wishlist);
        } catch (e) {}
      });
    });
  }, [isAuthUser, setWishlist]);

  useEffect(() => {
    fetch(
      `http://localhost:4000/api/product/product-by-category/مستلزمات%20المنزل?&limit=12`,
      {}
    ).then((response) => {
      response.json().then((data) => {
        setHomeCategory(data.data);
      });
    });
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:4000/api/product/product-by-category/ملابس?&limit=12`,
      {}
    ).then((response) => {
      response.json().then((data) => {
        setClothesCategory(data.data);
      });
    });
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:4000/api/product/product-by-category/اكسسوارات?&limit=12`,
      {}
    ).then((response) => {
      response.json().then((data) => {
        setAccssorysCategory(data.data);
      });
    });
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:4000/api/product/product-by-category/ساعات%20ذكيه?&limit=12`,
      {}
    ).then((response) => {
      response.json().then((data) => {
        setWatchsCategory(data.data);
      });
    });
  }, []);

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
      <title>Shopa</title>
      <meta />
      {products.length === 0 ||
      categorys.length === 0 ||
      homeCategory.length === 0 ||
      watchsCategory.length === 0 ||
      clothesCategory.length === 0 ||
      sliders.length === 0 ||
      saleProducts.length === 0 ||
      featureProducts.length === 0 ||
      accssorysCategory.length === 0 ? (
        <span className="flex my-10 justify-center gap-1 items-center">
          <DotLoader color="#59e6ff" />
        </span>
      ) : (
        <div className=" mt-[-30px]">
          <div className="mx-5 lg:mx-10 my-5">
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
              modules={[Pagination, Autoplay, Navigation]}
              className="mySwiper"
            >
              {sliders.map((slider: any) => (
                <>
                  <SwiperSlide className=" cursor-pointer">
                    <motion.a href={slider.link}>
                      <img
                        src={slider.image}
                        alt="image"
                        className="w-full h-[200px] md:h-[410px] rounded-xl"
                      />
                    </motion.a>
                  </SwiperSlide>
                </>
              ))}
            </Swiper>
          </div>
          <div className="mx-5 lg:mx-10 mt-10">
            {categorys.length === 0 ? null : (
              <div className="" dir="rtl">
                <h3 className="mb-10 font-semibold text-2xl"> جميع الاقسام </h3>
              </div>
            )}
            <Swiper
              slidesPerView={2}
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
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              {categorys.map((category: any) => (
                <>
                  <SwiperSlide className=" cursor-pointer">
                    <motion.div
                      whileHover={{
                        opacity: 0.7,
                        transition: { duration: 1 },
                      }}
                    >
                      <img
                        src={category.image}
                        alt="image"
                        className="w-full h-[150px] rounded-2xl"
                        onClick={() =>
                          router.push(
                            `/shop/${category.name}?category=${category.name}`
                          )
                        }
                      />
                    </motion.div>
                    <p className=" text-center">{category.name}</p>
                  </SwiperSlide>
                </>
              ))}
            </Swiper>
          </div>
          <div className="mx-5 lg:mx-10 mt-10">
            {products.length === 0 ? null : (
              <div className="flex justify-between " dir="rtl">
                <h3 className="mb-10 font-semibold text-2xl"> وصل حديثا</h3>
                <p
                  className=" cursor-pointer hover:text-sky-700 text-xl duration-300 text-sky-600"
                  onClick={() => router.push("/shop")}
                >
                  عرض الكل
                </p>
              </div>
            )}
            <Swiper
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 5,
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
              spaceBetween={5}
              grabCursor={true}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              {products.map((product: any) => (
                <>
                  <SwiperSlide className=" border-[1px] mx-0 cursor-pointer my-4 relative slide">
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
                      className=" px-2 md:px-6"
                      onClick={() => router.push(`/product/${product._id}`)}
                    >
                      <h3 className="text-sm md:text-base mt-5" dir="rtl">
                        {product.name}
                      </h3>
                      <div className="hidden md:flex mt-2" dir="rtl">
                        <p className=" ml-2 ">
                          {" "}
                          تقيم المنتج : {product.rating.toFixed(1)}
                        </p>
                        <Star
                          className={
                            product.rating >= 1 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 1 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 2 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 2 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 3 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 3 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 4 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 4 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating === 5 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating === 5 ? "#ffe642" : "#fff"}
                        />
                      </div>
                      <p className=" text-sm md:text-base my-2" dir="rtl">
                        السعر:{" "}
                        {product.isSale === true ? (
                          <>
                            <span className=" text-slate-400 line-through ">
                              {product.price}{" "}
                            </span>{" "}
                            {product.price - product.discount} ج.م
                          </>
                        ) : (
                          <span>{product.price} ج.م</span>
                        )}
                      </p>
                    </div>
                    <div className=" flex justify-between mt-5 items-center px-2  md:px-6 mb-5">
                      <button
                        className="text-white text-sm md:text-base mx-2 md:mx-0 relative z-50 bg-sky-600 disabled:opacity-65 disabled:pointer-events-none py-2 px-2  md:px-10  rounded-md hover:bg-sky-700 duration-300"
                        disabled={product.status === "Sold" ? true : false}
                        onClick={() => router.push(`/product/${product._id}`)}
                      >
                        عرض المنتج
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
              {products.length === 0 ? null : (
                <SwiperSlide className=" relative h-full">
                  <div
                    className=" flex flex-col justify-center items-center h-full translate-y-[150px] cursor-pointer"
                    onClick={() => router.push("/shop")}
                  >
                    <ArrowBigRight className=" bg-sky-600 text-white rounded-full w-14 h-10" />
                    <p className=" text-sky-600 h-[200px]">
                      {" "}
                      عرض جميع المنتجات
                    </p>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>

          {/* ============================================================================== */}
          <div className=" hidden lg:block mx-5 lg:mx-10 mt-10">
            {featureProducts.length === 0 ? null : (
              <div className="flex justify-between" dir="rtl">
                <h3 className="mb-10 font-semibold text-2xl"> منتجات مميزه </h3>
                <p
                  className="cursor-pointer hover:text-sky-700 text-xl duration-300 text-sky-600"
                  onClick={() => router.push("/shop")}
                >
                  عرض الكل
                </p>
              </div>
            )}
            <div className="flex flex-col-reverse lg:flex-row">
              <div className=" flex flex-wrap basis-[60%]" dir="ltr">
                {featureProducts.length === 0 ? (
                  <p></p>
                ) : (
                  featureProducts.map((product: any) => (
                    <>
                      <div className=" border-[1px] w-72  mx-4 cursor-pointer my-4 relative slide">
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
                          <h3 className=" mt-5" dir="rtl">
                            {product.name}
                          </h3>
                          <div className=" flex mt-2" dir="rtl">
                            <p className=" ml-2 ">
                              {" "}
                              تقييم المنتج : {product.rating.toFixed(1)}
                            </p>
                            <Star
                              className={
                                product.rating >= 1 ? "text-[#ffe642]" : ""
                              }
                              fill={product.rating >= 1 ? "#ffe642" : "#fff"}
                            />
                            <Star
                              className={
                                product.rating >= 2 ? "text-[#ffe642]" : ""
                              }
                              fill={product.rating >= 2 ? "#ffe642" : "#fff"}
                            />
                            <Star
                              className={
                                product.rating >= 3 ? "text-[#ffe642]" : ""
                              }
                              fill={product.rating >= 3 ? "#ffe642" : "#fff"}
                            />
                            <Star
                              className={
                                product.rating >= 4 ? "text-[#ffe642]" : ""
                              }
                              fill={product.rating >= 4 ? "#ffe642" : "#fff"}
                            />
                            <Star
                              className={
                                product.rating === 5 ? "text-[#ffe642]" : ""
                              }
                              fill={product.rating === 5 ? "#ffe642" : "#fff"}
                            />
                          </div>
                          <p className=" my-2" dir="rtl">
                            السعر:{" "}
                            {product.isSale === true ? (
                              <>
                                <span className=" text-slate-400 line-through ">
                                  {product.price}{" "}
                                </span>{" "}
                                {product.price - product.discount} ج.م
                              </>
                            ) : (
                              <span dir="rtl">{product.price} ج.م </span>
                            )}
                          </p>
                        </div>
                        <div className=" flex justify-between mt-5 items-center  px-6 mb-5">
                          <button
                            className="text-white relative z-50 bg-sky-600 disabled:opacity-65 disabled:pointer-events-none py-2 px-10 rounded-md hover:bg-sky-700 duration-300"
                            disabled={product.status === "Sold" ? true : false}
                            onClick={() =>
                              router.push(`/product/${product._id}`)
                            }
                          >
                            عرض المنتج
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
                      </div>
                    </>
                  ))
                )}
              </div>
              <div className=" basis-[55%]">
                <img
                  src={
                    featureProducts[0] === undefined ||
                    featureProducts[0] === null
                      ? null
                      : featureProducts[0].images[0]
                  }
                  alt=""
                  className={`${
                    featureProducts[0] === undefined ? "" : " h-[800px]"
                  } rounded-2xl hover:scale-105 duration-500 cursor-pointer`}
                  onClick={() =>
                    router.push(
                      `/product/${
                        featureProducts[0] === undefined ||
                        featureProducts[0] === null
                          ? null
                          : featureProducts[0]._id
                      }`
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="mx-5 lg:mx-10 mt-10">
            {saleProducts.length === 0 ? null : (
              <div className="flex justify-between" dir="rtl">
                <h3 className="mb-10 font-semibold text-2xl">
                  {" "}
                  عروض لفترة محدودة{" "}
                </h3>
                <p
                  className="cursor-pointer hover:text-sky-700 text-xl duration-300 text-sky-600"
                  onClick={() => router.push("/shop")}
                >
                  عرض الكل
                </p>
              </div>
            )}
            <Swiper
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 5,
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
              spaceBetween={5}
              grabCursor={true}
              pagination={pagination}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              {saleProducts.map((product: any) => (
                <>
                  <SwiperSlide className=" border-[1px] mx-0 cursor-pointer my-4 relative slide">
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
                      className=" px-2 md:px-6"
                      onClick={() => router.push(`/product/${product._id}`)}
                    >
                      <h3 className="text-sm md:text-base mt-5" dir="rtl">
                        {product.name}
                      </h3>
                      <div className=" hidden md:flex mt-2" dir="rtl">
                        <p className=" ml-2 ">
                          {" "}
                          تقيم المنتج : {product.rating.toFixed(1)}
                        </p>
                        <Star
                          className={
                            product.rating >= 1 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 1 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 2 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 2 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 3 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 3 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 4 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 4 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating === 5 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating === 5 ? "#ffe642" : "#fff"}
                        />
                      </div>
                      <p className=" text-sm md:text-base my-2" dir="rtl">
                        السعر:{" "}
                        {product.isSale === true ? (
                          <>
                            <span className=" text-sm md:text-base text-slate-400 line-through ">
                              {product.price}{" "}
                            </span>{" "}
                            {product.price - product.discount} ج.م
                          </>
                        ) : (
                          <span>{product.price} ج.م</span>
                        )}
                      </p>
                    </div>
                    <div className=" flex justify-between mt-5 items-center px-2 md:px-6 mb-5">
                      <button
                        className="text-white text-sm md:text-base relative z-50 bg-sky-600 disabled:opacity-65 disabled:pointer-events-none  px-2 py-2 md:px-10 rounded-md hover:bg-sky-700 duration-300"
                        disabled={product.status === "Sold" ? true : false}
                        onClick={() => router.push(`/product/${product._id}`)}
                      >
                        عرض المنتج
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
              {saleProducts.length === 0 ? null : (
                <SwiperSlide className=" relative h-full">
                  <div
                    className=" flex flex-col justify-center items-center h-full translate-y-[150px] cursor-pointer"
                    onClick={() => router.push("/shop")}
                  >
                    <ArrowBigRight className=" bg-sky-600 text-white rounded-full w-14 h-10" />
                    <p className=" text-sky-600  h-[200px]">
                      {" "}
                      عرض جميع المنتجات
                    </p>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
          <div className="mx-5 lg:mx-10 mt-10">
            {homeCategory.length === 0 ? null : (
              <div className="flex justify-between" dir="rtl">
                <h3 className="mb-10 font-semibold text-2xl"> المنزل</h3>
                <p
                  className="cursor-pointer hover:text-sky-700 text-xl duration-300 text-sky-600"
                  onClick={() => router.push("/shop")}
                >
                  عرض الكل
                </p>
              </div>
            )}
            <Swiper
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 5,
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
              spaceBetween={5}
              grabCursor={true}
              pagination={pagination}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              {homeCategory.map((product: any) => (
                <>
                  <SwiperSlide className=" border-[1px] mx-0 cursor-pointer my-4 relative slide">
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
                      className=" px-2 md:px-6"
                      onClick={() => router.push(`/product/${product._id}`)}
                    >
                      <h3 className=" text-sm md:text-base mt-5" dir="rtl">
                        {product.name}
                      </h3>
                      <div className="hidden md:flex mt-2" dir="rtl">
                        <p className=" ml-2 ">
                          {" "}
                          تقيم المنتج : {product.rating.toFixed(1)}
                        </p>
                        <Star
                          className={
                            product.rating >= 1 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 1 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 2 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 2 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 3 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 3 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 4 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 4 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating === 5 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating === 5 ? "#ffe642" : "#fff"}
                        />
                      </div>
                      <p className=" text-sm md:text-base  my-2" dir="rtl">
                        السعر:{" "}
                        {product.isSale === true ? (
                          <>
                            <span className=" text-sm md:text-base text-slate-400 line-through ">
                              {product.price}{" "}
                            </span>{" "}
                            {product.price - product.discount} ج.م
                          </>
                        ) : (
                          <span>{product.price} ج.م</span>
                        )}
                      </p>
                    </div>
                    <div className=" flex justify-between mt-5 items-center px-2 md:px-6 mb-5">
                      <button
                        className="text-white text-sm md:text-base relative z-50 bg-sky-600 disabled:opacity-65 disabled:pointer-events-none px-2 py-2 md:px-10 rounded-md hover:bg-sky-700 duration-300"
                        disabled={product.status === "Sold" ? true : false}
                        onClick={() => router.push(`/product/${product._id}`)}
                      >
                        عرض المنتج
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
              {homeCategory.length === 0 ? null : (
                <SwiperSlide className=" relative h-full">
                  <div
                    className=" flex flex-col justify-center items-center h-full translate-y-[150px] cursor-pointer"
                    onClick={() => router.push("/shop")}
                  >
                    <ArrowBigRight className=" bg-sky-600 text-white rounded-full w-14 h-10" />
                    <p className=" text-sky-600  h-[200px]">
                      {" "}
                      عرض جميع المنتجات
                    </p>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
          <div className="mx-5 lg:mx-10 mt-10">
            {clothesCategory.length === 0 ? null : (
              <div className="flex justify-between" dir="rtl">
                <h3 className="mb-10 font-semibold text-2xl"> ملابس</h3>
                <p
                  className="cursor-pointer hover:text-sky-700 text-xl duration-300 text-sky-600"
                  onClick={() => router.push("/shop")}
                >
                  عرض الكل
                </p>
              </div>
            )}
            <Swiper
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 5,
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
              spaceBetween={5}
              grabCursor={true}
              pagination={pagination}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              {clothesCategory.map((product: any) => (
                <>
                  <SwiperSlide className=" border-[1px] mx-0 cursor-pointer my-4 relative slide">
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
                      className="px-2 md:px-6"
                      onClick={() => router.push(`/product/${product._id}`)}
                    >
                      <h3 className=" text-sm md:text-base mt-5" dir="rtl">
                        {product.name}
                      </h3>
                      <div className="hidden md:flex mt-2" dir="rtl">
                        <p className=" ml-2 ">
                          {" "}
                          تقيم المنتج : {product.rating.toFixed(1)}
                        </p>
                        <Star
                          className={
                            product.rating >= 1 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 1 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 2 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 2 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 3 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 3 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 4 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 4 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating === 5 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating === 5 ? "#ffe642" : "#fff"}
                        />
                      </div>
                      <p className=" text-sm md:text-base  my-2" dir="rtl">
                        السعر:{" "}
                        {product.isSale === true ? (
                          <>
                            <span className=" text-sm md:text-base  text-slate-400 line-through ">
                              {product.price}{" "}
                            </span>{" "}
                            {product.price - product.discount} ج.م
                          </>
                        ) : (
                          <span>{product.price} ج.م</span>
                        )}
                      </p>
                    </div>
                    <div className=" flex justify-between mt-5 items-center px-2 md:px-6 mb-5">
                      <button
                        className="text-white text-sm md:text-base relative z-50 bg-sky-600 disabled:opacity-65 disabled:pointer-events-none px-2  py-2 md:px-10 rounded-md hover:bg-sky-700 duration-300"
                        disabled={product.status === "Sold" ? true : false}
                        onClick={() => router.push(`/product/${product._id}`)}
                      >
                        عرض المنتج
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
              {clothesCategory.length === 0 ? null : (
                <SwiperSlide className=" relative h-full">
                  <div
                    className=" flex flex-col justify-center items-center h-full translate-y-[150px] cursor-pointer"
                    onClick={() => router.push("/shop")}
                  >
                    <ArrowBigRight className=" bg-sky-600 text-white rounded-full w-14 h-10" />
                    <p className=" text-sky-600  h-[200px]">
                      {" "}
                      عرض جميع المنتجات
                    </p>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
          <div className="mx-5 lg:mx-10 mt-10">
            {accssorysCategory.length === 0 ? null : (
              <div className="flex justify-between" dir="rtl">
                <h3 className="mb-10 font-semibold text-2xl"> اكسسوارات</h3>
                <p
                  className="cursor-pointer hover:text-sky-700 text-xl duration-300 text-sky-600"
                  onClick={() => router.push("/shop")}
                >
                  عرض الكل
                </p>
              </div>
            )}
            <Swiper
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 5,
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
              spaceBetween={5}
              grabCursor={true}
              pagination={pagination}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              {accssorysCategory.map((product: any) => (
                <>
                  <SwiperSlide className=" border-[1px] mx-0 cursor-pointer my-4 relative slide">
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
                      className="px-2 md:px-6"
                      onClick={() => router.push(`/product/${product._id}`)}
                    >
                      <h3 className="  text-sm md:text-base mt-5" dir="rtl">
                        {product.name}
                      </h3>
                      <div className="hidden md:flex mt-2" dir="rtl">
                        <p className=" ml-2 ">
                          {" "}
                          تقيم المنتج : {product.rating.toFixed(1)}
                        </p>
                        <Star
                          className={
                            product.rating >= 1 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 1 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 2 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 2 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 3 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 3 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 4 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 4 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating === 5 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating === 5 ? "#ffe642" : "#fff"}
                        />
                      </div>
                      <p className="  text-sm md:text-base  my-2" dir="rtl">
                        السعر:{" "}
                        {product.isSale === true ? (
                          <>
                            <span className="  text-sm md:text-base  text-slate-400 line-through ">
                              {product.price}{" "}
                            </span>{" "}
                            {product.price - product.discount} ج.م
                          </>
                        ) : (
                          <span>{product.price} ج.م</span>
                        )}
                      </p>
                    </div>
                    <div className=" flex justify-between mt-5 items-center px-2 md:px-6 mb-5">
                      <button
                        className="text-white text-sm md:text-base relative z-50 bg-sky-600 disabled:opacity-65 disabled:pointer-events-none px-2 py-2 md:px-10 rounded-md hover:bg-sky-700 duration-300"
                        disabled={product.status === "Sold" ? true : false}
                        onClick={() => router.push(`/product/${product._id}`)}
                      >
                        عرض المنتج
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
              {accssorysCategory.length === 0 ? null : (
                <SwiperSlide className=" relative h-full">
                  <div
                    className=" flex flex-col justify-center items-center h-full translate-y-[150px] cursor-pointer"
                    onClick={() => router.push("/shop")}
                  >
                    <ArrowBigRight className=" bg-sky-600 text-white rounded-full w-14 h-10" />
                    <p className=" text-sky-600  h-[200px]">
                      {" "}
                      عرض جميع المنتجات
                    </p>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
          <div className="mx-5 lg:mx-10 mt-10">
            {watchsCategory.length === 0 ? null : (
              <div className="flex justify-between" dir="rtl">
                <h3 className="mb-10 font-semibold text-2xl"> ساعات ذكيه</h3>
                <p
                  className="cursor-pointer hover:text-sky-700 text-xl duration-300 text-sky-600"
                  onClick={() => router.push("/shop")}
                >
                  عرض الكل
                </p>
              </div>
            )}
            <Swiper
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 5,
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
              spaceBetween={5}
              grabCursor={true}
              pagination={pagination}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              {watchsCategory.map((product: any) => (
                <>
                  <SwiperSlide className=" border-[1px] mx-0 cursor-pointer my-4 relative slide">
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
                      className="px-2 md:px-6"
                      onClick={() => router.push(`/product/${product._id}`)}
                    >
                      <h3 className=" text-sm md:text-base mt-5" dir="rtl">
                        {product.name}
                      </h3>
                      <div className="hidden md:flex mt-2" dir="rtl">
                        <p className=" ml-2 ">
                          {" "}
                          تقيم المنتج : {product.rating.toFixed(1)}
                        </p>
                        <Star
                          className={
                            product.rating >= 1 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 1 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 2 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 2 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 3 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 3 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating >= 4 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating >= 4 ? "#ffe642" : "#fff"}
                        />
                        <Star
                          className={
                            product.rating === 5 ? "text-[#ffe642]" : ""
                          }
                          fill={product.rating === 5 ? "#ffe642" : "#fff"}
                        />
                      </div>
                      <p className=" text-sm md:text-base my-2" dir="rtl">
                        السعر:{" "}
                        {product.isSale === true ? (
                          <>
                            <span className=" text-sm md:text-base text-slate-400 line-through ">
                              {product.price}{" "}
                            </span>{" "}
                            {product.price - product.discount} ج.م
                          </>
                        ) : (
                          <span>{product.price} ج.م</span>
                        )}
                      </p>
                    </div>
                    <div className=" flex justify-between mt-5 items-center px-2 md:px-6 mb-5">
                      <button
                        className="text-white  text-sm md:text-base relative z-50 bg-sky-600 disabled:opacity-65 disabled:pointer-events-none px-2  py-2 md:px-10 rounded-md hover:bg-sky-700 duration-300"
                        disabled={product.status === "Sold" ? true : false}
                        onClick={() => router.push(`/product/${product._id}`)}
                      >
                        عرض المنتج
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
              {watchsCategory.length === 0 ? null : (
                <SwiperSlide className=" relative h-full">
                  <div
                    className=" flex flex-col justify-center items-center h-full translate-y-[150px] cursor-pointer"
                    onClick={() => router.push("/shop")}
                  >
                    <ArrowBigRight className=" bg-sky-600 text-white rounded-full w-14 h-10" />
                    <p className=" text-sky-600  h-[200px]">
                      {" "}
                      عرض جميع المنتجات
                    </p>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";

export default function Shop() {
  const { wishlist, setWishlist, isAuthUser } = useContext(GlobalContext);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [products, setProducts] = useState([]);
  const [allData, setallData] = useState({} as any);
  useEffect(() => {
    fetch(
      `http://localhost:4000/api/product/all-products?page=${page}&limit=12`,
      {}
    ).then((response) => {
      response.json().then((data) => {
        setProducts(data.data);
        setallData(data);
        setPageCount(data.pageCount);
      });
    });
  }, [page]);

  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
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

  const count = allData?.ProdcutCount;
  const router = useRouter();
  return (
    <>
      <title>Shopa</title>
      <meta />
      <div className="md:mt-20 md:ml-14 ml-8">
        <div className="flex items-center">
          <h3 className=" mb-5 text-xl font-bold mx-4"> جميع المنتجات</h3>
          <span className="text-gray-500 mb-5">({count} منتج)</span>
        </div>
        <div className=" flex flex-wrap" dir="ltr">
          {products.length === 0 ? (
            <p> لا يوجد منتجات </p>
          ) : (
            products.map((product: any) => (
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
                </div>
              </>
            ))
          )}
        </div>
      </div>
      <div className=" overflow-hidden w-80 flex justify-center items-center mx-6 my-3 text-center">
        {pageCount > 1 ? (
          <>
            <ul className="flex justify-center items-center">
              {pageNumbers?.map((pageNumber) => (
                <a
                  onClick={() => setPage(pageNumber)}
                  key={pageNumber}
                  className={`px-4 py-2  mx-1 rounded-md border cursor-pointer ${
                    page === pageNumber
                      ? "bg-blue-500 text-white"
                      : "border-gray-300 hover:bg-gray-200 duration-300 "
                  }`}
                >
                  {pageNumber}
                </a>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </>
  );
}

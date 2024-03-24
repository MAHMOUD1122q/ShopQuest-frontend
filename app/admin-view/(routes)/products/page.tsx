/* eslint-disable @next/next/no-img-element */
"use client";

import ProductsLayout from "@/app/shop/layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { PencilIcon, Trash } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [allData, setallData] = useState({} as any);
  useEffect(() => {
    fetch(`http://localhost:4000/api/product/all-products-admin`, {}).then(
      (response) => {
        response.json().then((data) => {
          setProducts(data.data);
          setallData(data);
        });
      }
    );
  }, []);
  const deleteProduct = async (id: any) => {
    const data = await fetch(
      `http://localhost:4000/api/product/delete-product/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const finalData = await data.json();
    if (finalData.success) {
      toast({
        variant: "success",
        title: finalData.message,
      });
      setTimeout(() => {
        history.go(0);
      }, 2000);
    }
  };
  const router = useRouter();
  const count = allData?.ProdcutCount;
  console.log(products);
  return (
    <>
      <title>Products</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">
            ({count})Products
          </h3>
          <button
            className="text-white bg-sky-600 h-10  px-5 rounded-md hover:bg-sky-700 duration-300"
            onClick={() => router.push("/admin-view/products/add-product")}
          >
            Add product
          </button>
        </div>
        <Table className=" bg-white p-2 w-[1100px] mx-5 my-5 shadow-md">
          <TableCaption>A list of prodcuts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>show</TableHead>
              <TableHead>sale</TableHead>
              <TableHead>discount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: any) => (
              <>
                <TableRow>
                  <TableCell>
                    <img
                      src={product.images[0]}
                      alt="img"
                      draggable="false"
                      className="w-32 h-20"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    {product.category === ""
                      ? "not in category"
                      : product.category}
                  </TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>
                    {product.isShow === false ? "do not show" : "show"}
                  </TableCell>
                  <TableCell>{product.isSale === false ? "not sale" : "sale"}</TableCell>
                  <TableCell>{product.discount}</TableCell>
                  <TableCell className="text-right">
                    {" "}
                    <div className=" flex justify-end">
                      <PencilIcon
                        fill="#854d0e"
                        fillOpacity="0.3"
                        className=" text-yellow-800 h-7 w-7 bg-white border-[1px] p-[5px] mr-2 cursor-pointer"
                      />
                      <Trash
                        fill="#b91c1c"
                        fillOpacity="0.3"
                        className=" text-red-700 h-7 w-7 bg-white border-[1px] p-[5px] cursor-pointer"
                        onClick={() => deleteProduct(product._id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

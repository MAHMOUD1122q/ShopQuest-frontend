/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [allData, setallData] = useState({} as any);

  useEffect(() => {
    fetch(`https://shopquest-backend.onrender.com/api/order/all-order-admin`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        setOrders(data.data);
      });
    });
  }, []);
  const router = useRouter();
  return (
    <>
      <title>Orders</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">Orders</h3>
          <button
            className="text-white bg-sky-600 h-10  px-5 rounded-md hover:bg-sky-700 duration-300"
            onClick={() => router.push("/admin-view/orders/add-order")}
          >
            Add order
          </button>
        </div>
        <div className=" mt-10 mx-16">
          {orders.map((order: any) => (
            <>
              <div className=" border bg-white mb-4 p-4 ">
                <div className=" flex border-b pb-4 items-center justify-between">
                  order createdAt :{" "}
                  {format(
                    order.createdAt === undefined ? null : order.createdAt,
                    "yyyy-MM-dd"
                  )}
                  <div className={`capitalize flex items-center`}>
                    order status :{" "}
                    <p
                      className={`${
                        order.status === "is Processing" ? " bg-black" : ""
                      } w-2 h-2 rounded-full mx-2`}
                    >
                      {" "}
                    </p>{" "}
                    {order.status}
                  </div>
                  <button className=" py-2 px-4 border-sky-600 border cursor-pointer  rounded-lg">
                    edit
                  </button>
                </div>
                <div className=" flex justify-between items-start mt-4">
                  <div>
                    <div>name : {order.shippingAddress.fullName}</div>
                    <div>mobile : {order.shippingAddress.mobile}</div>
                    <div>
                      anotherMobile :{" "}
                      {order.shippingAddress.anotherMobile === ""
                        ? "none"
                        : order.shippingAddress.anotherMobile}
                    </div>
                    <div>country : {order.shippingAddress.country}</div>
                    <div>address : {order.shippingAddress.address}</div>
                    <div>totalPrice : {order.totalPrice}</div>
                  </div>
                  <Dialog>
                    <DialogTrigger className=" border border-sky-600 cursor-pointer py-2 px-4">
                      show details
                    </DialogTrigger>
                    <DialogContent className=" min-w-[1200px]">
                      <DialogHeader>
                        <DialogTitle>order details</DialogTitle>
                        <DialogDescription>
                          <Table className=" bg-white p-2 w-[1100px] mx-5 my-5 shadow-md">
                            <TableHeader>
                              <TableRow>
                                <TableHead>image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>quntity</TableHead>
                                <TableHead>color</TableHead>
                                <TableHead>size</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.orderItems.map((orderdetail: any) => (
                                <>
                                  <TableRow>
                                    <TableCell>
                                      <img
                                        src={orderdetail.productImage}
                                        alt="img"
                                        draggable="false"
                                        className="w-32 h-20"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      {orderdetail.productName}
                                    </TableCell>
                                    <TableCell>
                                      {orderdetail.productPrice}
                                    </TableCell>
                                    <TableCell>{orderdetail.qty}</TableCell>
                                    <TableCell>
                                      <p
                                        className={`bg-[${orderdetail.color}] w-5 h-5 rounded-full`}
                                      ></p>
                                    </TableCell>
                                    <TableCell>{orderdetail.size}</TableCell>
                                  </TableRow>
                                </>
                              ))}
                            </TableBody>
                          </Table>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

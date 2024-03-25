/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
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

export default function MyOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://shopquest-backend.onrender.com/api/order/all-order", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        setOrders(data.data);
      });
    });
  }, []);

  return (
    <div className=" border p-5 w-full ">
      <div className="">
        <h3 className=" text-2xl font-semibold ">my orders</h3>
        <div className=" mt-4">
          {orders.length === 0 || orders === undefined ? (
            <p> no orders </p>
          ) : (
            orders.map((order: any) => (
              <>
                <div className=" border bg-white mb-4 p-4 ">
                  <div className=" flex flex-wrap border-b pb-4 items-center  ">
                    <div className=" mr-4 lg:mr-0">
                      order createdAt :{" "}
                      {format(
                        order.createdAt === undefined ? null : order.createdAt,
                        "yyyy-MM-dd"
                      )}
                    </div>
                    <div className={`capitalize flex items-center lg:ml-10`}>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

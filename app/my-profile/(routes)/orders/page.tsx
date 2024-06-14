/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useContext } from "react";
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
import { GlobalContext } from "@/context";
import { format } from "date-fns";

export default function MyOrder() {
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const { isAuthUser } = useContext(GlobalContext);

  useEffect(() => {
    fetch("http://localhost:4000/api/order/all-order", {
      credentials: "include",
      headers: {
        Authorization: "Bearer " + isAuthUser?.token,
      },
    }).then((response) => {
      response.json().then((data) => {
        setOrders(data.data);
      });
    });
  }, [isAuthUser]);

  return (
    <>
      <title>Shopa</title>
      <div className=" border p-5 w-full ">
        <div className="">
          <h3 className=" text-2xl font-semibold "> طلباتي </h3>
          <div className=" mt-4">
            {orders === undefined ? (
              <p> لا يوجد طلبات </p>
            ) : (
              orders.map((order: any) => (
                <>
                  <div className=" border bg-white mb-4 p-4 ">
                    <div className=" flex flex-wrap border-b pb-4 items-center  ">
                      <div className=" mr-4 lg:mr-0 text-lg">
                        تاريخ ارسال الطلب :{" "}
                        {format(
                          order.createdAt === undefined
                            ? null
                            : order.createdAt,
                          "yyyy-MM-dd"
                        )}
                      </div>
                      <div
                        className={`capitalize flex items-center lg:mr-10 text-lg`}
                      >
                        حالة الطلب :{" "}
                        <p
                          className={`${
                            order.status === "is Processing"
                              ? " bg-black"
                              : order.status === "is Shipped"
                              ? "bg-yellow-600"
                              : order.status === "is Deliverd"
                              ? "bg-sky-600"
                              : order.status === "is cancelled"
                              ? "bg-red-600"
                              : order.status === "is return"
                              ? "bg-gray-500"
                              : ""
                          } w-2 h-2 rounded-full mx-2`}
                        >
                          {" "}
                        </p>{" "}
                        <p
                          className={` text-lg ${
                            order.status === "is Processing"
                              ? " text-black"
                              : order.status === "is Shipped"
                              ? "text-yellow-600"
                              : order.status === "is Deliverd"
                              ? "text-sky-600"
                              : order.status === "is cancelled"
                              ? "text-red-600"
                              : order.status === "is return"
                              ? "text-gray-500"
                              : ""
                          }`}
                        >
                          {order.status === "is Processing"
                            ? " الطلب قيد التقدم "
                            : order.status === "is Shipped"
                            ? " قيد التوصيل "
                            : order.status === "is Deliverd"
                            ? " تم التوصيل "
                            : order.status === "is cancelled"
                            ? " تم الالغاء "
                            : order.status === "is return"
                            ? "تم الاسترجاع"
                            : ""}
                        </p>
                      </div>
                      {/* <button
                        className="lg:mr-10 border border-sky-600 p-2 cursor-pointer disabled:opacity-65 disabled:pointer-events-none "
                        disabled={order.status === "is return"}
                      >
                        طلب استبدال او استرجاع
                      </button> */}
                    </div>
                    <div className=" flex flex-col lg:flex-row justify-between items-start mt-4">
                      <div>
                        <div>الاسم كامل : {order.shippingAddress.fullName}</div>
                        <div>رقم الهاتف : {order.shippingAddress.mobile}</div>
                        <div>
                          رقم هاتف اخر :{" "}
                          {order.shippingAddress.anotherMobile === ""
                            ? "لا يوجد"
                            : order.shippingAddress.anotherMobile}
                        </div>
                        <div>المحافظة : {order.shippingAddress.country}</div>
                        <div>العنوان : {order.shippingAddress.address}</div>
                        <div>اجمالي السعر : {order.totalPrice}</div>
                      </div>
                      <div className=" my-2 lg:my-0">
                        ملاحظات :
                        {order.notes === "" ? " لا يوجد ملاحظات " : order.notes}
                      </div>
                      <Dialog>
                        <DialogTrigger className=" border border-sky-600 cursor-pointer py-2 px-4">
                          عرض تفاصيل الطلب
                        </DialogTrigger>
                        <DialogContent className=" lg:min-w-[1200px] max-w-[350px]">
                          <DialogHeader>
                            <DialogTitle> تفاصيل الطلب </DialogTitle>
                            <DialogDescription>
                              <Table className=" bg-white p-2 lg:w-[1100px] w-[350px] mx-5 my-5 shadow-md">
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>صوره المنتج</TableHead>
                                    <TableHead>اسم المنتج</TableHead>
                                    <TableHead> السعر</TableHead>
                                    <TableHead>الكمية</TableHead>
                                    <TableHead>اللون</TableHead>
                                    <TableHead>المقاس</TableHead>
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
                                            className={`w-5 h-5 rounded-full`}
                                            style={{
                                              backgroundColor: `${orderdetail.color}`,
                                            }}
                                          ></p>
                                        </TableCell>
                                        <TableCell>
                                          {orderdetail.size}
                                        </TableCell>
                                      </TableRow>
                                    </>
                                  ))}
                                </TableBody>
                              </Table>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      {/* <div className="border border-sky-600 cursor-pointer py-2 px-4" onClick={()=> setShow(true)}>
                      عرض تفاصيل الطلب
                      </div>
                      {
                        show === true ? <div className=" bg-white w-52 ">
                          <div>
                          </div>
                        </div>: null
                      } */}
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

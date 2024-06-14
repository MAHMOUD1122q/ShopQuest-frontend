"use client";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

export default function AddCoupon() {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");

  const createCoupon = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:4000/api/coupon/add-coupon",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          expiry,
          discount,
        }),
      }
    );
    const finalData = await response.json();
    if (finalData.success) {
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
      <title>add Coupon</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">Add Coupon</h3>
        </div>
        <div>
          <form onSubmit={createCoupon}>
            <div className="flex justify-center items-center">
              <div className=" mr-5 w-[700px] bg-white shadow-md p-4 h-fit">
                <label htmlFor="name">Add Name</label>
                <Input
                  type="text"
                  placeholder="coupon name"
                  className=" w-full mt-2 mb-4"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
                <label htmlFor="expiry">Add expiry</label>
                <Input
                  type="date"
                  placeholder="coupon expiry"
                  className="w-full mt-2 mb-4"
                  id="expiry"
                  name="expiry"
                  value={expiry}
                  onChange={(e: any) => setExpiry(e.target.value)}
                />
                <label htmlFor="discount">Add discount</label>
                <Input
                  type="text"
                  placeholder="discount"
                  className="w-full mt-2"
                  id="discount"
                  name="discount"
                  value={discount}
                  onChange={(e: any) => setDiscount(e.target.value)}
                />
                <button className=" w-full bg-sky-600 py-2 text-white mt-6">
                  add Coupon
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

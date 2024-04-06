"use client";
import { toast } from "@/components/ui/use-toast";
import React, { useState } from "react";

export default function AddAddress() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [anotherMobile, setAnotherMobile] = useState("");
  const [country, setCountry] = useState("");

  const createAddress = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      "https://shopquest-backend.onrender.com/api/address/add-address",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          address,
          mobile,
          country,
          anotherMobile,
          fullName,
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
    <div className=" border p-8 w-full ml-10 ">
      <div className="">
        <h3 className=" text-2xl font-semibold my-2">add address</h3>
        <form onSubmit={createAddress}>
          <label htmlFor=""> FullName</label>
          <input
            type="text"
            className=" w-96 block bg-gray-50 border py-2 mt-2 rounded-lg px-2"
            placeholder=" fullName"
            name="fullName"
            value={fullName}
            onChange={(e: any) => setFullName(e.target.value)}
          />
          <div className=" flex mt-2">
            <div className="mt-2">
              <label htmlFor=""> Phone Number</label>
              <input
                type="text"
                className=" w-72 mr-10 block bg-gray-50 border py-2 mt-2 rounded-lg px-2"
                placeholder=" phone Number"
                name="mobile"
                value={mobile}
                onChange={(e: any) => setMobile(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <div className=" flex justify-between">
                <label htmlFor=""> Another phone Number</label>
                <p className=" text-sky-600">(optional)</p>
              </div>
              <input
                type="text"
                className=" w-72 block bg-gray-50 border py-2 mt-2 rounded-lg px-2"
                placeholder=" another phone Number"
                name="mobile"
                value={anotherMobile}
                onChange={(e: any) => setAnotherMobile(e.target.value)}
              />
            </div>
          </div>
          <div className=" mt-4">
            <label htmlFor="">Country</label>
            <input
              type="text"
              className=" w-96 mr-10 block bg-gray-50 border py-2 mt-2 rounded-lg px-2"
              placeholder=" country"
              name="country"
              value={country}
              onChange={(e: any) => setCountry(e.target.value)}
            />
          </div>
          <div className=" mt-4">
            <label htmlFor="">Address</label>
            <input
              type="text"
              className=" w-96 mr-10 block bg-gray-50 border py-2 mt-2 rounded-lg px-2"
              placeholder=" address"
              name="address"
              value={address}
              onChange={(e: any) => setAddress(e.target.value)}
            />
          </div>
          <button className=" mt-4 bg-sky-600 text-white hover:bg-sky-700 duration-300 py-2 rounded-lg px-6">
            add address
          </button>
        </form>
      </div>
    </div>
  );
}

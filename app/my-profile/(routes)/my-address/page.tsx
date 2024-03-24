"use client";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/context";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function MyAddress() {
  const { cartItems, address, setAddress } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:4000/api/address/all-address", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        setAddress(data);
      });
    });
  }, []);

  const deleteAddress = async (id: any) => {
    const data = await fetch(
      `http://localhost:4000/api/address/delete-address/${id}`,
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
  return (
    <div className=" border p-5 w-full ">
      <div className="">
        <h3 className=" text-2xl font-semibold ">my address</h3>
        <div>
          <div className="">
            {address === undefined ||
            address === null ||
            address.data === null ||
            address.data === undefined ? null : address.data.length === 0 ? (
              <>
                <p className="mt-5 capitalize"> no address added</p>
                <button
                  className=" bg-sky-600 text-white py-2 rounded-xl px-10 mt-2  hover:bg-sky-700 duration-300 "
                  onClick={() => router.push("/my-profile/add-address")}
                >
                  add address{" "}
                </button>
              </>
            ) : (
              <>
                {address.data.map((address: any) => (
                  <>
                    <div className=" border p-6 mt-4 relative">
                      <span
                        className=" absolute right-5 top-5 cursor-pointer"
                        onClick={() => deleteAddress(address._id)}
                      >
                        X
                      </span>
                      <div>
                        <p>fullname : {address.fullName}</p>
                        <p className=" lg:inline block">
                          mobile : {address.mobile}
                        </p>
                        <p className=" lg:inline lg:ml-20 block ">
                          anotherMobile :{" "}
                          {address.anotherMobile === "" ? (
                            <span>nothing</span>
                          ) : (
                            <span> {address.anotherMobile}</span>
                          )}
                        </p>
                        <p>country : {address.country}</p>
                        <p>address : {address.address}</p>
                      </div>
                    </div>
                  </>
                ))}
                <button
                  className=" bg-sky-600 text-white py-2 rounded-xl px-10 mt-4  hover:bg-sky-700 duration-300 "
                  onClick={() => router.push("/my-profile/add-address")}
                >
                  add new address{" "}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

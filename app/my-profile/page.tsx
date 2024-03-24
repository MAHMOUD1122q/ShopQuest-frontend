/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/context";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function MyProfile() {
  const { isAuthUser } = useContext(GlobalContext);

  const username = isAuthUser?.username;
  const email = isAuthUser?.email;
  const image = isAuthUser?.image;
  const userUpdate = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className=" border p-5 mx-3 lg:mx-0">
      <div>
        <h3 className=" text-2xl font-semibold ">my profile</h3>
        <div className=" flex items-center mt-3">
          <form onSubmit={userUpdate}>
            <div className=" flex flex-wrap my-3">
              <div className=" flex items-center mb-4 w-full">
                <img src={image} alt="" className=" w-14 h-14 mr-8 " />
                <input
                  type="file"
                  className=" disabled:opacity-70 disabled:pointer-events-none mr-3 lg:w-96 w-60 block bg-gray-50 border py-2 mt-2 rounded-lg px-2"
                  placeholder="username"
                  name="username"
                  disabled
                />
              </div>
              <div>
                <label htmlFor="">username</label>
                <input
                  type="text"
                  className=" disabled:opacity-70 disabled:pointer-events-none mr-3 lg:w-96 w-60 block bg-gray-50 border py-2 mt-2 rounded-lg px-2"
                  placeholder="username"
                  name="username"
                  disabled
                  value={username}
                />
              </div>
              <div>
                <label htmlFor="">email</label>
                <input
                  type="text"
                  className=" disabled:opacity-70 disabled:pointer-events-none lg:w-96 w-60 block bg-gray-50 border py-2 mt-2 rounded-lg px-2"
                  placeholder="email"
                  name="email"
                  disabled
                  value={email}
                />
              </div>
            </div>
            <button className=" bg-sky-600 text-white py-2 px-6 rounded-lg mt-4 hover:bg-sky-700 duration-300 ">
              update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

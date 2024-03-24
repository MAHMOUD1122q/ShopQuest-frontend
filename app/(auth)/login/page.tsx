"use client";

import Image from "next/image";
import { User, Key } from "lucide-react";
import {useState,useContext } from "react";

import {useRouter} from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { GlobalContext } from "@/context";


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthUser, setCartItems ,setWishlist } =
    useContext(GlobalContext);
  const login = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const finalData = await response.json();
    if (finalData.success) {
      fetch("http://localhost:4000/api/auth/all-cart", {
        credentials: "include",
      }).then((response) => {
        response.json().then((data) => {
          setCartItems(data);
        });
      });
      fetch("http://localhost:4000/api/auth/all-wishlist", {
        credentials: "include",
      }).then((response) => {
        response.json().then((data) => {
          setWishlist(data.wishlist);
        });
      });
      toast({
        variant:"success",
        title: finalData.message,
      })
      setIsAuthUser(finalData);
      router.push("/")
    }
    else {
      toast({
        variant:"destructive",
        title: finalData.message,
      })
    }
  };
  return (
    <>
      <title> Login </title>
      <div className="flex pt-44 pb-20 mx-4 md:mx-64">
        <div className={` duration-700 `}>
        <p className=" text-gray-600 text-center my-2 text-lg">
            welcome back
          </p>
          <div className="flex">
            <button
              className={`px-16 py-2 hover:bg-sky-600 hover:text-white mr-2 duration-300 border-[1px]`}
              onClick={() => router.push("/register")}
            >
              Register
            </button>
            <button className=" px-[54px] py-2 bg-sky-600 text-white duration-300 border-[1px]">
              Login
            </button>
          </div>
          <form onSubmit={login}>
            <div className=" relative mt-4">
              <span className=" absolute top-1/2 translate-y-[-50%] pl-1">
                <User className=" text-slate-600" />
              </span>
              <input
                type="email"
                placeholder=" Email "
                className="px-8 border-[1px] w-[345px] h-10"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <span className=" block text-red-600"></span>
            {/* ============================ */}
            <div className=" relative mt-4">
              <span className=" absolute top-1/2 translate-y-[-50%] pl-1">
                <Key className=" text-slate-600" />
              </span>
              <input
                type="password"
                placeholder=" Password "
                className="px-8 border-[1px] w-[345px] h-10"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <span className=" block text-red-600"></span>
            <button className=" text-white py-2 w-[345px] mt-8 duration-300 bg-sky-600">
              Login
            </button>
          </form>
          <a className=" mt-4 block text-sky-700 cursor-pointer">
            Forgeten passord
          </a>
          <a
            className=" mt-4 block text-sky-700 cursor-pointer"
            onClick={() => router.push("/")}
          >
            Return to home page &rarr;
          </a>
        </div>
        <div className={` ml-24 duration-700`}>
          <Image src="/registerImage.png" alt="" width={800} height={100} />
        </div>
      </div>
    </>
  );
}

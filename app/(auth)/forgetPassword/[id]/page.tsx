/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useContext } from "react";
import { toast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";

export default function ForgetPassword() {
  const router = useRouter();

  const { id } = useParams();
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const [newPassword, setNewPassword] = useState("");
  const ResetPassowrd = async (e: any) => {
    setPageLevelLoader(true);
    e.preventDefault();
    const response = await fetch(
      `http://localhost:4000/api/auth/reset-password/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
        }),
      }
    );
    const finalData = await response.json();
    if (finalData.success) {
      toast({
        variant: "success",
        title: finalData.message,
      });
      setPageLevelLoader(false);
    } else {
      toast({
        variant: "destructive",
        title: finalData.message,
      });
      setPageLevelLoader(false);
    }
  };
  return (
    <>
      <title> Shopa </title>
      <div className="flex justify-center items-center pt-16 pb-20 mx-4 md:mx-64">
        <div className={`  duration-700 `}>
          <div className=" text-center  flex justify-center items-center">
            <img src="/forgetPassword.svg" alt="" className=" w-32 h-32" />
          </div>
          <p className=" text-gray-600 text-center my-2 text-lg">
            تغير الباسورد
          </p>
          <form
            onSubmit={ResetPassowrd}
            className="border-sky-600 border p-8 rounded-xl"
          >
            <div className=" relative" dir="rtl">
              <input
                type="password"
                placeholder=" كلمة مرور جديده "
                className="px-2 border-[1px] border-[#ddd] w-[280px] h-10"
                value={newPassword}
                name="email"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button className=" text-white py-2 w-[280px] mt-4 hover:bg-sky-700 duration-300 bg-sky-600">
              {pageLevelLoader ? (
                <ComponentLevelLoader
                  text={" لحظة من فضلك "}
                  loading={pageLevelLoader}
                />
              ) : (
                " تاكيد "
              )}
            </button>
          </form>
          <a
            className=" mt-4 block text-sky-700 cursor-pointer"
            dir="rtl"
            onClick={() => router.push("/")}
          >
            العوده للصفحة الرئيسية &larr;
          </a>
        </div>
      </div>
    </>
  );
}

"use client";
import { toast } from "@/components/ui/use-toast";
import React, { useState, useContext } from "react";
import { GlobalContext } from "@/context";
import ComponentLevelLoader from "@/components/Loader/componentlevel";

export default function AddAddress() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [anotherMobile, setAnotherMobile] = useState("");
  const [country, setCountry] = useState("");

  const { isAuthUser, pageLevelLoader, setPageLevelLoader } =
    useContext(GlobalContext);

  const createAddress = async (e: any) => {
    setPageLevelLoader(true);

    e.preventDefault();
    const response = await fetch(
      "http://localhost:4000/api/address/add-address",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + isAuthUser?.token,
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
      setPageLevelLoader(false);
      toast({
        variant: "success",
        title: finalData.message,
      });
    } else {
      setPageLevelLoader(false);
      toast({
        variant: "destructive",
        title: finalData.message,
      });
    }
  };
  return (
    <>
      <title> Shopa </title>
      <div className=" border p-8 w-full ml-10 ">
        <div className="">
          <h3 className=" text-2xl font-semibold my-2"> اضافة عنوان </h3>
          <form onSubmit={createAddress}>
            <label htmlFor=""> الاسم كامل </label>
            <input
              type="text"
              className=" w-96 block bg-gray-50 border py-2 mt-2 rounded-lg px-2"
              placeholder=" الاسم كامل"
              name="fullName"
              value={fullName}
              onChange={(e: any) => setFullName(e.target.value)}
            />
            <div className=" flex mt-2">
              <div className="mt-2">
                <label htmlFor=""> رقم الهاتف </label>
                <input
                  type="text"
                  className=" w-72 ml-10 block bg-gray-50 border py-2 mt-2 rounded-lg px-2"
                  placeholder=" رقم الهاتف  "
                  name="mobile"
                  value={mobile}
                  onChange={(e: any) => setMobile(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <div className=" flex justify-between">
                  <label htmlFor=""> رقم هاتف اخر </label>
                  <p className=" text-sky-600">(اختياري)</p>
                </div>
                <input
                  type="text"
                  className=" w-72 block bg-gray-50 border py-2 mt-2 rounded-lg px-2"
                  placeholder=" رقم هاتف اخر  "
                  name="mobile"
                  value={anotherMobile}
                  onChange={(e: any) => setAnotherMobile(e.target.value)}
                />
              </div>
            </div>
            <div className=" mt-4">
              <label htmlFor=""> المحافظة </label>
              <select
                value={country}
                defaultValue="المحافظة"
                onChange={(e: any) => setCountry(e.target.value)}
                className=" w-96 ml-10 block bg-gray-50 border py-2 mt-2 rounded-lg px-2"
              >
                <option value="بور سعيد">بور سعيد</option>
                <option value="الغربية"> الغربية </option>
                <option value="الدقهلية">الدقهلية</option>
                <option value="البحيرة">البحيرة</option>
                <option value="الشرقية">الشرقية</option>
                <option value="كفر الشيخ">كفر الشيخ</option>
                <option value="بني سويف">بني سويف</option>
                <option value="سوهاج">سوهاج</option>
                <option value="الأقصر">الأقصر</option>
                <option value="القاهرة">القاهرة</option>
                <option value="الجيزة">الجيزة</option>
                <option value="الأسكندرية">الأسكندرية</option>
                <option value="الاسماعيلية">الاسماعيلية</option>
                <option value="سويس">سويس</option>
                <option value="القليوبية">القليوبية</option>
                <option value="الفيوم">الفيوم</option>
                <option value="دمياط">دمياط</option>
                <option value="المنوفية">المنوفية</option>
                <option value="اسيوط">اسيوط</option>
                <option value="قنا">قنا</option>
                <option value="أسوان">أسوان</option>
                <option value="مطروح">مطروح</option>
                <option value="البحر الأحمر / الغردقة">
                  البحر الأحمر / الغردقة
                </option>
                <option value="منيا">منيا</option>
              </select>
            </div>
            <div className=" mt-4">
              <label htmlFor=""> العنوان </label>
              <input
                type="text"
                className=" w-96 ml-10 block bg-gray-50 border py-2 mt-2 rounded-lg px-2"
                placeholder=" العنوان "
                name="address"
                value={address}
                onChange={(e: any) => setAddress(e.target.value)}
              />
            </div>
            <button className=" mt-4 bg-sky-600 text-white hover:bg-sky-700 duration-300 py-2 rounded-lg px-6">
              {pageLevelLoader ? (
                <ComponentLevelLoader
                  text={" لحظة من فضلك "}
                  loading={pageLevelLoader}
                />
              ) : (
                " اضافة العنوان "
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

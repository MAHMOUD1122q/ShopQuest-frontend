"use client";
import { useRouter } from "next/navigation";
import { Facebook } from "lucide-react";

/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  const router = useRouter();
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="bg-[rgb(5,9,30)] z-50 p-3 mt-4">
      <div className=" flex lg:p-8 p-1 justify-between items-center">
        <div>
          <img
            src="/footer.png"
            alt=""
            className="w-32 h-32 bg-white rounded-full"
          />
        </div>
        <div>
          <p className=" text-white text-xl text-center">تابعنا علي</p>
          <ul className=" text-white flex mt-2 items-center">
            <a href="https://www.facebook.com/profile.php?id=100094870417290" target="_blank">
              <li className=" mr-2 border rounded-xl p-2 cursor-pointer">
                <Facebook className=" w-7 h-7" />
              </li>
            </a>
            <a href="https://www.tiktok.com/@shopastore0?is_from_webapp=1&sender_device=pc" target="_blank">
              <li className="  border rounded-xl p-2 cursor-pointer">
                <img src="/tik-tok.png" alt="" className=" w-7 h-7" />{" "}
              </li>
            </a>
          </ul>
        </div>
      </div>
      <div className="md:hidden z-[1002] relative lg:p-2 py-2  bg-[rgb(5,9,30)] text-white">
      <ul className=" flex flex-wrap justify-center items-center">
        <li
          className="lg:mx-2 p-2 mx-[7px] cursor-pointer"
          onClick={() => router.push("/about")}
        >
          عن المتجر
        </li>
        <li
          className="lg:mx-2 p-2  mx-[7px] cursor-pointer"
          onClick={() => router.push("/shipping")}
        >
          الشحن والتسليم
        </li>
        <li
          className="lg:mx-2 p-2  mx-[7px] cursor-pointer"
          onClick={() => router.push("/payment-methods")}
        >
          طرق الدفع
        </li>
        <li
          className="lg:mx-2 p-2  mx-[7px] cursor-pointer"
          onClick={() => router.push("/return-policy")}
        >
          سياسة الاستبدال والاسترجاع
        </li>
      </ul>
    </div>
      <div className=" text-white py-4 px-2 border-t text-center border-white">
        جميع الحقوق محفوظة  Shopa&copy; {year}
      </div>
    </div>
  );
}

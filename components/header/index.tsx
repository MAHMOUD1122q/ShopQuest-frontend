"use client";
import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();
  return (
    <div className=" hidden md:flex justify-between items-center z-[1002] relative border-b lg:p-2 py-2  bg-[rgb(5,9,30)] text-white">
      <ul className=" flex ">
        <li
          className="lg:mx-2 mx-[7px] cursor-pointer"
          onClick={() => router.push("/about")}
        >
          عن المتجر
        </li>
        <li
          className="lg:mx-2 mx-[7px] cursor-pointer"
          onClick={() => router.push("/shipping")}
        >
          الشحن والتسليم
        </li>
        <li
          className="lg:mx-2 mx-[7px] cursor-pointer"
          onClick={() => router.push("/payment-methods")}
        >
          طرق الدفع
        </li>
        <li
          className="lg:mx-2 mx-[7px] cursor-pointer"
          onClick={() => router.push("/return-policy")}
        >
          سياسة الاستبدال والاسترجاع
        </li>
      </ul>
    </div>
  );
}

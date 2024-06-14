import React from "react";

export default function Shipping() {
  return (
    <>
    <title>Shopa</title>
    <div className=" mt-[-20px] p-4" dir="rtl">
      <h2 className=" border-b pb-4 text-3xl">الشحن والتسليم</h2>
      <div className=" mt-8">
        <h3 className=" font-semibold text-2xl">
          {" "}
          الشحن لباب المنزل في خلال أيام:
        </h3>
        <p className=" w-full leading-7">
          بعد الاتصال بك لتأكيد طلبك، نوصل الطلب للعنوان الذي حددته خلال 3 لـ 7
          <br />
          أيام عمل.
        </p>
      </div>
    </div>
    </>
  );
}

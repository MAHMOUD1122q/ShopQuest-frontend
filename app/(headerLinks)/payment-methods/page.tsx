import React from "react";

export default function PaymentMethods() {
  return (
  <>
  <title>Shopa</title>
    <div className=" mt-[-20px] p-4" dir="rtl"> 
      <h2 className=" border-b pb-4 text-3xl">طرق الدفع</h2>
      <div className=" mt-8">
        <h3 className=" font-semibold text-2xl"> الدفع عند الاستلام:</h3>
        <p className=" w-full leading-7">
          لأننا نضمن لك تجربة تسوق آمنة، يمكنك الدفع عند الاستلام بعد توصيل طلبك
          للعنوان الذي تحدده. تأكد من ادخال المعلومات الآتية لتوصيل طلبك في أسرع
          وقت 
          <br />
          (المدينة - المنطقة - المنزل).
        </p>
      </div>
    </div>
  </>
  );
}

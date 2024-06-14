import React from "react";

export default function About() {
  return (
   <>
   <title> Shopa</title>
    <div className=" mt-[-20px] p-4" dir="rtl">
      <h2 className=" border-b pb-4 text-3xl">عن المتجر</h2>
      <div className=" mt-8">
        <h3 className=" font-semibold text-2xl">
          {" "}
          تنوع في المنتجات، بأفضل جودة وبأسعار تنافسية:
        </h3>
        <p className=" w-full leading-7">
          تسوق بسهولة واستمتع بتجربة ممتعة ومختلفة مع متجرنا. نوفر لك العديد من
          المنتجات بأفضل جودة وبأقل الأسعار، حتى تختار من الأفضل، ونضمن لك تجربة
          تسوق آمنة مع متجرنا. منتجات متنوعة تم اختيارها بعناية حتى تناسب
          إحتياجاتك. يمكنك استبدال أو استرجاع المنتج خلال 14 يوم. اطلب وأنت
          مطمئن، الدفع عند الاستلام. توصيل سريع لباب منزلك خلال أيام.
        </p>
      </div>
    </div>
   </>
  );
}

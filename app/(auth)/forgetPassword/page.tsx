/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { toast } from "@/components/ui/use-toast";
import CountdownTimer from "@/components/countDown";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import ComponentLevelLoader from "@/components/Loader/componentlevel";

export default function ForgetPassword() {
  const router = useRouter();
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("reset password ");
  const [timer, setTimer] = useState(false);

  const [popup, setPopup] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  let currentOTPIndex: number = 0;
  const inputRef = useRef<HTMLInputElement>(null);

  const disabledButton = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 120000);
  };

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);

    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);

    setOtp(newOTP);
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (e.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);
  const SendOTB = async (e: any) => {
    setPageLevelLoader(true);
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/otp/sendOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        message,
      }),
    });
    const finalData = await response.json();
    if (finalData.success) {
      toast({
        variant: "success",
        title: finalData.message,
      });
      setPageLevelLoader(false);
      setPopup(true);
    } else {
      toast({
        variant: "destructive",
        title: finalData.message,
      });
      setPageLevelLoader(false);
      setPopup(false);
    }
  };
  const notReceived = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/otp/sendOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        message,
      }),
    });
    const finalData = await response.json();
    if (finalData.success) {
      toast({
        variant: "success",
        title: finalData.message,
      });
      setTimer(true);
      disabledButton();
    } else {
      toast({
        variant: "destructive",
        title: finalData.message,
      });
      disabledButton();
    }
  };
  const VerifyOTP = async (e: any) => {
    setPageLevelLoader(true);
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/otp/verifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp: otp.join(""),
      }),
    });
    const finalData = await response.json();
    if (finalData.success) {
      toast({
        variant: "success",
        title: finalData.message,
      });
      setPageLevelLoader(false);
      router.push(`/forgetPassword/${finalData.user._id}`);
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
      <div className="flex justify-center items-center pt-16 pb-20 mx-4 md:mx-64 mt-[-100px]">
        <div className={`  duration-700 `}>
          <div className=" text-center  flex justify-center items-center">
            <img src="forgetPassword.svg" alt="" className=" w-32 h-32" />
          </div>
          <p className=" text-gray-600 text-center my-2 text-lg">
            تعديل الباسورد
          </p>
          <form
            onSubmit={SendOTB}
            className="border-sky-600 border p-8 rounded-xl"
          >
            <div className=" relative" dir="rtl">
              <span className=" absolute top-1/2 translate-y-[-50%] pl-1"></span>
              <input
                type="email"
                placeholder=" الايميل "
                className="px-2 border-[1px] border-[#ddd] w-[280px] h-10"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <span className=" block text-red-600"></span>
            <button className=" text-white py-2 w-[280px] mt-4 hover:bg-sky-700 duration-300 bg-sky-600">
              {pageLevelLoader ? (
                <ComponentLevelLoader
                  text={" لحظة من فضلك "}
                  loading={pageLevelLoader}
                />
              ) : (
                " ارسال "
              )}
            </button>
          </form>
          <a className=" mt-4 block text-sky-700 cursor-pointer" dir="rtl">
            العوده للصفحة الرئيسية &larr;
          </a>
        </div>
      </div>
      {popup === true ? (
        <div
          className={
            "absolute top-0  w-full bg-gray-200/80 h-screen flex justify-center items-center flex-col"
          }
        >
          <div className="bg-white p-16 flex justify-center items-center flex-col rounded-xl mt-24">
            <div className=" text-center  flex justify-center items-center">
              <img src="forgetPassword.svg" alt="" className=" w-28 h-28" />
            </div>
            <h3> ادخل الكود </h3>
            <p className=" text-gray-500 my-3 text-md w-64 ml-10">
              تم إرسال رسالة تحتوي على الرمز إلى البريد الإلكتروني الذي قدمته.
            </p>
            <form onSubmit={VerifyOTP}>
              <div className="flex space-x-2 justify-center items-center">
                {otp.map((_, index) => {
                  return (
                    <div key={index}>
                      <input
                        ref={activeOTPIndex === index ? inputRef : null}
                        type="number"
                        className={
                          "w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
                        }
                        onChange={handleOnChange}
                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                        value={otp[index]}
                      />
                      {index === otp.length - 1 ? null : (
                        <span className={"w-2 py-0.5 bg-gray-400"} />
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                className="text-center block mx-auto my-2 text-sky-600 hover:opacity-60 duration-300 cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
                onClick={notReceived}
                disabled={disabled}
              >
                لم يصل الرمز ؟
              </button>
              {timer === true ? (
                <>
                  <CountdownTimer
                    minutes={2}
                    text=" يمكنك إرسال الرمز مرة أخرى بعد:"
                  />
                </>
              ) : null}
              <button className=" text-white py-2 w-[250px] mt-4 hover:bg-sky-700 duration-300 bg-sky-600 rounded-lg">
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
          </div>
        </div>
      ) : null}
    </>
  );
}

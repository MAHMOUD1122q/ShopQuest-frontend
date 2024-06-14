"use client";
import Image from "next/image";
import { User, Mail, Key } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { toast } from "@/components/ui/use-toast";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const router = useRouter();

  const register = async (e: any) => {
    setPageLevelLoader(true);
    e.preventDefault();
    const data = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const finalData = await data.json();
    if (finalData.success) {
      toast({
        variant: "success",
        title: finalData.message,
      });
      setPageLevelLoader(false);
      router.push("/login");
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
      <div className="flex pt-44 pb-20 mx-4 md:mx-64 mt-[-100px]">
        <div className={` duration-700 `}>
          <div className="flex">
            <button
              className={`w-48 py-2 bg-sky-600 mr-2 text-white duration-300 border-[1px]`}
            >
              تسجيل الدخول
            </button>
            <button
              className=" px-[54px] py-2 bg-gray-100 hover:bg-sky-600 hover:text-white duration-300 border-[1px]"
              onClick={() => router.push("/login")}
            >
              تسجيل
            </button>
          </div>
          <form onSubmit={register}>
            <div className=" relative mt-4" dir="rtl">
              <span className=" absolute top-1/2 translate-y-[-50%] pr-1">
                <User className=" text-slate-600" />
              </span>
              <input
                type="text"
                placeholder=" اسم المستخدم "
                className="pr-8 border-[1px] w-[345px] h-10"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <span className=" block text-red-600"></span>
            {/* ============================ */}
            {/* ============================ */}
            <div className=" relative mt-4" dir="rtl">
              <span className=" absolute top-1/2 translate-y-[-50%] pr-1">
                <Mail className=" text-slate-600" />
              </span>
              <input
                type="email"
                placeholder=" الايميل "
                className="pr-8 border-[1px] w-[345px] h-10"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <span className=" block text-red-600"></span>
            {/* ============================ */}
            <div className=" relative mt-4" dir="rtl">
              <span className=" absolute top-1/2 translate-y-[-50%] pr-1">
                <Key className=" text-slate-600" />
              </span>
              <input
                type="password"
                placeholder=" كلمة المرور "
                className="pr-8 border-[1px] w-[345px] h-10"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <span className=" block text-red-600"></span>
            <button className=" text-white py-2 w-[345px] mt-4 hover:bg-sky-700 duration-300 bg-sky-600">
              {pageLevelLoader ? (
                <ComponentLevelLoader
                  text={" لحظة من فضلك "}
                  loading={pageLevelLoader}
                />
              ) : (
                " تسجيل الدخول "
              )}
            </button>
          </form>
          <a
            onClick={() => router.push("/login")}
            className=" mt-4 block text-[#185a9d] cursor-pointer"
            dir="rtl"
          >
            انا املك حساب بالفعل
          </a>
          <a
            onClick={() => router.push("/")}
            className=" mt-4 block text-[#185a9d] cursor-pointer"
            dir="rtl"
          >
            العوده للصفحة الرئيسية &larr;
          </a>
        </div>
        <div className={` ml-24 duration-700`}>
          <Image src="/registerImage.png" alt="" width={800} height={100} />
        </div>
      </div>
    </>
  );
}

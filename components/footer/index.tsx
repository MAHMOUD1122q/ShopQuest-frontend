import { Facebook } from "lucide-react";

/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return(
    <div className="bg-[rgb(5,9,30)] z-50 p-3 mt-4">
      <div className=" flex p-8 justify-between items-center">
        <div>
          <img src="/ShopQuest.png" alt="" className="w-52 h-32" />
        </div>
        <div>
          <p className=" text-white">Follow us on</p>
          <ul className=" text-white flex mt-2 items-center">
            <li className=" mr-2 border rounded-xl p-2 cursor-pointer">
              <Facebook className=" w-7 h-7" />
            </li>
            <li className=" mr-2 border rounded-xl p-2 cursor-pointer">
              <img src="/tik-tok.png" alt="" className=" w-7 h-7" />{" "}
            </li>
          </ul>
        </div>
      </div>
      <div className=" text-white py-4 px-2 border-t text-center border-white">
        All rights reserved to ShopQuest {year}
      </div>
    </div>
  );
}

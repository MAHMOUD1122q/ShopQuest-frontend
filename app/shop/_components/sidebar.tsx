"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [categorys, setCategorys] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:4000/api/category/all-category`, {}).then(
      (response) => {
        response.json().then((data) => {
          setCategorys(data.data);
        });
      }
    );
  }, []);

  return (
    <div className=" min-w-72 p-8 mt-20 border-[1px] mx-auto md:mx-0 rounded-lg h-fit mb-3">
      <h3 className=" font-semibold text-xl mb-5">جميع الفئات</h3>
      <ul>
        {categorys.map((category: any) => (
          <li
            className=" mb-3 flex items-center cursor-pointer hover:opacity-60 duration-500"
            onClick={() =>
              router.push(`/shop/${category.name}?category=${category.name}`)
            }
            key={category.name}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

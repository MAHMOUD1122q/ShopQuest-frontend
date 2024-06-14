/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PencilIcon, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function Categorys() {
  const [categorys, setCategorys] = useState([]);
  const [allData, setallData] = useState({} as any);

  useEffect(() => {
    fetch(`http://localhost:4000/api/category/all-category`, {}).then(
      (response) => {
        response.json().then((data) => {
          setCategorys(data.data);
          setallData(data);
        });
      }
    );
  }, []);
  const deleteCategory = async (id: any) => {
    const data = await fetch(
      `http://localhost:4000/api/category/delete-category/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const finalData = await data.json();
    if (finalData.success) {
      toast({
        variant: "success",
        title: finalData.message,
      });
      setTimeout(() => {
        history.go(0);
      }, 2000);
    }
  };

  const count = allData?.categoryCount;
  const router = useRouter();
  return (
    <>
      <title>Categorys</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">
            ({count}) Categorys
          </h3>
          <button
            className="text-white bg-sky-600 h-10  px-5 rounded-md hover:bg-sky-700 duration-300"
            onClick={() => router.push("/admin-view/categorys/add-category")}
          >
            Add Category
          </button>
        </div>
        <Table className=" bg-white p-2 w-[1100px] mx-5 my-5 shadow-md">
          <TableCaption>A list of Categorys</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categorys.map((category: any) => (
              <>
                <TableRow>
                  <TableCell>
                    <img
                      src={category.image}
                      alt="image"
                      className="w-32 h-20"
                    />
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-right">
                    {" "}
                    <div className=" flex justify-end">
                      <PencilIcon
                        fill="#854d0e"
                        fillOpacity="0.3"
                        className=" text-yellow-800 h-7 w-7 bg-white border-[1px] p-[5px] mr-2 cursor-pointer"
                      />
                      <Trash
                        fill="#b91c1c"
                        fillOpacity="0.3"
                        className=" text-red-700 h-7 w-7 bg-white border-[1px] p-[5px] cursor-pointer"
                        onClick={() => deleteCategory(category._id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

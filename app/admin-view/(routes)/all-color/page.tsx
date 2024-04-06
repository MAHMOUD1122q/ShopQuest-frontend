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

export default function Colors() {
  const [colors, setColors] = useState([]);
  const [allData, setallData] = useState({} as any);

  useEffect(() => {
    fetch(
      `https://shopquest-backend.onrender.com/api/color/all-color`,
      {}
    ).then((response) => {
      response.json().then((data) => {
        setColors(data.data);
        setallData(data);
      });
    });
  }, []);
  const deleteColor = async (id: any) => {
    const data = await fetch(
      `https://shopquest-backend.onrender.com/api/color/delete-color/${id}`,
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
  const count = allData?.ColorCount;

  const router = useRouter();
  return (
    <>
      <title>Colors</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">({count}) Color</h3>
          <button
            className="text-white bg-sky-600 h-10  px-5 rounded-md hover:bg-sky-700 duration-300"
            onClick={() => router.push("/admin-view/all-color/add-color")}
          >
            Add Color
          </button>
        </div>
        <Table className=" bg-white p-2 w-[1100px] mx-5 my-5 shadow-md">
          <TableCaption>A list of Color</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>label</TableHead>
              <TableHead className="text-center">color</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colors.map((color: any) => (
              <>
                <TableRow>
                  <TableCell>{color.label}</TableCell>
                  <TableCell className="text-center flex justify-center items-center">
                    <div
                      className={`bg-[${color.label}] h-8 w-8 rounded-full z-50`}
                    />
                  </TableCell>
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
                        onClick={() => deleteColor(color._id)}
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

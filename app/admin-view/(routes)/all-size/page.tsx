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

export default function Sizes() {
  const [sizes, setSizes] = useState([]);
  const [allData, setallData] = useState({} as any);

  useEffect(() => {
    fetch(`https://shopquest-backend.onrender.com/api/size/all-size`, {}).then((response) => {
      response.json().then((data) => {
        setSizes(data.data);
        setallData(data);
      });
    });
  }, []);
  const deleteSize = async (id: any) => {
    const data = await fetch(
      `https://shopquest-backend.onrender.com/api/size/delete-size/${id}`,
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
  }
  const count = allData?.SizeCount;

  const router = useRouter();
  return (
    <>
      <title>Sizes</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">({count}) Sizes</h3>
          <button
            className="text-white bg-sky-600 h-10  px-5 rounded-md hover:bg-sky-700 duration-300"
            onClick={() => router.push("/admin-view/all-size/add-size")}
          >
            Add Size
          </button>
        </div>
        <Table className=" bg-white p-2 w-[1100px] mx-5 my-5 shadow-md">
          <TableCaption>A list of Size</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>label</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizes.map((size: any) => (
              <>
                <TableRow>
                  <TableCell>{size.label}</TableCell>
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
                        onClick={() => deleteSize(size._id)}
                      
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

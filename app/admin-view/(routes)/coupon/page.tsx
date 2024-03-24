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

export default function Coupon() {
  const [coupons, setCoupons] = useState([]);
  const [allData, setallData] = useState({} as any);

  useEffect(() => {
    fetch(`http://localhost:4000/api/coupon/all-coupon`, {}).then(
      (response) => {
        response.json().then((data) => {
          setCoupons(data.data);
          setallData(data);
        });
      }
    );
  }, []);
  const count = allData?.CouponCount;

  const router = useRouter();
  return (
    <>
      <title>Coupons</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">
            ({count}) Coupons
          </h3>
          <button
            className="text-white bg-sky-600 h-10  px-5 rounded-md hover:bg-sky-700 duration-300"
            onClick={() => router.push("/admin-view/coupon/add-coupon")}
          >
            Add Coupon
          </button>
        </div>
        <Table className=" bg-white p-2 w-[1100px] mx-5 my-5 shadow-md">
          <TableCaption>A list of coupons</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>expiry</TableHead>
              <TableHead>discount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon: any) => (
              <>
                <TableRow>
                  <TableCell>{coupon.name}</TableCell>
                  <TableCell>{coupon.expiry}</TableCell>
                  <TableCell>{coupon.discount}</TableCell>
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

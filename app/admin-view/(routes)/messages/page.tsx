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

export default function Messages() {
  const router = useRouter();
  return (
    <>
      <title>Messages</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">Messages</h3>
          <button
            className="text-white bg-sky-600 h-10  px-5 rounded-md hover:bg-sky-700 duration-300"
            onClick={() => router.push("/admin-view/messages/add-message")}
          >
            Add Message
          </button>
        </div>
        <Table className=" bg-white p-2 w-[1100px] mx-5 my-5 shadow-md">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">id</TableHead>
              <TableHead>Message description</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">Credit Card</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

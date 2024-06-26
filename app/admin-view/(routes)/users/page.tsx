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
import { toast } from "@/components/ui/use-toast";
import { PencilIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [allData, setallData] = useState({} as any);
  useEffect(() => {
    fetch(`http://localhost:4000/api/auth/all-users`, {}).then((response) => {
      response.json().then((data) => {
        setUsers(data.data);
        setallData(data);
      });
    });
  }, []);
  const deleteProduct = async (id: any) => {
    const data = await fetch(
      `http://localhost:4000/api/auth/delete-user/${id}`,
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
  const router = useRouter();
  const count = allData?.userCount;
  return (
    <>
      <title>Users</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">({count}) Users</h3>
          {/* <button
            className="text-white bg-sky-600 h-10  px-5 rounded-md hover:bg-sky-700 duration-300"
            onClick={() => router.push("/admin-view/users/add-user")}
          >
            Add User
          </button> */}
        </div>
        <Table className=" bg-white p-2 w-[1100px] mx-5 my-5 shadow-md">
          <TableCaption>A list of users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead> Number of Orders</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <>
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="">
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
                        onClick={() => deleteProduct(user._id)}
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

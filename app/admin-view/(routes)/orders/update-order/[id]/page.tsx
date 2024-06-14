"use client";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";

import { toast } from "@/components/ui/use-toast";

const initialFormData = {
  notes: "",
  status: "",
};

export default function Product() {
  const [formData, setFormData] = useState(initialFormData);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/api/order/single-order?id=${id}`, {}).then(
      (response) => {
        response.json().then((data) => {
          setFormData(data.data);
        });
      }
    );
  }, [id]);
  const updateOrder = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:4000/api/order/update-order/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      }
    );
    const finalData = await response.json();
    if (finalData.success) {
      toast({
        variant: "success",
        title: finalData.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: finalData.message,
      });
    }
  };
  return (
    <>
      <title>update product</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">update product</h3>
        </div>
        <div>
          <form onSubmit={updateOrder}>
            <div className="flex mx-5 ">
              <div className=" mr-5 bg-white shadow-md p-4 h-fit basis-2/4">
                <select
                  value={formData.status}
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className=" w-full border-2 border-[#ddd]"
                >
                  <option value="is Processing">is Processing</option>
                  <option value="is cancelled">is cancelled</option>
                  <option value="is return">is return</option>
                  <option value="is Shipped">is Shipped</option>
                  <option value="is Deliverd">is Deliverd</option>
                </select>
                <div className=" flex flex-col">
                  <label> update note</label>
                  <textarea
                    className=" mb-5 w-full h-32 border-2"
                    name="notes"
                    value={formData.notes}
                    onChange={(e: any) =>
                      setFormData({
                        ...formData,
                        notes: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <button className=" w-full bg-sky-600 py-2 text-white">
                  update product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

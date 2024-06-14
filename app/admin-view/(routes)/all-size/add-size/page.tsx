"use client";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

export default function AddSize() {
  const [label, setLabel] = useState("");

  const createSize = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/size/add-size", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label,
        value: label,
      }),
    });
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
      <title>add Size</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">Add Size</h3>
        </div>
        <div>
          <form onSubmit={createSize}>
            <div className="flex justify-center items-center">
              <div className=" mr-5 w-[700px] bg-white shadow-md p-4 h-fit">
                <label htmlFor="name">Add label</label>
                <Input
                  type="text"
                  placeholder="Size name"
                  className=" w-full mt-2 mb-4"
                  id="name"
                  name="label"
                  value={label}
                  onChange={(e: any) => setLabel(e.target.value)}
                />
                <button className=" w-full bg-sky-600 py-2 text-white mt-6">
                  add Size
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

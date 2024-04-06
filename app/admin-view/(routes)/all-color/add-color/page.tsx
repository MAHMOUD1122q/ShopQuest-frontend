"use client";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

export default function AddColor() {
  const [label, setLabel] = useState("");

  const createColor = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      "https://shopquest-backend.onrender.com/api/color/add-color",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label,
          value: label,
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
      <title>add Color</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">Add Color</h3>
        </div>
        <div>
          <form onSubmit={createColor}>
            <div className="flex justify-center items-center">
              <div className=" mr-5 w-[700px] bg-white shadow-md p-4 h-fit">
                <label htmlFor="name">Add label</label>
                <Input
                  type="text"
                  placeholder="Color name"
                  className=" w-full mt-2 mb-4"
                  id="name"
                  name="label"
                  value={label}
                  onChange={(e: any) => setLabel(e.target.value)}
                />
                <button className=" w-full bg-sky-600 py-2 text-white mt-6">
                  add Color
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

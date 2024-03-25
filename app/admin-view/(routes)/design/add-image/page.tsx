"use client";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AddImage() {
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [imagesPreview, setImagesPreview] = useState('');

  const createSlider = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image",image);
    formData.append("link",link);
    const response = await fetch(
      "https://shopquest-backend.onrender.com/api/slider/add-slider",
      {
        method: "POST",
        body: formData
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
      <title>add image</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">Add image</h3>
        </div>
        <div>
          <form onSubmit={createSlider}>
            <div className="flex mx-5 ">
              <div className=" mr-5 bg-white shadow-md p-4 h-fit">
                <label htmlFor="dir">Add Direction</label>
                <Input
                  type="text"
                  placeholder="direction"
                  className="w-[500px] mt-2"
                  id="dir"
                  name="link"
                  value={link}
                  onChange={(e: any) => setLink(e.target.value)}
                />
                <button className=" w-full bg-sky-600 py-2 text-white mt-6">
                  add slider
                </button>
              </div>
              <div className=" w-[500px] mb-5 bg-white shadow-md p-4">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    accept="image/*"
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    name="image"
                    onChange={(e: any) =>
                      setImage((prev: any) => e.target.files[0])
                    }
                  />
                </label>
                <div className=" flex">
                    <>
                      <Image
                        src={imagesPreview}
                        alt="Preview"
                        width={96}
                        height={96}
                        className="w-24 h-24 border-[1px] p-1 rounded-md mt-3"
                      />
                    </>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

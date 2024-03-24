"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function Product() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState([] as any);
  const [sizes, setSizes] = useState([] as any);
  const [status, setStatus] = useState("");
  const [isShow, setIsShow] = useState(true as any);
  const [isSale, setIsSale] = useState(false as any);
  const [discount, setDiscount] = useState(0 as any);
  const [images, setImages] = useState([] as any);
  const [imagesPreview, setImagesPreview] = useState([] as any);

  function isValidForm() {
    if (isSale === true) {
      return true;
    }
  }

  const [categorysData, setCategorysData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/category/all-category`, {}).then(
      (response) => {
        response.json().then((data) => {
          setCategorysData(data.data);
        });
      }
    );
  }, []);
  const [colorsData, setColorsData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/color/all-color`, {}).then((response) => {
      response.json().then((data) => {
        setColorsData(data.data);
      });
    });
  }, []);
  const [sizesData, setSizesData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/size/all-size`, {}).then((response) => {
      response.json().then((data) => {
        setSizesData(data.data);
      });
    });
  }, []);

  useEffect(() => {
    const files = Array.from(images);
    setImagesPreview([]);
    files.forEach((file: any) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray: any) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [images]);
  const createProduct = async (e: any) => {
    e.preventDefault();
    let fd = new FormData();
    fd.set("name", name);
    fd.set("price", price);
    fd.set("sku", sku);
    fd.set("category", category);
    fd.set("description", description);
    fd.set("status", status);
    for (var x = 0; x < colors.length; x++) {
      fd.append("color", colors[x]);
    }
    for (var x = 0; x < sizes.length; x++) {
      fd.append("sizes", sizes[x]);
    }
    fd.set("isShow", isShow);
    fd.set("isSale", isSale);
    fd.set("discount", discount);
    for (var x = 0; x < images.length; x++) {
      fd.append("images", images[x]);
    }
    const response = await fetch(
      "http://localhost:4000/api/product/add-product",
      {
        method: "POST",
        body: fd,
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

  const handleSelectChangeColor = (event: any) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option: any) => option.value
    );
    setColors(selectedValues);
  };
  const handleSelectChangeSize = (event: any) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option: any) => option.value
    );
    setSizes(selectedValues);
  };
  return (
    <>
      <title>add product</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">Add product</h3>
        </div>
        <div>
          <form onSubmit={createProduct}>
            <div className="flex mx-5 ">
              <div className=" mr-5 bg-white shadow-md p-4 h-fit basis-2/4">
                {/*  */}
                <label>Add Product name</label>
                <Input
                  type="text"
                  placeholder="Product name"
                  className="w-full mt-2 mb-5"
                  name="name"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
                {/*  */}
                <label>Add Price</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="w-full mt-2 mb-5"
                  name="price"
                  value={price}
                  onChange={(e: any) => setPrice(e.target.value)}
                />
                {/*  */}
                <label>
                  code/Sku <span className="text-gray-500">(optional)</span>
                </label>
                <Input
                  type="text"
                  placeholder="SKU"
                  className="w-full mt-2 mb-5"
                  name="sku"
                  value={sku}
                  onChange={(e: any) => setSku(e.target.value)}
                />
                {/*  */}
                <label> Category </label>
                <Select onValueChange={(e: any) => setCategory(e)}>
                  <SelectTrigger className="w-full mb-5">
                    <SelectValue placeholder="select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorysData.map((category: any) => (
                      <>
                        <SelectItem value={category.name}>
                          {category.name}
                        </SelectItem>
                      </>
                    ))}
                  </SelectContent>
                </Select>
                {/*  */}
                <div className=" flex flex-col">
                  <label>description</label>
                  <textarea
                    className=" mb-5 w-full h-32 border-2"
                    name="description"
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                {/*  */}
                <label>Properties</label>
                <Dialog>
                  <DialogTrigger className="bg-sky-600 mt-2 mb-5 block w-full py-2 text-white hover:bg-sky-700 duration-300">
                    Add Proberties
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Proberties</DialogTitle>
                      <DialogDescription>
                        <div>
                          <h3>Add colors</h3>
                          <div>
                            <select
                              multiple
                              value={colors}
                              onChange={handleSelectChangeColor}
                              className=" w-full border-2 border-[#ddd]"
                            >
                              {colorsData.map((color: any) => (
                                <>
                                  <option
                                    value={color.label}
                                    className="p-2 border-b-[1px] hover:bg-slate-200 duration-300 selection:bg-slate-400 "
                                  >
                                    {color.label}
                                  </option>
                                </>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className=" mt-3">
                          <h3>Add sizes</h3>
                          <div>
                            <select
                              multiple
                              value={sizes}
                              onChange={handleSelectChangeSize}
                              className=" w-full border-2 border-[#ddd]"
                            >
                              {sizesData.map((size: any) => (
                                <>
                                  <option
                                    value={size.label}
                                    className="p-2 border-b-[1px] hover:bg-slate-200 duration-300 selection:bg-slate-400 "
                                  >
                                    {size.label}
                                  </option>
                                </>
                              ))}
                            </select>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                {/*  */}
                <label htmlFor="price"> Status</label>
                <Select onValueChange={(e: any) => setStatus(e)}>
                  <SelectTrigger className="w-full mb-5">
                    <SelectValue placeholder="select status"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sold">Sold</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="default">default</SelectItem>
                  </SelectContent>
                </Select>
                {/*  */}
                <input
                  type="checkbox"
                  className=" mr-2 w-5 h-5 my-5"
                  checked={isShow === true}
                  onChange={(e: any) => setIsShow(e.target.checked)}
                />
                <label htmlFor="price" className=" mr-2">
                  show on website
                </label>
                {/*  */}
                <div>
                  <input
                    type="checkbox"
                    className=" mr-2 w-5 h-5 my-5"
                    onChange={(e: any) => setIsSale(e.target.checked)}
                  />
                  <label htmlFor="sale">sale on product</label>
                </div>
                {/*  */}
                <label htmlFor="price">amount of sale</label>
                <Input
                  type="number"
                  placeholder="amount of sale"
                  className="w-full mt-2 mb-5 "
                  id="price"
                  name="discount"
                  value={discount}
                  onChange={(e: any) => setDiscount(e.target.value)}
                  disabled={!isValidForm()}
                />
                {/*  */}
                <button className=" w-full bg-sky-600 py-2 text-white">
                  add product
                </button>
              </div>
              <div className=" basis-2/4 mb-5 bg-white shadow-md p-4 h-fit">
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
                    multiple
                    type="file"
                    className="hidden"
                    onChange={(e: any) =>
                      setImages((prev: any) => e.target.files)
                    }
                  />
                </label>
                <div className=" flex">
                  {imagesPreview.map((img: any) => (
                    <>
                      <Image
                        src={img}
                        key={img}
                        alt="Preview"
                        width={96}
                        height={96}
                        className="w-24 h-24 border-[1px] p-1 rounded-md mt-3"
                      />
                    </>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

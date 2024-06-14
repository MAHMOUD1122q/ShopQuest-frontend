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
  name: "",
  price: "",
  sku: "",
  category: "",
  description: "",
  color: [] as any,
  sizes: [] as any,
  status: "",
  isShow: true,
  isSale: false,
  feature: false,
  discount: 0,
};

export default function UpdateProduct() {
  const [formData, setFormData] = useState(initialFormData);
  const { id } = useParams();

  function isValidForm() {
    if (formData.isSale === true) {
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
    fetch(`http://localhost:4000/api/product/single-product?id=${id}`, {}).then(
      (response) => {
        response.json().then((data) => {
          setFormData(data.data);
        });
      }
    );
  }, [id]);
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
    fetch(`http://localhost:4000/api/size/all-size`, {}).then((response) => {
      response.json().then((data) => {
        setSizesData(data.data);
      });
    });
  }, []);
  const updateProduct = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:4000/api/product/update-product/${id}`,
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

  const handleSelectChangeColor = (event: any) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option: any) => option.value
    );
    setFormData({
      ...formData,
      color: selectedValues,
    });
  };
  const handleSelectChangeSize = (event: any) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option: any) => option.value
    );
    setFormData({
      ...formData,
      sizes: selectedValues,
    });
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
          <form onSubmit={updateProduct}>
            <div className="flex mx-5 ">
              <div className=" mr-5 bg-white shadow-md p-4 h-fit basis-2/4">
                {/*  */}
                <label>update Product name</label>
                <Input
                  type="text"
                  placeholder="Product name"
                  className="w-full mt-2 mb-5"
                  name="name"
                  value={formData.name}
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
                {/*  */}
                <label>update Price</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="w-full mt-2 mb-5"
                  name="price"
                  value={formData.price}
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                />
                {/*  */}
                <label>
                  update code/Sku{" "}
                  <span className="text-gray-500">(optional)</span>
                </label>
                <Input
                  type="text"
                  placeholder="SKU"
                  className="w-full mt-2 mb-5"
                  name="sku"
                  value={formData.sku}
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      sku: e.target.value,
                    })
                  }
                />
                {/*  */}
                <label> update Category </label>
                <select
                  value={formData.color}
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                >
                  {categorysData.map((category: any) => (
                    <>
                      <option value={category.name}>{category.name}</option>
                    </>
                  ))}
                </select>
                {/*  */}
                <div className=" flex flex-col">
                  <label> update description</label>
                  <textarea
                    className=" mb-5 w-full h-32 border-2"
                    name="description"
                    value={formData.description}
                    onChange={(e: any) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                {/*  */}
                <label> update Properties</label>
                <Dialog>
                  <DialogTrigger className="bg-sky-600 mt-2 mb-5 block w-full py-2 text-white hover:bg-sky-700 duration-300">
                    update Proberties
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>update Proberties</DialogTitle>
                      <DialogDescription>
                        <div>
                          <h3>update colors</h3>
                          <div>
                            <select
                              multiple
                              value={formData.color}
                              onChange={handleSelectChangeColor}
                              className=" w-full border-2 border-[#ddd]"
                            >
                              {colorsData.map((color: any) => (
                                <>
                                  <option
                                    value={color.label}
                                    className="p-2 border-b-[1px] hover:bg-slate-200 duration-300 selection:bg-slate-400 "
                                    style={{
                                      backgroundColor: `${color.label}`,
                                    }}
                                  >
                                    {color.label}
                                  </option>
                                </>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className=" mt-3">
                          <h3>update sizes</h3>
                          <div>
                            <select
                              multiple
                              value={formData.sizes}
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
                <label htmlFor="price">update Status</label>
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
                  <option value="Sold">Sold</option>
                  <option value="New">New</option>
                  <option value="default">default</option>
                </select>
                {/*  */}
                <input
                  type="checkbox"
                  className=" mr-2 w-5 h-5 my-5"
                  checked={formData.isShow === true}
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      isShow: e.target.checked,
                    })
                  }
                />
                <label htmlFor="price" className=" mr-2">
                  show on website
                </label>
                {/*  */}
                {/*  */}
                <input
                  type="checkbox"
                  className=" mr-2 w-5 h-5 my-5"
                  checked={formData.feature === true}
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      feature: e.target.checked,
                    })
                  }
                />
                <label htmlFor="" className=" mr-2">
                  feature
                </label>
                {/*  */}
                <div>
                  <input
                    type="checkbox"
                    className=" mr-2 w-5 h-5 my-5"
                    checked={formData.isSale === true}
                    onChange={(e: any) =>
                      setFormData({
                        ...formData,
                        isSale: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="sale">sale on product</label>
                </div>
                {/*  */}
                <label htmlFor="price">amount of sale</label>
                <Input
                  type="number"
                  placeholder="amount of sale"
                  className="w-full mt-2 mb-5 "
                  name="discount"
                  value={formData.discount}
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      discount: e.target.value,
                    })
                  }
                  disabled={!isValidForm()}
                />
                {/*  */}
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

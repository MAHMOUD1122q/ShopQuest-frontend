import { Switch } from "@/components/ui/switch";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Settings() {
  return (
    <>
      <title>Setting</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">Setting</h3>
        </div>
        <div>
          <div className="flex mx-64 ">
            <div className=" mr-5 bg-white shadow-md  h-fit p-10">
              <div className="">
                <label htmlFor="airplane-mode">
                  All website maintenance mode
                </label>
                <Switch id="airplane-mode" className="ml-1 mb-3" />
              </div>
              <div className="flex items-center">
                <label htmlFor="airplane-mode" className="mr-2">
                  delivery price
                </label>
                <Dialog>
                  <DialogTrigger className="bg-sky-600 block w-[200px] py-2 text-white hover:bg-sky-700 duration-300">
                    delivery price
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Proberties</DialogTitle>
                      <DialogDescription>
                        <h3>Add Checkbox</h3>
                        <div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

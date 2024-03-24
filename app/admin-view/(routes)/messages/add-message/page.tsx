import { Input } from "@/components/ui/input";

export default function AddMessage() {
  return (
    <>
      <title>add Message</title>
      <meta />
      <div>
        <div className="flex items-center justify-between mx-5">
          <h3 className="flex  my-5 text-2xl font-semibold">Add Message</h3>
        </div>
        <div>
          <form className="">
            <div className="flex mx-64 ">
              <div className=" mr-5 bg-white shadow-md p-4 h-fit">
                <label htmlFor="name">Add description</label>
                <Input
                  type="text"
                  placeholder="description"
                  className="w-[400px] mt-2 mb-4"
                  id="name"
                />
                <button type="submit" className=" bg-sky-600 hover:bg-sky-700 duration-300 py-2 w-[400px] text-white">Add Message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

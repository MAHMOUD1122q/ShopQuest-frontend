export default function TileComponent({ data, selected = [], onClick }: any) {
  return data && data.length ? (
    <div className="mt-2 flex flex-wrap items-center gap-1">
      {data.map((dataItem: any) => (
        <label
          onClick={() => onClick(dataItem)}
          className={`cursor-pointer my-2 ${
            selected &&
            selected.length &&
            selected.map((item: any) => item._id).indexOf(dataItem._id) !== -1
              ? "bg-black"
              : ""
          }`}
          key={dataItem._id}
        >
          <span
            className={`rounded-lg border border-black  px-6 py-2 font-bold ${
              selected &&
              selected.length &&
              selected.map((item: any) => item._id).indexOf(dataItem._id) !== -1
                ? "text-white bg-sky-500"
                : ""
            }`}
          >
            {dataItem.name}
          </span>
        </label>
      ))}
    </div>
  ) : null;
}

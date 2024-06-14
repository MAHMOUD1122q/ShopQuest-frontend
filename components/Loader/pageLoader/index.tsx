"use client";

import { MoonLoader } from "react-spinners";

export default function PageLoader({ text, loading, size }: any) {
  return (
    <span className="flex justify-center gap-1 items-center">
      {text}
      <MoonLoader
        color="#36d7b7"
        loading={loading}
        size={size || 10}
        data-testid="loader"
      />
    </span>
  );
}

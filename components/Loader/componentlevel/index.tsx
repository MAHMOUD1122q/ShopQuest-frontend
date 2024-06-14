"use client";

import { SyncLoader } from "react-spinners";

export default function ComponentLevelLoader({ text, loading, size }: any) {
  return (
    <span className="flex gap-1 justify-center items-center">
      <SyncLoader
        color="white"
        loading={loading}
        size={size || 10}
        data-testid="loader"
      />
      {text}
    </span>
  );
}

"use client";
import { Spinner } from "@nextui-org/react";
export default function Loading() {
  return (
    <div className="h-screen w-full justify-center items-center flex">
      <Spinner color="secondary" />
    </div>
  );
}

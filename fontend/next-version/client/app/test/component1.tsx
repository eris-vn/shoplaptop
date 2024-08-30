"use client";

import { useContext } from "react";
import { dataContent } from "./page";

export default function ComponentOne() {
  const data = useContext(dataContent);
  return (
    <>
      <div className="">
        <div className="container mx-auto mt-5 bg-white rounded-sm p-4">
          <div>Đây là component 1</div>
          <div>Nội dung là: {JSON.stringify(data)} </div>
        </div>
      </div>
    </>
  );
}

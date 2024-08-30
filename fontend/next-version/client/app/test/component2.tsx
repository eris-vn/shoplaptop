"use client";

import { useContext } from "react";
import { dataContent } from "./page";

export default function ComponentTwo() {
  const { data, setData } = useContext(dataContent);
  return (
    <>
      <div className="">
        <div className="container mx-auto mt-5 bg-white rounded-sm p-4">
          <div>Đây là component 2</div>
          <div className="relative hidden lg:block border py-3">
            <input
              type="text"
              className="input outline-0 px-4 rounded-md w-[320px] h-full"
              placeholder="Bạn cần tìm kiếm gì?"
              onChange={(e) => {
                setData(e.target.value);
              }}
            />
            <div className="absolute top-2 right-4 text-gray-500">
              <i className="bi bi-search"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

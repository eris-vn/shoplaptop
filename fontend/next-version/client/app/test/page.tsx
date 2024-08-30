"use client";
import { createContext, useState } from "react";
import ComponentOne from "./component2";
import ComponentTwo from "./component1";

export const dataContent = createContext({
  data: "",
  setData: (data: any) => {},
});

export default function Home() {
  const [data, setData] = useState("Some initial data");
  return (
    <>
      <dataContent.Provider value={{ data, setData }}>
        <ComponentOne></ComponentOne>
        <ComponentTwo></ComponentTwo>
      </dataContent.Provider>
    </>
  );
}

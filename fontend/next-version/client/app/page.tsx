import Image from "next/image";
import { auth, signIn } from "./auth";
import Category from "./components/home/category";
import Product from "./components/home/product";
import Banner from "./components/home/banner";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Banner></Banner>
      <Category></Category>
      <Product></Product>
    </>
  );
}

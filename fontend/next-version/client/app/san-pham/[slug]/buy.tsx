"use client";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/app/lib/redux/slices/cart";
import { AppDispatch } from "@/app/lib/redux/store";

export default function BuyButton(props: any) {
  const dispatch = useDispatch<AppDispatch>();

  const addProductToCart = async (slug: string, quantity: number = 1) => {
    const response = await fetch("http://localhost:4000/api/product/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    });

    const data = await response.json();

    if (data.status === 200) {
      const product = {
        id: data.data.id,
        name: data.data.name,
        image: data.data.images?.length ? data.data.images[0].image_url : "",
        price: data.data.price,
        discount: data.data.discount,
        quantity: quantity,
      };
      dispatch(addProduct(product as any));
    }
  };

  return (
    <button
      className="text-center md:min-w-[400px] md:w-fit w-full bg-red-600 text-white py-2 rounded-md mt-5 cursor-pointer"
      onClick={() => {
        addProductToCart(props.slug, 1);
      }}
    >
      <div className="text-lg">MUA NGAY</div>
      <div>Giao tận nơi hoặc nhận tại của hàng</div>
    </button>
  );
}

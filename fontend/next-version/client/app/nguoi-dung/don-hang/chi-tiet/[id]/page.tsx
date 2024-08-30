"use client";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Details() {
  const params = useParams();
  const { status, data: session } = useSession();
  const [orderDetails, setOrderDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchProduct = async () => {
    const req = await fetch(
      `http://localhost:4000/api/user/orders/info?id=${params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${(session as any)?.token}`,
        },
      }
    );

    const res = await req.json();

    if (res.status == 200) {
      setOrderDetails(res.data.OrderDetails);
      setTotalPrice(res.data.total_price);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <div className="bg-white rounded-sm p-5">
        <h3 className="text-2xl">Chi tiết đơn hàng #{params.id}</h3>

        {orderDetails
          ? orderDetails.map((order: any) => {
              return (
                <div className="grid grid-cols-12 border-t pt-4 mt-4">
                  <div className="col-span-8 flex gap-3">
                    <img
                      src="https://product.hstatic.net/200000722513/product/hn074w-final_d1f17cfe60c0443e9bb78a02fa874a21_large_50e5daebd00147d7959f5decd617b193_grande.png"
                      alt=""
                      className="h-[95px] w-[95px] border object-cover"
                    />
                    <div>
                      <div className="line-clamp-2">{order.product.name}</div>
                      <div className="text-red-600">
                        {order.product.price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                      <div className="text-sm text-zinc-500">
                        Số lượng: {order.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 flex flex-col items-end justify-between"></div>
                </div>
              );
            })
          : ""}

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-lg">
            <div>Tổng tiền</div>
            <div className="text-xl text-red-500">
              {(totalPrice ?? 0).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

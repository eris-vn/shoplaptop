"use client";
import React, { useEffect, useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/app/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartQuantity,
  removeProduct,
  clearCart,
} from "@/app/lib/redux/slices/cart";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

import Link from "next/link";

export default function GioHang() {
  const stepperRef = useRef<any>(null);
  const toast = useRef<Toast>(null);
  const [hydrationLoad, setHydrationLoad] = useState(true);

  useEffect(() => {
    setHydrationLoad(false);
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const { status, data: session } = useSession();

  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState<{ id: string } | null>(null);
  const [addressList, setAddressList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Ship COD");
  const [order_details, setOrderDetails] = useState({
    id: "",
    customer: "",
    phone_number: "",
    email: "",
    address: "",
    total: 0,
  });
  const cart = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (productId: number, value: number) => {
    dispatch(updateCartQuantity({ productId, quantity: value }));
  };

  const handleSubmit = () => {
    stepperRef.current.nextCallback();
  };

  const onPayment = async () => {
    const request = await fetch("http://localhost:4000/api/order/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(session as any)?.token}`,
      },
      body: JSON.stringify({
        products: cart.cart,
        address_id: address?.id,
        payment_method: paymentMethod,
      }),
    });
    const data = await request.json();
    if (data.status == 200) {
      setOrderDetails({
        id: data.data.id,
        customer: data.data.user.name,
        email: data.data.user.email,
        address: data.data.address.address,
        phone_number: data.data.address.phone_number,
        total: data.data.total_price,
      });
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: data.msg,
        life: 3000,
      });
      dispatch(clearCart());
      stepperRef.current.nextCallback();
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: data.msg,
        life: 3000,
      });
    }
  };

  useEffect(() => {
    fetch(`http://localhost:4000/api/user/address/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${(session as any)?.token}`,
      },
    })
      .then(async (data) => await data.json())
      .then((data) => {
        setAddressList(data.data);
      });
  }, []);

  useEffect(() => {
    const newTotal = cart.cart.reduce(
      (acc, product) => acc + (product.price as number) * product.quantity,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  return (
    <div>
      {hydrationLoad ? (
        <div>Loading...</div>
      ) : (
        <div className="container mx-auto mt-10 mb-10">
          <div className="w-full max-w-[600px] bg-white mx-auto pt-9 rounded-sm">
            <div className="px-0">
              <Stepper ref={stepperRef} linear={true}>
                <StepperPanel header="Giỏ hàng">
                  {cart.cart.length ? (
                    <div onClick={() => dispatch(clearCart())}>Xoá tất cả</div>
                  ) : (
                    ""
                  )}
                  {cart.cart.length ? (
                    cart.cart.map((product: any, index) => {
                      return (
                        <div
                          className="grid grid-cols-12 border-t pt-4 mt-4"
                          key={index}
                        >
                          <div className="col-span-8 flex gap-3">
                            <img
                              src={product.image}
                              alt=""
                              className="h-[95px] w-[95px] border object-cover"
                            />
                            <div>
                              <div className="line-clamp-2">{product.name}</div>
                              <div className="text-red-600">
                                {(product.price ?? 0).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </div>
                              {product.discount ? (
                                <del className="text-sm text-zinc-600">
                                  {(product.discount ?? 0).toLocaleString(
                                    "it-IT",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}
                                </del>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="col-span-4 flex flex-col items-end justify-between">
                            <div className="flex items-center border rounded">
                              <button
                                className="p-2 text-gray-600 hover:text-gray-800"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    (product.quantity ?? 1) - 1
                                  )
                                }
                                disabled={(product.quantity ?? 1) <= 1}
                              >
                                <i className="bi bi-dash-circle"></i>
                              </button>
                              <input
                                type="number"
                                value={product.quantity ?? 1}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    product.id,
                                    Number(e.target.value)
                                  )
                                }
                                min={1}
                                className="w-16 text-center border-none focus:ring-0"
                              />
                              <button
                                className="p-2 text-gray-600 hover:text-gray-800"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    (product.quantity ?? 1) + 1
                                  )
                                }
                              >
                                <i className="bi bi-plus-circle"></i>
                              </button>
                            </div>

                            <i
                              className="bi bi-trash"
                              onClick={() => {
                                dispatch(removeProduct(product.id));
                              }}
                            ></i>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>Chưa có sản phẩm nào</div>
                  )}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-lg">
                      <div>Tổng tiền</div>
                      <div className="text-xl text-red-500">
                        {total.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                    </div>
                    <div
                      className="w-full text-center bg-red-600 text-white py-4 rounded-sm text-lg font-semibold mt-3 cursor-pointer"
                      onClick={handleSubmit}
                    >
                      XÁC NHẬN
                    </div>
                  </div>
                </StepperPanel>
                <StepperPanel header="Thông tin đặt hàng">
                  <Dropdown
                    value={address}
                    onChange={(e) => setAddress(e.value)}
                    options={
                      addressList
                        ? (addressList.map((e: any) => {
                            return {
                              name: `${e.name} - ${e.address}`,
                              id: e.id,
                            };
                          }) as any)
                        : []
                    }
                    optionLabel="name"
                    placeholder="Chọn địa chỉ giao hàng"
                    className="w-full md:w-14rem border"
                  />
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-lg">
                      <div>Tổng tiền</div>
                      <div className="text-xl text-red-500">
                        {total.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                    </div>
                    <div
                      className="w-full text-center bg-red-600 text-white py-4 rounded-sm text-lg font-semibold mt-3 cursor-pointer"
                      onClick={onPayment}
                    >
                      XÁC NHẬN
                    </div>
                  </div>
                </StepperPanel>
                <StepperPanel header="Thành công">
                  <div className="bg-green-100 text-green-800 text-center py-3 text-lg font-semibold rounded-md">
                    <div>
                      <i className="bi bi-bag-check mr-1"></i> Đặt hàng thành
                      công
                    </div>
                  </div>
                  <div className="mt-3">
                    Cảm ơn quý khách đã cho Shop có cơ hội được phục vụ. Nhân
                    viên Shop sẽ liên hệ với quý khách trong thời gian sớm nhất.
                  </div>
                  <div className="bg-zinc-100 p-4 mt-3">
                    <div className="flex justify-between border-b pb-2 border-zinc-400">
                      <div>ĐƠN HÀNG #{order_details.id}</div>
                      <Link
                        href="/nguoi-dung/don-hang"
                        className="text-blue-600 font-semibold cursor-pointer"
                      >
                        Quản lý đơn
                      </Link>
                    </div>
                    <div className="text-md">
                      <div className="grid grid-cols-12 mt-3">
                        <div className="col-span-4 font-semibold">
                          Khách hàng
                        </div>
                        <div className="col-span-8">
                          {order_details.customer}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 mt-3">
                        <div className="col-span-4 font-semibold">
                          Số điện thoại
                        </div>
                        <div className="col-span-8">
                          {order_details.phone_number}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 mt-3">
                        <div className="col-span-4 font-semibold">Email</div>
                        <div className="col-span-8">{order_details.email}</div>
                      </div>
                      <div className="grid grid-cols-12 mt-3">
                        <div className="col-span-4 font-semibold">Địa chỉ</div>
                        <div className="col-span-8">
                          {order_details.address}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 mt-3">
                        <div className="col-span-4 font-semibold">
                          Tổng tiền
                        </div>
                        <div className="col-span-8">
                          {(order_details.total ?? 0).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </StepperPanel>
              </Stepper>
            </div>
          </div>
        </div>
      )}
      <Toast ref={toast} />
    </div>
  );
}

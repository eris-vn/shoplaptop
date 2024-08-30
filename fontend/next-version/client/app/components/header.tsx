"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Dialog } from "primereact/dialog";

import { Divider } from "primereact/divider";
import { signOut, useSession } from "next-auth/react";
import { authenticate } from "../lib/actions";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

export default function Header() {
  const session = useSession();
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const op = useRef<OverlayPanel>(null);

  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleRegister, setVisibleRegister] = useState(false);

  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const login = async (formData: any) => {
    let res = await authenticate({
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res.code == 200) {
      setVisibleLogin(false);
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: res.message,
        life: 3000,
      });
      window.location.reload();
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: res.message,
        life: 3000,
      });
    }
  };

  const register = async (formData: any) => {
    const request = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: account,
        password: password,
      }),
    });

    const res = await request.json();

    if (res.status == 200) {
      setVisibleRegister(false);
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: res.msg,
        life: 3000,
      });
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: res.msg,
        life: 3000,
      });
    }
  };

  const [search, setSearch] = useState();

  const handleSearch = () => {
    router.push(`/tim-kiem?query=${search}`);
  };

  return (
    <div className="sticky top-0 z-50">
      <Toast ref={toast} baseZIndex={1000} />

      <div className="bg-red-600">
        <div className="container mx-auto py-5 flex justify-between">
          <div className="flex gap-10">
            <Link href="/">
              <img
                src="https://file.hstatic.net/200000636033/file/logo_fd11946b31524fbe98765f34f3de0628.svg"
                alt="Logo"
                className="w-[150px]"
              />
            </Link>
            <div className="relative hidden lg:block">
              <input
                type="text"
                className="input outline-0 px-4 rounded-md w-[320px] h-full"
                placeholder="Bạn cần tìm kiếm gì?"
                defaultValue={search}
                onChange={(e) => setSearch(e.target.value as any)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <div
                className="absolute top-2 right-4 text-gray-500"
                onClick={handleSearch}
              >
                <i className="bi bi-search"></i>
              </div>
            </div>
          </div>
          <div className="text-white flex gap-3">
            <Link
              href="/nguoi-dung/don-hang"
              className="flex gap-2 w-fit p-2 rounded-md px-3 cursor-pointer"
            >
              <i className="bi bi-journal-text"></i>
              <div className="hidden md:block">Tra cứu đơn hàng</div>
            </Link>
            <Link
              href="/gio-hang"
              className="flex gap-2 w-fit p-2 rounded-md px-3 cursor-pointer"
            >
              <i className="bi bi-cart-dash"></i>
              <div className="hidden md:block">Giỏ hàng</div>
            </Link>

            <div
              className="flex gap-2 bg-red-700 w-fit p-2 rounded-md px-3 cursor-pointer text-white text-base outline-none"
              onClick={(e) => {
                if (op.current) {
                  op.current.toggle(e);
                }
              }}
            >
              <i className="bi bi-person"></i>
              <div>
                {session.data?.user ? session.data.user.name : "Đăng nhập"}
              </div>
            </div>
            <OverlayPanel ref={op}>
              <div className="bg-white rounded-md">
                <div className="p-0 min-w-[320px]">
                  <div className="text-base flex gap-3">
                    <span className="w-[20px]">
                      <svg
                        width="18"
                        height="17"
                        viewBox="0 0 24 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_102:3778)">
                          <path
                            d="M3.73909 2.42375L3.62936 2.8938C3.09762 5.15004 2.22365 7.41897 1.02676 9.63384C0.151328 11.2668 -0.175951 13.1255 0.0909153 14.9487C0.400975 17.0265 1.47017 18.9262 3.10282 20.3001C4.73546 21.6741 6.82234 22.4303 8.98149 22.4305H8.98777C10.169 22.4329 11.339 22.2072 12.4298 21.7666C13.5207 21.3259 14.5107 20.6791 15.3425 19.8635L17.1919 18.0604L22.9027 12.5275C23.1619 12.2758 23.3531 11.9658 23.4594 11.625C23.5657 11.2842 23.5838 10.9231 23.5121 10.5739C23.4403 10.2246 23.281 9.89804 23.0482 9.62309C22.8154 9.34815 22.5163 9.13338 22.1776 8.99786L21.9079 8.89069L23.1062 7.72779C23.3136 7.52718 23.4782 7.28876 23.5907 7.02619C23.7031 6.76361 23.7612 6.48205 23.7615 6.19762C23.7619 5.91319 23.7045 5.63148 23.5928 5.36864C23.481 5.1058 23.317 4.86699 23.1101 4.66589L23.0845 4.64097C22.772 4.33651 22.3727 4.13019 21.9384 4.04871L21.7527 4.0144L21.7885 3.83014C21.8143 3.69732 21.8274 3.56247 21.8277 3.4273C21.8282 3.14265 21.7706 2.86073 21.6582 2.59791C21.5457 2.33509 21.3807 2.09662 21.1727 1.89635L21.1408 1.86533C20.7932 1.52722 20.3402 1.31066 19.8526 1.24951C19.365 1.18836 18.8703 1.28607 18.4458 1.52736L18.2467 1.64065L18.1689 1.42912C18.0577 1.13684 17.8826 0.871558 17.6555 0.651661L17.6342 0.630038C17.2172 0.224597 16.6517 -0.00317383 16.062 -0.00317383C15.4723 -0.00317383 14.9068 0.224597 14.4898 0.630038L7.54388 7.38653L8.50776 3.51426C8.58622 3.20813 8.60136 2.88988 8.55231 2.57801C8.50325 2.26614 8.39097 1.96685 8.22199 1.69751C8.05301 1.42818 7.8307 1.19417 7.56795 1.00906C7.3052 0.823961 7.00726 0.691452 6.69142 0.619232C6.37558 0.547012 6.04813 0.536518 5.72808 0.58836C5.40804 0.640203 5.10177 0.753348 4.82706 0.921228C4.55235 1.08911 4.31467 1.30838 4.12782 1.56631C3.94097 1.82424 3.80867 2.11569 3.7386 2.42375H3.73909ZM5.48172 1.79999C5.64955 1.70979 5.83543 1.65592 6.02665 1.64204C6.21788 1.62817 6.40992 1.65463 6.58966 1.71961C6.9019 1.82981 7.16136 2.04815 7.31834 2.33281C7.47533 2.61747 7.5188 2.94843 7.44043 3.26232L6.01442 8.98846C5.94626 9.22349 6.09708 9.45851 6.28077 9.57038C6.3818 9.63055 6.64766 9.74195 6.94157 9.48295L15.2666 1.38776C15.3708 1.28587 15.4948 1.20511 15.6314 1.15017C15.768 1.09522 15.9144 1.06717 16.0622 1.06765C16.2098 1.0672 16.356 1.09517 16.4924 1.14995C16.6288 1.20473 16.7527 1.28523 16.8569 1.38682L16.8777 1.4075C17.0885 1.61275 17.2068 1.89093 17.2068 2.18097C17.2068 2.471 17.0885 2.74918 16.8777 2.95443L11.76 7.93085C11.661 8.03182 11.6065 8.16644 11.6082 8.30596C11.6098 8.44548 11.6676 8.57883 11.769 8.67752C11.8704 8.77621 12.0075 8.83242 12.151 8.83413C12.2945 8.83585 12.433 8.78293 12.5368 8.68669L18.7726 2.62305C18.877 2.52142 19.001 2.44079 19.1375 2.38578C19.274 2.33077 19.4203 2.30246 19.568 2.30246C19.7158 2.30246 19.8621 2.33077 19.9986 2.38578C20.1351 2.44079 20.259 2.52142 20.3635 2.62305L20.3992 2.65125C20.5039 2.75292 20.5869 2.87364 20.6435 3.00652C20.7001 3.1394 20.7293 3.28182 20.7293 3.42566C20.7293 3.5695 20.7001 3.71192 20.6435 3.8448C20.5869 3.97768 20.5039 4.0984 20.3992 4.20007L18.7267 5.81986C17.1823 7.31556 15.4802 8.96355 14.1465 10.2562C14.0917 10.3047 14.0476 10.3635 14.0168 10.4291C13.9859 10.4947 13.9691 10.5656 13.9673 10.6377C13.9654 10.7098 13.9786 10.7815 14.006 10.8484C14.0334 10.9154 14.0745 10.9763 14.1267 11.0274C14.179 11.0786 14.2413 11.1189 14.31 11.146C14.3788 11.173 14.4524 11.1863 14.5265 11.1849C14.6006 11.1836 14.6737 11.1676 14.7413 11.1381C14.809 11.1085 14.8697 11.066 14.92 11.013L14.9238 11.0092C16.1662 9.80588 19.5369 6.54091 20.7212 5.3954C20.9324 5.19126 21.2181 5.07668 21.5159 5.07668C21.8137 5.07668 22.0994 5.19126 22.3106 5.3954L22.3362 5.42032C22.4413 5.52196 22.5247 5.64281 22.5816 5.77591C22.6386 5.90902 22.6679 6.05175 22.6679 6.1959C22.6679 6.34005 22.6386 6.48278 22.5816 6.61588C22.5247 6.74898 22.4413 6.86983 22.3362 6.97148L21.5662 7.71745C19.7858 9.43877 17.4278 11.7232 15.8752 13.2274C15.7722 13.3276 15.7144 13.4634 15.7144 13.6051C15.7144 13.7467 15.7722 13.8825 15.8752 13.9827C15.9261 14.0324 15.9867 14.0718 16.0533 14.0987C16.12 14.1256 16.1914 14.1394 16.2636 14.1394C16.3357 14.1394 16.4072 14.1256 16.4738 14.0987C16.5405 14.0718 16.601 14.0324 16.652 13.9827L20.0575 10.6835L20.5409 10.2172C20.7525 10.0144 21.038 9.90098 21.3352 9.90168C21.6323 9.90239 21.9172 10.0171 22.1279 10.2209C22.3388 10.4263 22.4572 10.7046 22.4572 10.9949C22.4572 11.2851 22.3388 11.5635 22.1279 11.7688L16.4151 17.3051L14.5647 19.1091C13.8347 19.8249 12.9658 20.3927 12.0083 20.7794C11.0509 21.1662 10.024 21.3642 8.98729 21.3621H8.98149C7.08659 21.3618 5.25514 20.698 3.82228 19.4923C2.38941 18.2865 1.45093 16.6194 1.17855 14.7959C0.943867 13.1952 1.23127 11.5633 2.00032 10.1297C3.24167 7.83261 4.15045 5.47625 4.70152 3.13023L4.81125 2.66018C4.85293 2.4784 4.93439 2.30747 5.05008 2.15904C5.16578 2.01061 5.313 1.88815 5.48172 1.79999Z"
                            fill="black"
                          ></path>
                          <path
                            d="M21.9702 17.1911C21.9299 17.0929 21.8606 17.0086 21.7709 16.9487C21.6813 16.8889 21.5754 16.8563 21.4667 16.855C21.358 16.8538 21.2513 16.8839 21.1602 16.9417C21.0692 16.9994 20.9978 17.0821 20.9551 17.1794C20.6669 17.8309 20.2407 18.416 19.7043 18.8965C19.1679 19.377 18.5333 19.7422 17.842 19.9682C17.7735 19.9904 17.7101 20.0255 17.6555 20.0715C17.6009 20.1175 17.5561 20.1735 17.5238 20.2364C17.4914 20.2992 17.4721 20.3676 17.467 20.4377C17.4618 20.5078 17.4709 20.5781 17.4937 20.6448C17.5166 20.7115 17.5527 20.7731 17.6 20.8262C17.6473 20.8793 17.7049 20.9228 17.7695 20.9543C17.8341 20.9857 17.9045 21.0045 17.9766 21.0095C18.0486 21.0145 18.121 21.0057 18.1896 20.9835C19.0285 20.7097 19.7985 20.2667 20.4492 19.6835C21.0999 19.1002 21.6165 18.39 21.9654 17.5991C21.9939 17.5348 22.009 17.4656 22.0098 17.3956C22.0106 17.3256 21.9972 17.2561 21.9702 17.1911Z"
                            fill="black"
                          ></path>
                          <path
                            d="M23.6674 17.8925C23.599 17.8641 23.5253 17.8494 23.4509 17.8492C23.3434 17.8495 23.2384 17.8802 23.1487 17.9378C23.0591 17.9953 22.9887 18.0771 22.9462 18.1731C22.559 19.0467 21.9916 19.8337 21.2791 20.4856C20.5666 21.1375 19.7243 21.6403 18.804 21.9631C18.7361 21.9868 18.6737 22.0232 18.6203 22.0704C18.5669 22.1175 18.5235 22.1744 18.4928 22.2378C18.462 22.3012 18.4443 22.3699 18.4408 22.44C18.4373 22.51 18.4481 22.5801 18.4724 22.6461C18.4968 22.7121 18.5342 22.7728 18.5827 22.8248C18.6312 22.8767 18.6897 22.9188 18.7549 22.9488C18.8201 22.9787 18.8908 22.9959 18.9628 22.9993C19.0349 23.0027 19.1069 22.9922 19.1748 22.9686C20.2368 22.5961 21.2089 22.0158 22.031 21.2634C22.853 20.511 23.5076 19.6025 23.9541 18.5943C24.0114 18.4642 24.0134 18.3174 23.9597 18.1859C23.906 18.0544 23.8009 17.9489 23.6674 17.8925Z"
                            fill="black"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_102:3778">
                            <rect width="24" height="23" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <div>
                      Xin chào,{" "}
                      {session.data?.user
                        ? session.data.user.name
                        : "vui lòng đăng nhập"}
                    </div>
                  </div>

                  {!session.data?.user ? (
                    <div className="flex gap-3 mt-2 text-base text-center">
                      <div
                        className="p-2 px-1 bg-zinc-900 text-white w-full rounded-sm leading-6 cursor-pointer"
                        onClick={() => setVisibleLogin(true)}
                      >
                        ĐĂNG NHẬP
                      </div>
                      <div
                        className="w-full border border-zinc-900 p-2 rounded-sm leading-6 cursor-pointer"
                        onClick={() => setVisibleRegister(true)}
                      >
                        ĐĂNG KÝ
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mt-4 pt-4 border-t">
                        <Link
                          href="/nguoi-dung/ho-so"
                          className="flex gap-4 text-base mb-4"
                        >
                          <i className="bi bi-person-circle w-[20px]"></i>
                          <div>Hồ sơ</div>
                        </Link>
                        <Link
                          href="/nguoi-dung/dia-chi"
                          className="flex gap-4 text-base"
                        >
                          <i className="bi bi-geo-alt-fill w-[20px]"></i>
                          <div>Địa chỉ</div>
                        </Link>
                      </div>
                      <div
                        className="mt-3 pt-3 border-t "
                        onClick={() => signOut()}
                      >
                        <div className="flex gap-4 text-base">
                          <i className="bi bi-box-arrow-right w-[20px]"></i>
                          <div>Đăng xuất</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </OverlayPanel>
          </div>
        </div>
      </div>

      <Dialog
        header="ĐĂNG NHẬP TÀI KHOẢN"
        visible={visibleLogin}
        draggable={false}
        style={{ width: "500px" }}
        onHide={() => {
          if (!visibleLogin) return;
          setVisibleLogin(false);
        }}
      >
        <form
          className="m-0"
          action={async (formData) => {
            await login(formData);
          }}
        >
          <div className="bg-white relative mt-3 mb-1 border-[1px] border-slate-400 focus:outline-none focus:border-slate-500 rounded-md">
            <input
              name="email"
              type="text"
              id="email"
              className="peer bg-transparent h-10 w-full text-gray-800 placeholder-transparent py-2 px-4 focus:outline-none rounded-md border-0"
              placeholder="Type inside me"
              defaultValue={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <label
              htmlFor="username"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-900 bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm rounded-sm pt-[2px] peer-focus:pt-[2px] peer-focus:rounded-sm peer-focus:text-gray-800 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:border-0 peer-placeholder-shown:pt-0 transition-all"
            >
              Email
            </label>
          </div>

          <div className="bg-white relative mt-3 mb-1 border-[1px] border-slate-400 focus:outline-none focus:border-slate-500 rounded-md">
            <input
              name="password"
              type="password"
              id="password"
              className="peer bg-transparent h-10 w-full text-gray-800 placeholder-transparent py-2 px-4 focus:outline-none rounded-md border-0"
              placeholder="Type inside me"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="username"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-900 bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm rounded-sm pt-[2px] peer-focus:pt-[2px] peer-focus:rounded-sm peer-focus:text-gray-800 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:border-0 peer-placeholder-shown:pt-0 transition-all"
            >
              Mật khẩu
            </label>
          </div>

          <div className="text-end mt-3 text-base cursor-pointer">
            Quên mật khẩu?
          </div>
          <button className="bg-red-600 text-center text-white py-3 text-base mt-3 rounded-md cursor-pointer w-full">
            ĐĂNG NHẬP
          </button>

          <div className="my-4">
            <Divider align="center">HOẶC ĐĂNG NHẬP BẰNG</Divider>
          </div>
          <div className="mt-3 flex gap-3 text-center text-white">
            <div className="w-full bg-[#df4a32] py-2 text-base rounded-md cursor-pointer">
              <i className="bi bi-google me-2"></i> Google
            </div>
            <div className="w-full bg-[#3b5998] py-2 text-base rounded-md cursor-pointer">
              <i className="bi bi-facebook me-2"></i> Facebook
            </div>
          </div>
        </form>
      </Dialog>

      <Dialog
        header="ĐĂNG KÝ TÀI KHOẢN"
        visible={visibleRegister}
        draggable={false}
        style={{ width: "500px" }}
        onHide={() => {
          if (!visibleRegister) return;
          setVisibleRegister(false);
        }}
      >
        <form
          className="m-0"
          action={async (formData) => {
            await register(formData);
          }}
        >
          <div className="bg-white relative mt-3 mb-1 border-[1px] border-slate-400 focus:outline-none focus:border-slate-500 rounded-md">
            <input
              name="name"
              type="text"
              id="name"
              className="peer bg-transparent h-10 w-full text-gray-800 placeholder-transparent py-2 px-4 focus:outline-none rounded-md border-0"
              placeholder="Type inside me"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="username"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-900 bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm rounded-sm pt-[2px] peer-focus:pt-[2px] peer-focus:rounded-sm peer-focus:text-gray-800 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:border-0 peer-placeholder-shown:pt-0 transition-all"
            >
              Họ và tên
            </label>
          </div>
          <div className="bg-white relative mt-3 mb-1 border-[1px] border-slate-400 focus:outline-none focus:border-slate-500 rounded-md">
            <input
              name="email"
              type="text"
              id="email"
              className="peer bg-transparent h-10 w-full text-gray-800 placeholder-transparent py-2 px-4 focus:outline-none rounded-md border-0"
              placeholder="Type inside me"
              defaultValue={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <label
              htmlFor="username"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-900 bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm rounded-sm pt-[2px] peer-focus:pt-[2px] peer-focus:rounded-sm peer-focus:text-gray-800 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:border-0 peer-placeholder-shown:pt-0 transition-all"
            >
              Email
            </label>
          </div>

          <div className="bg-white relative mt-3 mb-1 border-[1px] border-slate-400 focus:outline-none focus:border-slate-500 rounded-md">
            <input
              name="password"
              type="password"
              id="password"
              className="peer bg-transparent h-10 w-full text-gray-800 placeholder-transparent py-2 px-4 focus:outline-none rounded-md border-0"
              placeholder="Type inside me"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="username"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-900 bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm rounded-sm pt-[2px] peer-focus:pt-[2px] peer-focus:rounded-sm peer-focus:text-gray-800 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:border-0 peer-placeholder-shown:pt-0 transition-all"
            >
              Mật khẩu
            </label>
          </div>

          <button className="bg-red-600 text-center text-white py-3 text-base mt-3 rounded-md cursor-pointer w-full">
            ĐĂNG ký
          </button>
        </form>
      </Dialog>
    </div>
  );
}

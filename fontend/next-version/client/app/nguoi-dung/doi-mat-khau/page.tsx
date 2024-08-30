"use client";
import { useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Toast } from "primereact/toast";

export default function Page() {
  const { status, data: session } = useSession();
  const toast = useRef<Toast>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = async () => {
    const request = await fetch(`http://localhost:4000/api/user/changePass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(session as any)?.token}`,
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }),
    });
    const response = await request.json();

    if (response.status == 200) {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: response.msg,
        life: 3000,
      });
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: response.msg,
        life: 3000,
      });
    }
  };

  return (
    <div className="bg-white rounded-sm p-5">
      <Toast ref={toast} baseZIndex={1000} />
      <h3 className="text-2xl">Đổi mật khẩu</h3>
      <div className="text-base">
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-3 text-end leading-9">Mật khẩu hiện tại</div>
          <div className="col-span-5">
            <input
              className="border-[1px] border-gray-300 outline-none px-3 py-[6px] rounded-md w-full text-sm focus:border-sky-500"
              type="text"
              placeholder="Nhập mật khẩu hiện tại"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-3 text-end leading-9">Mật khẩu mới</div>
          <div className="col-span-5">
            <input
              className="border-[1px] border-gray-300 outline-none px-3 py-[6px] rounded-md w-full text-sm focus:border-sky-500"
              type="text"
              placeholder="Nhập mật khẩu mới"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-3 text-end leading-9">
            Nhập lại mật khẩu mới
          </div>
          <div className="col-span-5">
            <input
              className="border-[1px] border-gray-300 outline-none px-3 py-[6px] rounded-md w-full text-sm focus:border-sky-500"
              type="text"
              placeholder="Nhập mật khẩu mới"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-3 text-end"></div>
          <div className="col-span-5">
            <div
              className="bg-red-600 text-center w-fit px-5 py-0 text-white rounded-md leading-10 cursor-pointer"
              onClick={changePassword}
            >
              Đổi mật khẩu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

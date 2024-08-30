"use client";
import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import ActionModal from "./action";

export default function Address() {
  const actionRef = useRef<any>();

  const { status, data: session } = useSession();

  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddressList();
  }, [status]);

  const fetchAddressList = async () => {
    try {
      const request = await fetch(
        `http://localhost:4000/api/user/address/list`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${(session as any)?.token}`,
          },
        }
      );
      const response = await request.json();

      setAddressList(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch address list:", error);
      setLoading(false);
    }
  };

  const deleteAddress = async (id: number) => {
    try {
      const request = await fetch(
        "http://localhost:4000/api/user/address/delete",
        {
          method: "DELETE",
          body: JSON.stringify({
            id,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${(session as any)?.token}`,
          },
        }
      );
      const response = await request.json();

      if (response.status === 200) {
        fetchAddressList();
      }
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  return (
    <div className="bg-white rounded-sm p-5">
      <div className="flex justify-between border-b pb-5">
        <h3 className="text-2xl">Thông tin tài khoản</h3>
        <div
          className="bg-blue-600 text-white w-fit px-4 leading-8 rounded-md cursor-pointer"
          onClick={() => actionRef.current?.show("create")}
        >
          + Thêm địa chỉ mới
        </div>
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {addressList.length > 0 ? (
              addressList.map((address: any) => (
                <div key={address.id} className="mt-4 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <div>
                      <div className="flex gap-2">
                        {/* <span className="border border-red-600 text-red-600 px-2 rounded-sm">Mặc định</span> */}
                        <div>{address.name}</div>
                      </div>
                      <div>SĐT: {address.phone_number}</div>
                      <div>Địa chỉ: {address.address}</div>
                    </div>
                    <div className="flex gap-3">
                      <i
                        className="bi bi-pencil cursor-pointer"
                        onClick={() =>
                          actionRef.current?.show("edit", address.id)
                        }
                      ></i>
                      <i
                        className="bi bi-trash cursor-pointer"
                        onClick={() => deleteAddress(address.id)}
                      ></i>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="mt-4">Chưa có địa chỉ nào</div>
            )}
          </>
        )}
      </div>
      <ActionModal
        ref={actionRef}
        token={(session as any)?.token}
        onUpdate={async () => {
          fetchAddressList();
        }}
      />
    </div>
  );
}

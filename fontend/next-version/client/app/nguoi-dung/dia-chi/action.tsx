import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Dialog } from "primereact/dialog";

interface FormData {
  id: string;
  name: string;
  phone_number: string;
  address: string;
}

interface ActionModalProps {
  token: string;
  onUpdate: () => Promise<void>;
}

export interface ActionModalHandle {
  show: (action: "create" | "edit", id?: number) => void;
}

const ActionModal = forwardRef<ActionModalHandle, ActionModalProps>(
  ({ token, onUpdate }, ref) => {
    const [modal, setModal] = useState(false);
    const [type, setType] = useState<"create" | "edit">("create");
    const [form, setForm] = useState<FormData>({
      id: "",
      name: "",
      phone_number: "",
      address: "",
    });

    useImperativeHandle(ref, () => ({
      show(action: "create" | "edit", id?: number) {
        resetForm();
        setType(action);
        if (action === "edit" && id) {
          fetchAddressInfo(id);
        }
        setModal(true);
      },
    }));

    const fetchAddressInfo = async (id: number) => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/user/address/info?id=${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.status === 200) {
          setForm(data.data);
        }
      } catch (error) {
        console.error("Error fetching address info:", error);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };

    const handleSubmit = async () => {
      try {
        const response = await fetch(
          type === "create"
            ? "http://localhost:4000/api/user/address/create"
            : "http://localhost:4000/api/user/address/update",
          {
            method: type === "create" ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
          }
        );
        const data = await response.json();
        if (data.status === 200) {
          setModal(false);
          resetForm();
          if (onUpdate) {
            await onUpdate();
          }
        }
      } catch (error) {
        console.error("Error saving address:", error);
      }
    };

    const resetForm = () => {
      setForm({
        id: "",
        name: "",
        phone_number: "",
        address: "",
      });
    };

    return (
      <div>
        <Dialog
          header={type === "create" ? "THÊM ĐỊA CHỈ MỚI" : "CHỈNH ĐỊA CHỈ"}
          visible={modal}
          draggable={false}
          style={{ width: "500px" }}
          onHide={() => {
            if (!modal) return;
            setModal(false);
          }}
        >
          <div className="bg-white relative mb-4 border-[1px] border-slate-400 focus:outline-none focus:border-slate-500 rounded-md mt-3">
            <input
              name="name"
              type="text"
              id="name"
              value={form.name}
              onChange={handleChange}
              className="peer bg-transparent h-10 w-full text-gray-800 placeholder-transparent py-2 px-4 focus:outline-none rounded-md border-0"
              placeholder="Type inside me"
            />
            <label
              htmlFor="name"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-900 bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm rounded-sm pt-[2px] peer-focus:pt-[2px] peer-focus:rounded-sm peer-focus:text-gray-800 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:border-0 peer-placeholder-shown:pt-0 transition-all"
            >
              Tên người nhận
            </label>
          </div>
          <div className="bg-white relative mb-4 border-[1px] border-slate-400 focus:outline-none focus:border-slate-500 rounded-md mt-3">
            <input
              name="phone_number"
              type="text"
              value={form.phone_number}
              onChange={handleChange}
              className="peer bg-transparent h-10 w-full text-gray-800 placeholder-transparent py-2 px-4 focus:outline-none rounded-md border-0"
              placeholder="Type inside me"
            />
            <label
              htmlFor="phone_number"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-900 bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm rounded-sm pt-[2px] peer-focus:pt-[2px] peer-focus:rounded-sm peer-focus:text-gray-800 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:border-0 peer-placeholder-shown:pt-0 transition-all"
            >
              Số điện thoại
            </label>
          </div>
          <div className="bg-white relative mb-4 border-[1px] border-slate-400 focus:outline-none focus:border-slate-500 rounded-md mt-3">
            <input
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              className="peer bg-transparent h-10 w-full text-gray-800 placeholder-transparent py-2 px-4 focus:outline-none rounded-md border-0"
              placeholder="Type inside me"
            />
            <label
              htmlFor="address"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-900 bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm rounded-sm pt-[2px] peer-focus:pt-[2px] peer-focus:rounded-sm peer-focus:text-gray-800 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:border-0 peer-placeholder-shown:pt-0 transition-all"
            >
              Địa chỉ
            </label>
          </div>

          <div
            className="bg-red-600 text-center text-white py-3 text-base mt-3 rounded-md cursor-pointer"
            onClick={handleSubmit}
          >
            {type === "create" ? "TẠO ĐỊA CHỈ" : "LƯU ĐỊA CHỈ"}
          </div>
        </Dialog>
      </div>
    );
  }
);

export default ActionModal;

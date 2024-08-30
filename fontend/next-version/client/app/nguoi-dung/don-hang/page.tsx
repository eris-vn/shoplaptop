"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import Link from "next/link";

export default function Order() {
  const { status, data: session } = useSession();
  const [orderList, setOrderList] = useState();
  const [totalOrders, setTotalOrders] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  function formatDate(dateString: Date) {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function getStatusText(status: number) {
    switch (status) {
      case 0:
        return "Chờ xử lý";
      case 1:
        return "Đã đóng gói";
      case 2:
        return "Đang giao hàng";
      case 3:
        return "Giao thành công";
      case 4:
        return "Giao hàng thất bại";
      default:
        return "";
    }
  }

  const fetchProduct = async (page = 1) => {
    const req = await fetch(
      `http://localhost:4000/api/user/orders/list?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${(session as any)?.token}`,
        },
      }
    );

    const res = await req.json();

    if (res.status == 200) {
      setOrderList(res.data);
      setTotalOrders(res.paginate.total);
      setPageSize(res.paginate.per_page);
    }
  };

  useEffect(() => {
    fetchProduct(page);
  }, [status, page]);

  const handlePageChange = (event: any) => {
    setPage(event.page + 1);
  };

  return (
    <div className="bg-white rounded-sm p-5">
      <h3 className="text-2xl">Quản lý đơn hàng</h3>

      <DataTable
        className="mt-5 border "
        value={orderList}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="id"
          header="Mã đơn"
          body={(data: any) => {
            return (
              <>
                <Link href={`/nguoi-dung/don-hang/chi-tiet/${data.id}`}>
                  #{data.id}
                </Link>
              </>
            );
          }}
        ></Column>
        <Column field="address.address" header="Địa chỉ"></Column>
        <Column
          field="created_at"
          header="Ngày đặt"
          body={(data: any) => {
            return <>{formatDate(data.created_at)}</>;
          }}
        ></Column>
        <Column
          field="total_price"
          header="Tổng giá"
          body={(data: any) => {
            return (
              <>
                {data.total_price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </>
            );
          }}
        ></Column>
        <Column
          field="status"
          header="Trạng thái"
          body={(data: any) => {
            return <>{getStatusText(data.status)}</>;
          }}
        ></Column>
      </DataTable>

      <div className="mt-5 border">
        <Paginator
          first={(page - 1) * pageSize}
          rows={pageSize}
          totalRecords={totalOrders}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

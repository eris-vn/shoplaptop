import Link from "next/link";

export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto mt-5">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 bg-white rounded-sm">
          <div className="flex gap-5 px-4 py-4 border-b items-center">
            <i className="text-5xl text-gray-600 bi bi-person-circle"></i>
            <div className="text-xl">Tên người dùng</div>
          </div>
          <div className="p-5" id="profile">
            <Link
              href="/nguoi-dung/ho-so"
              className="mb-4 flex gap-4 items-center text-md"
            >
              <i className="bi bi-person-fill text-xl"></i>
              <div>Thông tin tài khoản</div>
            </Link>
            <Link
              href="/nguoi-dung/doi-mat-khau"
              className="mb-4 flex gap-4 items-center text-md"
            >
              <i className="bi bi-person-fill text-xl"></i>
              <div>Đổi mật khẩu</div>
            </Link>
            <Link
              href="/nguoi-dung/dia-chi"
              className="mb-4 flex gap-4 items-center text-md"
            >
              <i className="bi bi-geo-alt-fill w-[20px]"></i>
              <div>Địa chỉ</div>
            </Link>
            <Link
              href="/nguoi-dung/don-hang"
              className="mb-4 flex gap-4 items-center text-md"
            >
              <i className="bi bi-bag-dash-fill w-[20px]"></i>
              <div>Quản lý đơn hàng</div>
            </Link>
          </div>
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </div>
  );
}

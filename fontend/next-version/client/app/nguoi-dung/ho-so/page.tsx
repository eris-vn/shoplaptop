export default function Profile() {
  return (
    <div className="bg-white rounded-sm p-5">
      <h3 className="text-2xl">Thông tin tài khoản</h3>
      <div className="text-base">
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-3 text-end leading-9">Họ tên</div>
          <div className="col-span-5">
            <input
              className="border-[1px] border-gray-300 outline-none px-3 py-[6px] rounded-md w-full text-sm focus:border-sky-500"
              type="text"
              placeholder="Nhập họ và tên"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-3 text-end leading-8">Giới tính</div>
          <div className="col-span-5"></div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-3 text-end">Số điện thoại</div>
          <div className="col-span-5">
            <div>0788624449</div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-3 text-end">Email</div>
          <div className="col-span-5">
            <div>sonn88918@gmail.com</div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-3 text-end">Ngày sinh</div>
          <div className="col-span-5">
            <div className="block"></div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-3 text-end"></div>
          <div className="col-span-5">
            <div className="bg-red-600 text-center w-fit px-5 py-0 text-white rounded-md leading-10 cursor-pointer">
              LƯU THAY ĐỔI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

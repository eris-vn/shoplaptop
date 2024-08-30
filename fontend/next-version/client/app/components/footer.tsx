export default function Footer() {
  return (
    <div className="mt-5 bg-white shadow-md py-5">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 border-b pb-4 gap-5">
          <div>
            <div className="font-semibold mb-2 uppercase">Về Shop</div>
            <div>Giới thiệu</div>
            <div>Tuyển dụng</div>
          </div>
          <div>
            <div className="font-semibold mb-2 uppercase">CHÍNH SÁCH</div>
            <div>Chính sách bảo hành</div>
            <div>Chính sách thanh toán</div>
            <div>Chính sách giao hàng</div>
            <div>Chính sách bảo mật</div>
          </div>
          <div>
            <div className="font-semibold mb-2 uppercase">THÔNG TIN</div>
            <div>Hệ thống cửa hàng</div>
            <div>Trung tâm bảo hành</div>
            <div>Tra cứu địa chỉ bảo hành</div>
          </div>
          <div>
            <div className="font-semibold mb-2 uppercase">
              TỔNG ĐÀI HỖ TRỢ (8:00 - 21:00)
            </div>
            <div>CSKH: 1800.6975 (nhánh 1)</div>
            <div>Bảo hành: 1800.6975 (nhánh 2)</div>
            <div>HTKT: 1800.6975 (nhánh 3)</div>
          </div>
          <div>
            <div className="font-semibold mb-2 uppercase">
              ĐƠN VỊ VẬN CHUYỂN
            </div>
            <div className="grid grid-cols-4 gap-4">
              <img
                src="https://theme.hstatic.net/200000722513/1001172978/14/ship_1.png?v=1105"
                alt=""
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001172978/14/ship_2.png?v=1105"
                alt=""
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001172978/14/ship_3.png?v=1105"
                alt=""
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001172978/14/ship_4.png?v=1105"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <div className="flex items-center gap-4">
            <div>KẾT NỐI VỚI CHÚNG TÔI</div>
            <div className="flex gap-3">
              <img
                className="h-[28px]"
                src="https://file.hstatic.net/200000636033/file/facebook_1_0e31d70174824ea184c759534430deec.png"
                alt=""
              />
              <img
                className="h-[28px]"
                src="https://file.hstatic.net/200000722513/file/tiktok-logo_fe1e020f470a4d679064cec31bc676e4.png"
                alt=""
              />
              <img
                className="h-[28px]"
                src="https://file.hstatic.net/200000636033/file/youtube_1_d8de1f41ca614424aca55aa0c2791684.png"
                alt=""
              />
            </div>
          </div>
          <div>
            <img
              src="https://theme.hstatic.net/200000722513/1001172978/14/logo-bct.png?v=1105"
              className="h-[60px]"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

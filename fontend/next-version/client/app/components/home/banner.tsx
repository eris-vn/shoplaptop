"use client";
import { useState } from "react";

export default function Banner() {
  const [menuItems] = useState([
    {
      icon: "bi bi-laptop",
      name: "Laptop",
    },
    {
      icon: "bi bi-laptop",
      name: "Laptop Gaming",
    },
    {
      icon: "bi bi-laptop",
      name: "PC GVN",
    },
    {
      icon: "bi bi-laptop",
      name: "Main, CPU, VGA",
    },
    {
      icon: "bi bi-laptop",
      name: "Case, Nguồn, Tản",
    },
    {
      icon: "bi bi-laptop",
      name: "Ố cứng, Ram, Thẻ Nhớ",
    },
  ]);

  return (
    <>
      <div className="container mx-auto py-4 mt-5">
        <div className="grid grid-cols-10 gap-2">
          <div className="col-span-12">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                {/* <Swiper
              :navigation="true"
              :pagination="{
                clickable: true,
              }"
              :modules="[SwiperNavigation, SwiperAutoplay, SwiperPagination]"
              :slides-per-view="1"
              :loop="true"
              :autoplay="{
                delay: 3000,
                disableOnInteraction: true,
              }"
            >
              <SwiperSlide v-for="url in banner" :key="url">
                <img :src="url" alt="" srcset="" />
              </SwiperSlide>
            </Swiper> */}
                <img
                  src="https://file.hstatic.net/200000722513/file/banner_slide_4_b4d3c996f3e64796b83e224fd13f0479.png"
                  alt=""
                  className="w-full"
                />
              </div>
              <div>
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <img
                      src="https://file.hstatic.net/200000722513/file/righ-1_dd4fa147990d4c78b3421f2fbed3593f.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://file.hstatic.net/200000722513/file/right-2_91cb114a2b804741a892ff417bba12f9.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

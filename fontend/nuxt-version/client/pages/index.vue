<template>
  <div>
    <!-- BANNER -->
    <div class="container mx-auto py-4 mt-2">
      <div class="grid grid-cols-10 gap-2">
        <div class="col-span-12">
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2">
              <Swiper
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
                  <img :src="url" alt="" srcset="" class="w-full" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div>
              <div class="grid grid-cols-1 gap-2">
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
                    srcset=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- DANH MỤC SẢN PHẨM -->
    <div class="container mx-auto mt-1">
      <div class="bg-white rounded-md py-4 shadow-sm">
        <h3 class="text-2xl px-4 mb-3">Danh mục sản phẩm</h3>

        <div class="border-t px-4 pt-3">
          <div
            class="grid grid-cols-3 2xl:grid-cols-10 xl:grid-cols-10 md:grid-cols-8 gap-4"
          >
            <NuxtLink
              :to="`/danh-muc/${category.slug}`"
              class="flex items-center flex-col"
              v-for="category in categoryList?.data"
            >
              <img
                :src="category.image_url"
                alt=""
                class="w-[84px] h-[84px] object-contain"
              />
              <div class="text-center">{{ category.name }}</div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <!-- PC BÁN CHẠY -->
    <div
      class="container mx-auto mt-5"
      v-for="productCategory in productList?.data"
    >
      <div class="bg-white rounded-md py-4 shadow-sm">
        <div class="flex justify-between px-4 mb-4">
          <div class="flex gap-5">
            <h3 class="text-2xl">{{ productCategory.title }}</h3>
            <div v-if="productCategory.freeship" class="flex gap-5">
              <div class="text-2xl">|</div>
              <div class="flex gap-3 items-center">
                <svg
                  class="h-[16px] w-[24px]"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5 4H16V2C16 0.9 15.1 0 14 0H2C0.9 0 0 0.9 0 2V11C0 12.1 0.9 13 2 13C2 14.66 3.34 16 5 16C6.66 16 8 14.66 8 13H14C14 14.66 15.34 16 17 16C18.66 16 20 14.66 20 13H21C21.55 13 22 12.55 22 12V8.67C22 8.24 21.86 7.82 21.6 7.47L19.3 4.4C19.11 4.15 18.81 4 18.5 4ZM5 14C4.45 14 4 13.55 4 13C4 12.45 4.45 12 5 12C5.55 12 6 12.45 6 13C6 13.55 5.55 14 5 14ZM18.5 5.5L20.46 8H16V5.5H18.5ZM17 14C16.45 14 16 13.55 16 13C16 12.45 16.45 12 17 12C17.55 12 18 12.45 18 13C18 13.55 17.55 14 17 14Z"
                    fill="#FF3C53"
                  ></path>
                </svg>
                <span class="text-xl">Miễn phí giao hàng</span>
              </div>
            </div>
          </div>
          <div
            class="text-blue-600 text-lg hover:text-red-600 ease-in duration-100 cursor-pointer"
          >
            XEM TẤT CẢ
          </div>
        </div>

        <div class="grid grid-cols-10 gap-4 px-4 rounded-sm">
          <div v-if="!productCategory.products.length" class="col-span-12">
            Chưa có sản phẩm nào
          </div>
          <NuxtLink
            :to="`/san-pham/${product.slug}`"
            class="col-span-2 flex items-center flex-col border cursor-pointer"
            v-for="product in productCategory.products"
          >
            <img
              :src="
                product.images.length
                  ? product.images[0]?.image_url
                  : 'https://i.imgur.com/igbbIRf.png'
              "
              alt=""
              class="w-full aspect-[10/10] object-contain"
            />
            <div class="p-2">
              <div class="text-start text-md font-semibold line-clamp-2 mb-2">
                {{ product.name }}
              </div>
              <div v-if="product.discount" class="text-sm text-gray-600">
                <span class="line-through me-3">
                  {{
                    (product.discount ?? 0).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}
                </span>
                <span
                  v-if="product.discount"
                  class="text-red-600 text-sm px-[4px] py-[1px] bg-red-100 border border-red-500 rounded-sm"
                  >-5%</span
                >
              </div>
              <div class="text-lg font-semibold text-red-600">
                {{
                  (product.price ?? 0).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                }}
              </div>
              <div class="flex gap-3 mt-2">
                <div class="text-sm text-amber-600 font-semibold">
                  {{ product.avgRating }}
                  <i class="text-xs bi bi-star-fill"></i>
                </div>
                <div class="text-sm text-gray-700">
                  ({{ product.totalReviews }} đánh giá)
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const banner = [
  "https://file.hstatic.net/200000722513/file/banner_slide_4_b4d3c996f3e64796b83e224fd13f0479.png",
  "https://file.hstatic.net/200000722513/file/banner_slide_5_af06c59c86364bd59f3a655fc2f41a7b.png",
  "https://file.hstatic.net/200000722513/file/banner_nitro_5_bd8de0e626364de8af2aea916a5a5c6f.jpg",
  "https://file.hstatic.net/200000722513/file/laptop_lenovo_40d6a96ea8c0469895d84ebf80bdb66a.jpg",
];

interface Category {
  name: String;
  image_url: string;
  slug: String;
}

interface Product {
  id: Number;
  slug: String;
  name: String;
  price: Number;
  discount: Number;
  images: {
    image_url: string;
  }[];
  avgRating: String;
  totalReviews: String;
}

const [{ data: categoryList }, { data: productList }] = await Promise.all([
  eFetch<{
    status: Number;
    data: Category[];
  }>("/api/home/categoryList", {
    method: "POST",
  }),
  eFetch<{
    status: Number;
    data: {
      title: String;
      freeship: Boolean;
      slug: String;
      products: Product[];
    }[];
  }>("/api/home/productList", {
    method: "POST",
  }),
]);
</script>

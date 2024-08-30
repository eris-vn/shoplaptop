<template>
  <div>
    <div class="container mx-auto mt-5">
      <div class="text-base">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }" class="text-base"
            >Trang chủ</el-breadcrumb-item
          >
          <el-breadcrumb-item class="text-base">{{
            product?.data.name
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="bg-white rounded-md mt-4">
        <div class="grid grid-cols-12 divide-x">
          <div
            class="col-span-12 xl:col-span-4 lg:col-span-5 md:col-span-4 p-5"
          >
            <Swiper
              v-if="images.length"
              :modules="[SwiperNavigation]"
              :slides-per-view="1"
              :loop="false"
              :autoplay="{
                delay: 3000,
                disableOnInteraction: true,
              }"
              :draggable="false"
              space-between="10"
              ref="mainSwiper"
              class="mb-4"
              @slide-change="slideChange"
            >
              <SwiperSlide v-for="image in images" :key="image.image_url">
                <div>
                  <img
                    :src="image.image_url"
                    alt=""
                    srcset=""
                    class="w-full aspect-[10/10] object-cover"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
            <Swiper
              v-if="images.length"
              :modules="[SwiperNavigation]"
              :slides-per-view="5"
              :loop="false"
              :autoplay="{
                delay: 3000,
                disableOnInteraction: true,
              }"
              :draggable="false"
              space-between="10"
            >
              <SwiperSlide v-for="(image, i) in images" :key="image.image_url">
                <div
                  @click="imageChange(i)"
                  class="border rounded-md overflow-hidden"
                  :class="[i == image_index ? 'border-red-400' : '']"
                >
                  <img :src="image.image_url" alt="" srcset="" class="w-full" />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div
            class="col-span-12 xl:col-span-8 lg:col-span-7 md:col-span-8 p-5"
          >
            <h1 class="text-2xl font-semibold">
              {{ product?.data.name }}
            </h1>
            <div class="flex gap-3 mt-2">
              <div class="text-base text-amber-600 font-semibold">
                0.0 <i class="text-xs bi bi-star-fill"></i>
              </div>
              <div class="text-base text-gray-700">
                (0 đánh giá) {{ cart.cart.length }}
              </div>
            </div>
            <div class="flex gap-4 mt-5">
              <div class="text-3xl font-semibold text-red-600">
                {{
                  (product?.data.price ?? 0).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                }}
              </div>
              <span
                class="line-through text-xl text-gray-500 me-3"
                v-if="product?.data.discount"
              >
                {{
                  (product?.data.discount ?? 0).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                }}
              </span>
              <span
                class="text-red-600 text-sm px-[4px] py-[1px] bg-red-100 border border-red-500 rounded-sm h-fit"
                v-if="product?.data.discount"
                >-5%</span
              >
            </div>
            <div
              class="text-center md:min-w-[400px] md:w-fit w-full bg-red-600 text-white py-2 rounded-md mt-5 cursor-pointer"
              @click="cart.add(product?.data.slug ?? '')"
            >
              <div class="text-lg">MUA NGAY</div>
              <div>Giao tận nơi hoặc nhận tại của hàng</div>
            </div>

            <div
              class="mt-4 text-lg border-t pt-4"
              v-if="product?.data.short_description"
              v-html="product?.data.short_description"
            ></div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 mt-4 gap-4">
        <div class="col-span-12 md:col-span-8 bg-white rounded-md p-4">
          <h2 class="text-2xl">THÔNG TIN SẢN PHẨM</h2>
          <div class="relative" id="content">
            <div
              v-html="product?.data.description"
              :style="show_more ? '' : height()"
              class="overflow-hidden mt-3"
            ></div>
            <div
              v-if="show_more == false"
              @click="
                () => {
                  show_more = true;
                }
              "
            >
              <div
                class="absolute bottom-10 h-[280px] w-full"
                style="
                  background: linear-gradient(
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0.1) 40%,
                    #fff
                  );
                "
              ></div>
              <div
                class="absolute w-full text-center py-2 text-blue-600 bg-white bottom-0 text-base cursor-pointer"
              >
                XEM CHI TIẾT
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-12 md:col-span-4"
          :class="show_more ? '' : 'h-fit'"
          id="content-2"
        >
          <div class="sticky top-[95px]">
            <div class="bg-white rounded-md p-4 mb-4 h-fit">
              <h2 class="text-2xl">SẢN PHẨM TƯƠNG TỰ</h2>
              <div class="mt-2">
                <div class="flex gap-3">
                  <img
                    src="https://product.hstatic.net/200000722513/product/08523-amd-ryzen-8000-series-pr_5_b7eb435b4329479ab5f9e78562119a5c.png"
                    class="w-24 border rounded-md aspect-square"
                    alt=""
                    srcset=""
                  />
                  <div>
                    <div class="line-clamp-2">
                      Bộ vi xử lý AMD Ryzen 5 8400F / 4.2GHz Boost 4.7GHz / 6
                      nhân 12 luồng / 22MB / AM5 (TRAY)
                    </div>
                    <div class="text-sm line-through text-slate-700">
                      18.590.000₫
                    </div>
                    <div class="text-lg text-red-500">18.590.000₫</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-md p-4 h-fit">
              <h2 class="text-2xl">TIN TỨC VỀ CÔNG NGHỆ</h2>
              <div class="mt-2">
                <div class="flex gap-3">
                  <img
                    src="https://file.hstatic.net/200000722513/article/suno-ai-la-gi-thumbnail_7f4185cb7da2490893f36910a968d8d6_grande.jpg"
                    class="w-24 border rounded-md aspect-video object-cover"
                    alt=""
                    srcset=""
                  />
                  <div>
                    <div class="line-clamp-2">
                      Bộ vi xử lý AMD Ryzen 5 8400F / 4.2GHz Boost 4.7GHz / 6
                      nhân 12 luồng / 22MB / AM5 (TRAY)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white mt-4 p-5">
        <div class="flex justify-between mb-2">
          <h2 class="text-2xl">ĐÁNH GIÁ & NHẬN XÉT</h2>
          <div
            class="bg-red-600 text-white w-fit px-3 py-1 leading-8 rounded-md cursor-pointer"
            @click="showRating()"
          >
            <i class="bi bi-star-fill"></i> ĐÁNH GIÁ SẢN PHẨM
          </div>
        </div>
        <div class="mb-3">
          <div class="flex items-center mb-2">
            <svg
              class="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <svg
              class="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <svg
              class="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <svg
              class="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <svg
              class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <p
              class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              4.95
            </p>
            <p
              class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              out of
            </p>
            <p
              class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              5
            </p>
          </div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
            1,745 lượt đánh giá
          </p>
        </div>
        <div
          class="py-4 border-t border-slate-200 flex gap-4 last:pb-0"
          v-for="i in 5"
        >
          <Avatar icon="bi bi-person-circle" class="mr-2" size="xlarge" />

          <div>
            <div class="text-base mb-1">Nguyen Van A</div>
            <Rating v-model="ratingData.rating" readonly />
            <div class="text-slate-500 text-sm mt-2">08-09-2024 13:31</div>
            <div>
              Đúng mẫu âm thanh tốt hàng vừa đẹp mà còn rẻ kết nối nhanh cảm ứng
              tốt độ nhạy cao
            </div>
            <!-- <div class="flex gap-2">
              <Avatar
                image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp"
                class="object-contain aspect-square"
                size="xlarge"
              />
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="ratingData.visibleForm"
      :draggable="false"
      modal
      header="Đánh giá sản phẩm"
      :style="{ width: '35rem' }"
    >
      <div class="flex flex-col items-center mb-10">
        <img
          :src="product?.data.thumbnail ?? 'https://i.imgur.com/igbbIRf.png'"
          alt=""
          srcset=""
          class="w-36 border border-gray-200 rounded-md mb-5"
        />
        <Rating v-model="ratingData.rating" />
      </div>
      <div class="mb-2">
        <span>Viết đánh giá* </span>
        <Textarea
          v-model="ratingData.content"
          rows="5"
          cols="30"
          class="w-full"
        ></Textarea>
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Huỷ"
          severity="secondary"
          @click="ratingData.visibleForm = false"
        ></Button>
        <Button
          type="button"
          label="Gửi đánh giá "
          @click="ratingData.visibleForm = false"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";

const route = useRoute();
const cart = useCart();

const show_more = ref(false);
const maxheight = ref("800px");
function height() {
  return `max-height: ${maxheight.value}`;
}

onMounted(() => {
  if (document) {
    let content2 = document.getElementById("content-2");

    if (content2) {
      maxheight.value = `${content2.offsetHeight - 76}px`;
    }
  }
});

const { data: product } = await eFetch<{
  status: Number;
  data: Product;
}>("/api/product/info", {
  method: "POST",
  body: {
    slug: route.params.slug,
  },
});

interface Image {
  image_url: string;
}

const images = ref<Image[]>([]);
const image_index = ref(0);

const mainSwiper = ref();

function slideChange(data: any) {
  imageChange(data.activeIndex);
}

function imageChange(index: number) {
  image_index.value = index;
  if (window) {
    const swipers = document.getElementsByClassName("swiper");

    for (const swiperElement of swipers) {
      (swiperElement as any).swiper.slideTo(index);
    }
  }
}

if (product.value?.status == 200) {
  images.value = product.value.data.images;
}

if (product.value?.status != 200) {
  throw showError({
    statusCode: 404,
    statusMessage: "Sản phẩm không tồn tại",
  });
}

// rating
const ratingData = reactive({
  visibleForm: false,
  rating: 0,
  content: "",
});

function showRating() {
  ratingData.visibleForm = true;
  ratingData.rating = 0;
  ratingData.content = "";
}
</script>

<style>
.content p {
  margin: 10px 0px;
}
</style>

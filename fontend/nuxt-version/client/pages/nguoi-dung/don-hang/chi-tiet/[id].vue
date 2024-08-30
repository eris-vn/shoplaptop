<template>
  <div>
    <div class="bg-white rounded-sm p-5 mb-5">
      <h3 class="text-2xl">Địa chỉ nhận hàng</h3>
      <div class="grid grid-cols-12 mt-2 mb-2 divide-x gap-4">
        <div class="col-span-12 text-sm text-slate-800">
          <div class="jXhS5s">
            <div>Nguyễn Văn Sơn</div>
            <div>
              <span>(+84) 788624449</span><br /><span class="mt-2 block"
                >490/4 ĐT748, Phú Thứ , Phú An, Bến Cát, Bình Dương , gần ngã tư
                phú thứ, Xã Phú An, Thị Xã Bến Cát, Bình Dương</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-sm p-5">
      <h3 class="text-2xl">Chi tiết đơn hàng #{{ route.params.id }}</h3>

      <Stepper value="1" class="basis-[50rem] mb-10 ms-16 mt-3">
        <StepList>
          <Step
            v-slot="{ activateCallback, value, a11yAttrs }"
            asChild
            :value="1"
          >
            <div class="flex flex-row flex-auto gap-2" v-bind="a11yAttrs.root">
              <button
                class="bg-transparent border-0 inline-flex flex-col items-center gap-2 mt-7"
                @click="activateCallback"
                v-bind="a11yAttrs.header"
              >
                <span
                  :class="[
                    'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                    {
                      'bg-primary text-primary-contrast border-primary': false,
                      'border-surface-200 dark:border-surface-700': false,
                    },
                  ]"
                >
                  <i class="bi bi-card-checklist"></i>
                </span>
                <div class="text-nowrap">Đã đặt đơn</div>
              </button>
              <Divider />
            </div>
          </Step>
          <Step
            v-slot="{ activateCallback, value, a11yAttrs }"
            asChild
            :value="2"
          >
            <div class="flex flex-row flex-auto gap-2" v-bind="a11yAttrs.root">
              <button
                class="bg-transparent border-0 inline-flex flex-col items-center gap-2 mt-7"
                @click="activateCallback"
                v-bind="a11yAttrs.header"
              >
                <span
                  :class="[
                    'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                    {
                      'bg-primary text-primary-contrast border-primary': false,
                      'border-surface-200 dark:border-surface-700': false,
                    },
                  ]"
                >
                  <i class="bi bi-check2-square"></i>
                </span>
                <div class="text-nowrap">Tiếp nhận và chờ xử lý</div>
              </button>
              <Divider />
            </div>
          </Step>
          <Step v-slot="{ activateCallback, value }" asChild :value="4">
            <div class="flex flex-row flex-auto gap-2">
              <button
                class="bg-transparent border-0 inline-flex flex-col items-center gap-2 mt-7"
                @click="activateCallback"
              >
                <span
                  :class="[
                    'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                    {
                      'bg-primary text-primary-contrast border-primary': false,
                      'border-surface-200 dark:border-surface-700': false,
                    },
                  ]"
                >
                  <i class="bi bi-truck"></i>
                </span>
                <div class="text-nowrap">Đang giao</div>
              </button>
              <Divider />
            </div>
          </Step>
          <Step v-slot="{ activateCallback, value }" asChild :value="5">
            <div class="flex flex-row flex-auto gap-2">
              <button
                class="bg-transparent border-0 inline-flex flex-col items-center gap-2 mt-7"
                @click="activateCallback"
              >
                <span
                  :class="[
                    'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                    {
                      'bg-primary text-primary-contrast border-primary': false,
                      'border-surface-200 dark:border-surface-700': false,
                    },
                  ]"
                >
                  <i class="bi bi-star"></i>
                </span>
                <div class="text-nowrap">Đánh giá</div>
              </button>
            </div>
          </Step>
        </StepList>
      </Stepper>

      <h3 class="text-2xl">Danh sách sản phẩm</h3>

      <div
        class="grid grid-cols-12 border-t pt-4 mt-4"
        v-for="order in order_details?.data.order_details"
      >
        <div class="col-span-8 flex gap-3">
          <img
            src="https://product.hstatic.net/200000722513/product/hn074w-final_d1f17cfe60c0443e9bb78a02fa874a21_large_50e5daebd00147d7959f5decd617b193_grande.png"
            alt=""
            srcset=""
            class="h-[95px] w-[95px] border object-cover"
          />
          <div>
            <div class="line-clamp-2">
              {{ order.product.name }}
            </div>
            <div class="text-red-600">
              {{
                order.product.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </div>
            <div class="text-sm text-zinc-500">
              Số lượng: {{ order.quantity }}
            </div>
          </div>
        </div>
        <div class="col-span-4 flex flex-col items-end justify-between"></div>
      </div>

      <div class="border-t pt-4 mt-4">
        <div class="flex justify-between text-lg">
          <div>Tổng tiền</div>
          <div class="text-xl text-red-500">
            {{
              (order_details?.data.total_price ?? 0).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const activeStep = ref(1);

const [{ data: order_details, refresh }] = await Promise.all([
  eFetch<{
    status: number;
    data: {
      id: number;
      address: {
        address: string;
      };
      order_details: {
        product: {
          name: string;
          price: number;
        };
        quantity: number;
      }[];
      total_price: string;
      created_at: Date;
    };
  }>("/api/user/orders/info", {
    method: "GET",
    params: { id: route.params.id },
  }),
]);
</script>

<style scoped></style>

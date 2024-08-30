<template>
  <div>
    <div class="container mx-auto mt-10 mb-10">
      <div class="w-full max-w-[600px] bg-white mx-auto pt-9 rounded-sm">
        <el-steps
          style="max-width: 600px"
          finish-status="success"
          :active="step"
          align-center
        >
          <el-step title="Giỏ hàng" :icon="ShoppingCart" />
          <el-step title="Thông tin đặt hàng" :icon="Postcard" />
          <el-step title="Thanh toán" :icon="CreditCard" />
          <el-step title="Thành công" :icon="SuccessFilled" />
        </el-steps>
        <div class="p-5">
          <div v-if="step == 0">
            <div
              class="grid grid-cols-12 border-t pt-4 mt-4"
              v-if="cart.cart.length"
              v-for="product in cart.cart"
            >
              <div class="col-span-8 flex gap-3">
                <img
                  :src="product.image"
                  alt=""
                  srcset=""
                  class="h-[95px] w-[95px] border object-cover"
                />
                <div>
                  <div class="line-clamp-2">
                    {{ product.name }}
                  </div>
                  <div class="text-red-600">
                    {{
                      (product.price ?? 0).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })
                    }}
                  </div>
                  <del class="text-sm text-zinc-600" v-if="product.discount">{{
                    (product.discount ?? 0).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}</del>
                </div>
              </div>
              <div class="col-span-4 flex flex-col items-end justify-between">
                <el-input-number
                  class="h-fit"
                  v-model="product.quantity"
                  :min="1"
                  :max="10"
                />
                <i class="bi bi-trash" @click="cart.remove(product.id)"></i>
              </div>
            </div>
            <div v-else>Chưa có sản phẩm nào</div>
            <div class="mt-4">
              <div class="border-t pt-4">
                <div class="flex justify-between text-lg">
                  <div>Tổng tiền</div>
                  <div class="text-xl text-red-500">
                    {{
                      total.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })
                    }}
                  </div>
                </div>
                <div
                  class="w-full text-center bg-red-600 text-white py-4 rounded-sm text-lg font-semibold mt-3 cursor-pointer"
                  @click="on_submit()"
                >
                  XÁC NHẬN
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="step == 1">
            <span class="mb-2">Chọn địa chỉ giao hàng:</span>
            <el-select v-model="address" placeholder="Chọn địa chỉ giao hàng">
              <el-option
                v-for="item in addressOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <NuxtLink to="/nguoi-dung/dia-chi"
              ><div class="mt-2 text-blue-600">Thêm địa chỉ mới</div></NuxtLink
            >

            <div class="mt-4">
              <div class="border-t pt-4">
                <div class="flex justify-between text-lg">
                  <div>Tổng tiền</div>
                  <div class="text-xl text-red-500">
                    {{
                      total.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })
                    }}
                  </div>
                </div>
                <div
                  class="w-full text-center bg-red-600 text-white py-4 rounded-sm text-lg font-semibold mt-3 cursor-pointer"
                  @click="on_submit()"
                >
                  XÁC NHẬN
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="step == 2">
            <div class="mb-2 flex flex-col text-sm">
              <span class="mb-2 text-lg">Chọn hình thức giao hàng:</span>
              <div class="flex flex-col gap-4">
                <div
                  v-for="category in [
                    {
                      name: 'Thanh toán khi nhận hàng ( SHIPCOD )',
                      key: 'shipcod',
                    },
                    { name: 'VNPAY', key: 'vnpay' },
                  ]"
                  :key="category.key"
                  class="flex items-center"
                >
                  <RadioButton
                    v-model="payment_method"
                    :inputId="category.key"
                    name="dynamic"
                    :value="category.name"
                  />
                  <label :for="category.key" class="ml-2">{{
                    category.name
                  }}</label>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <div class="border-t pt-4">
                <div class="flex justify-between text-lg">
                  <div>Tổng tiền</div>
                  <div class="text-xl text-red-500">
                    {{
                      total.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })
                    }}
                  </div>
                </div>
                <div
                  class="w-full text-center bg-red-600 text-white py-4 rounded-sm text-lg font-semibold mt-3 cursor-pointer"
                  @click="on_submit()"
                >
                  XÁC NHẬN
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="step == 3" class="px-3">
            <div
              class="bg-green-100 text-green-800 text-center py-3 text-lg font-semibold rounded-md"
            >
              <div>
                <i class="bi bi-bag-check mr-1"></i> Đặt hàng thành công
              </div>
            </div>
            <div class="mt-3">
              Cảm ơn quý khách đã cho Shop có cơ hội được phục vụ. Nhân viên
              Shop sẽ liên hệ với quý khách trong thời gian sớm nhất.
            </div>
            <div class="bg-zinc-100 p-4 mt-3">
              <div class="flex justify-between border-b pb-2 border-zinc-400">
                <div>ĐƠN HÀNG #{{ order_details.id }}</div>
                <NuxtLink
                  to="/nguoi-dung/don-hang"
                  class="text-blue-600 font-semibold cursor-pointer"
                  >Quản lý đơn</NuxtLink
                >
              </div>
              <div class="text-md">
                <div class="grid grid-cols-12 mt-3">
                  <div class="col-span-4 font-semibold">Khách hàng</div>
                  <div class="col-span-8">{{ order_details.customer }}</div>
                </div>
                <div class="grid grid-cols-12 mt-3">
                  <div class="col-span-4 font-semibold">Số điện thoại</div>
                  <div class="col-span-8">{{ order_details.phone_number }}</div>
                </div>
                <div class="grid grid-cols-12 mt-3">
                  <div class="col-span-4 font-semibold">Email</div>
                  <div class="col-span-8">{{ order_details.email }}</div>
                </div>
                <div class="grid grid-cols-12 mt-3">
                  <div class="col-span-4 font-semibold">Địa chỉ</div>
                  <div class="col-span-8">
                    {{ order_details.address }}
                  </div>
                </div>
                <div class="grid grid-cols-12 mt-3">
                  <div class="col-span-4 font-semibold">Tổng tiền</div>
                  <div class="col-span-8">
                    {{
                      (order_details.total ?? 0).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ShoppingCart,
  Postcard,
  CreditCard,
  SuccessFilled,
} from "@element-plus/icons-vue";
import type { Address } from "~/types/address";
import type { ApiResponse } from "~/types/ApiReponse";

const cart = useCart();

const order_details = reactive({
  id: "",
  customer: "",
  email: "",
  phone_number: "",
  address: "",
  total: 0,
});

const toast = eToast();
const step = ref(0);
const address = ref();
const payment_method = ref("Ship COD");
const total = computed(() => {
  return cart.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const [{ data: addressList, refresh }] = await Promise.all([
  eFetch<ApiResponse<Address[]>>("/api/user/address/list", {
    method: "GET",
  }),
]);

const addressOption = computed(() => {
  if (addressList.value && addressList.value.data) {
    return addressList.value.data.map((e) => {
      return {
        label: `${e.name} - ${e.phone_number}`,
        value: e.id,
      };
    });
  } else {
    return [];
  }
});

async function on_submit() {
  if (step.value == 0) {
    if (cart.cart.length <= 0) {
      return toast.error("Giỏ hàng rỗng");
    }
    step.value += 1;
  } else if (step.value == 1) {
    if (!address.value) {
      return toast.error("Vui lòng chọn địa chỉ giao hàng");
    }
    step.value += 1;
  } else if (step.value == 2) {
    const data: {
      status: number;
      data: {
        id: string;
        user: {
          name: string;
          email: string;
        };
        address: {
          address: string;
          phone_number: string;
        };
        total_price: number;
      };
      msg: string;
    } = await useRequest("/api/order/submit", {
      body: {
        products: cart.cart,
        address_id: address.value,
        payment_method: payment_method.value,
      },
      autoToast: true,
    });

    if (data.status == 200) {
      Object.assign(order_details, {
        id: data.data.id,
        customer: data.data.user.name,
        email: data.data.user.email,
        address: data.data.address.address,
        phone_number: data.data.address.phone_number,
        total: data.data.total_price,
      });
      cart.clear();
      step.value += 1;
    }
  } else {
    step.value += 1;
  }
}
</script>

<style scoped></style>

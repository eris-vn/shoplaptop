<template>
  <div>
    <!-- <div class="bg-white rounded-sm p-5">
      <h3 class="text-2xl">Quản lý đơn hàng</h3>


    </div> -->

    <Tabs value="0">
      <TabList
        :pt="{
          root: 'rounded-sm overflow-hidden',
        }"
      >
        <Tab value="0">Tất cả</Tab>
        <Tab value="1">Chờ thanh toán</Tab>
        <Tab value="2">Đang xử lý</Tab>
        <Tab value="3">Đang vận chuyển</Tab>
        <Tab value="4">Hoàn thành</Tab>
        <Tab value="5">Huỷ</Tab>
      </TabList>
      <InputGroup class="my-4">
        <InputGroupAddon>
          <i class="bi bi-search"></i>
        </InputGroupAddon>
        <InputText
          placeholder="Tìm đơn hàng theo mã đơn"
          @keyup.enter="refresh()"
        />
      </InputGroup>

      <div
        class="bg-white rounded-sm p-4 mb-4 last:mb-0 cursor-pointer"
        v-for="order in orderListRequest?.data.list"
      >
        <NuxtLink :to="`/nguoi-dung/don-hang/chi-tiet/${order.id}`">
          <div class="flex justify-between">
            <div>#{{ order.id }}</div>
            <div>{{ getStatusText(order.status) }}</div>
          </div>
          <Divider />

          <div
            class="grid grid-cols-12 border-b pb-4 mt-4"
            v-for="product in order.order_details"
          >
            <div class="col-span-8 flex gap-3">
              <img
                src="https://product.hstatic.net/200000722513/product/82xv00qpvn_cb7cf3e1339a4fca857fc1b06d49d0f3_1024x1024_160dab1926434ab7a14978f0e905283e_grande.png"
                alt=""
                srcset=""
                class="h-[95px] w-[95px] border object-cover"
              />
              <div>
                <div class="line-clamp-2">
                  {{ product.product.name }}
                </div>
                <div class="text-red-600">
                  {{
                    product.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}
                </div>
                <del class="text-sm text-zinc-600" v-if="product.discount">
                  {{
                    product.discount.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}</del
                >
              </div>
            </div>
            <div class="col-span-4 flex flex-col items-end justify-between">
              Số lượng: 1
            </div>
          </div>

          <div class="flex justify-between text-lg mt-4">
            <div>Tổng tiền</div>
            <div class="text-xl text-red-500">
              {{
                order.total_price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </Tabs>

    <Paginator
      class="mt-4"
      :rows="5"
      v-model="currentPage"
      :totalRecords="orderListRequest?.data.paginate.totalCount"
      @page="changePage"
    ></Paginator>
  </div>
</template>

<script setup lang="ts">
import type { ApiResponse, Paginate } from "~/types/ApiReponse";
import type { Orders } from "~/types/order";

const currentPage = ref(1);

function changePage(index: any) {
  currentPage.value = index.page + 1;
}

const [{ data: orderListRequest, refresh }] = await Promise.all([
  eFetch<
    ApiResponse<{
      list: Orders[];
      paginate: Paginate;
    }>
  >("/api/user/orders/list", {
    method: "GET",
    params: {
      current_page: currentPage,
    },
  }),
]);

function getStatusText(status: number) {
  switch (status) {
    case 0:
      return "Đang xử lý";
    case 1:
      return "Đang vận chuyển";
    case 2:
      return "Hoàn thành";
    case 3:
      return "Huỷ";
    default:
      return "";
  }
}
</script>

<style scoped></style>

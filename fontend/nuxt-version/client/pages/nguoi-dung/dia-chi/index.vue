<template>
  <div>
    <div class="bg-white rounded-sm p-5">
      <div class="flex justify-between border-b pb-5">
        <h3 class="text-2xl">Thông tin tài khoản</h3>
        <div
          class="bg-blue-600 text-white w-fit px-4 leading-8 rounded-md cursor-pointer"
          @click="action.show('create')"
        >
          + Thêm địa chỉ mới
        </div>
      </div>
      <div>
        <div
          class="mt-4 border-b pb-4"
          v-if="addressList?.data.length"
          v-for="address in addressList?.data"
        >
          <div class="flex justify-between w-full">
            <div>
              <div class="flex gap-2">
                <!-- <span class="border border-red-600 text-red-600 px-2 rounded-sm"
              >Mặc định</span
            > -->
                <div>{{ address.name }}</div>
              </div>
              <div>SĐT: {{ address.phone_number }}</div>
              <div>Địa chỉ: {{ address.address }}</div>
            </div>
            <div class="flex gap-3">
              <i
                class="bi bi-pencil cursor-pointer"
                @click="action.show('edit', address.id)"
              ></i>
              <i
                class="bi bi-trash cursor-pointer"
                @click="delete_address(address.id)"
              ></i>
            </div>
          </div>
        </div>
        <div v-else class="mt-4">Chưa có địa chỉ nào</div>
      </div>
    </div>

    <actionVue ref="action" @update="refresh"></actionVue>
  </div>
</template>

<script setup lang="ts">
import type { ApiResponse } from "~/types/ApiReponse";
import actionVue from "./action.vue";
import type { Address } from "~/types/address";

const action = ref();

const [{ data: addressList, refresh }] = await Promise.all([
  eFetch<ApiResponse<Address[]>>("/api/user/address/list", {
    method: "GET",
  }),
]);

async function delete_address(id: number) {
  const data: { status: number; msg: "" } = await useRequest(
    "/api/user/address/delete",
    {
      method: "DELETE",
      body: { id },
      autoToast: true,
    }
  );

  if (data.status == 200) {
    refresh();
  }
}
</script>

<style scoped></style>

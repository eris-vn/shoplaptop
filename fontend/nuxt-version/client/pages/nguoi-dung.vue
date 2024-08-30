<template>
  <div>
    <div class="container mx-auto mt-5">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3 bg-white rounded-sm">
          <div class="sticky top-[80px]">
            <div class="flex gap-5 px-4 py-4 border-b items-center">
              <i class="text-5xl text-gray-600 bi bi-person-circle"></i>
              <div class="text-xl">Tên người dùng</div>
            </div>
            <div class="p-5" id="profile">
              <NuxtLink
                to="/nguoi-dung/ho-so"
                class="mb-4 flex gap-4 items-center text-md"
              >
                <i class="bi bi-person-fill text-xl"></i>
                <div>Thông tin tài khoản</div>
              </NuxtLink>
              <NuxtLink
                to="/nguoi-dung/dia-chi"
                class="mb-4 flex gap-4 items-center text-md"
              >
                <i class="bi bi-geo-alt-fill w-[20px]"></i>
                <div>Địa chỉ</div>
              </NuxtLink>
              <NuxtLink
                to="/nguoi-dung/don-hang"
                class="mb-4 flex gap-4 items-center text-md"
              >
                <i class="bi bi-bag-dash-fill w-[20px]"></i>
                <div>Quản lý đơn hàng</div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="col-span-9">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
#profile .router-link-active {
  color: red;
}
</style>

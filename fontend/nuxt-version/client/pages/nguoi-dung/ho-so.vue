<template>
  <div>
    <div class="bg-white rounded-sm p-5">
      <h3 class="text-2xl">Thông tin tài khoản</h3>
      <div class="text-base">
        <div class="grid grid-cols-12 gap-4 mt-4">
          <div class="col-span-3 text-end leading-9">Họ tên</div>
          <div class="col-span-5">
            <input
              class="border-[1px] border-gray-300 outline-none px-3 py-[6px] rounded-md w-full text-sm focus:border-sky-500"
              type="text"
              placeholder="Nhập họ và tên"
            />
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4 mt-4">
          <div class="col-span-3 text-end leading-8">Giới tính</div>
          <div class="col-span-5">
            <el-radio-group>
              <el-radio :value="3">Nam</el-radio>
              <el-radio :value="6">Nữ</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4 mt-4">
          <div class="col-span-3 text-end">Số điện thoại</div>
          <div class="col-span-5">
            <div>0788624449</div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4 mt-4">
          <div class="col-span-3 text-end">Email</div>
          <div class="col-span-5">
            <div>sonn88918@gmail.com</div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4 mt-4">
          <div class="col-span-3 text-end">Ngày sinh</div>
          <div class="col-span-5">
            <div class="block">
              <el-date-picker
                type="datetime"
                placeholder="Pick a Date"
                format="YYYY-MM-DD HH:mm:ss"
                date-format="MMM DD, YYYY"
                time-format="HH:mm"
                width="100%"
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4 mt-4">
          <div class="col-span-3 text-end"></div>
          <div class="col-span-5">
            <div
              class="bg-red-600 text-center w-fit px-5 py-0 text-white rounded-md leading-10 cursor-pointer"
            >
              LƯU THAY ĐỔI
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

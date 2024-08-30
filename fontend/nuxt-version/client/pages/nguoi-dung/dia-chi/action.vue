<template>
  <div>
    <el-dialog
      v-model="modal"
      :title="type == 'create' ? 'THÊM ĐỊA CHỈ MỚI' : 'CHỈNH ĐỊA CHỈ'"
      width="500"
      align-center
    >
      <div
        class="bg-white relative mb-4 border-[1px] border-slate-400 focus:outline-none focus:border-slate-500 rounded-md"
      >
        <input
          name="name"
          rules="required"
          type="text"
          id="name"
          v-model="form.name"
          class="peer bg-transparent h-10 w-full text-gray-800 placeholder-transparent py-2 px-4 focus:outline-none rounded-md border-0"
          placeholder="Type inside me"
        />
        <label
          for="name"
          class="absolute cursor-text left-0 -top-3 text-sm text-gray-900 bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm rounded-sm pt-[2px] peer-focus:pt-[2px] peer-focus:rounded-sm peer-focus:text-gray-800 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:border-0 peer-placeholder-shown:pt-0 transition-all"
          >Tên người nhận</label
        >
      </div>
      <div
        class="bg-white relative mb-4 border-[1px] border-slate-400 focus:outline-none focus:border-slate-500 rounded-md"
      >
        <input
          name="phone_number"
          rules="required"
          type="text"
          id="phone_number"
          v-model="form.phone_number"
          class="peer bg-transparent h-10 w-full text-gray-800 placeholder-transparent py-2 px-4 focus:outline-none rounded-md border-0"
          placeholder="Type inside me"
        />
        <label
          for="phone_number"
          class="absolute cursor-text left-0 -top-3 text-sm text-gray-900 bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm rounded-sm pt-[2px] peer-focus:pt-[2px] peer-focus:rounded-sm peer-focus:text-gray-800 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:border-0 peer-placeholder-shown:pt-0 transition-all"
          >Số điện thoại</label
        >
      </div>
      <div
        class="bg-white relative mb-4 border-[1px] border-slate-400 focus:outline-none focus:border-slate-500 rounded-md"
      >
        <input
          name="address"
          rules="required"
          type="text"
          id="address"
          v-model="form.address"
          class="peer bg-transparent h-10 w-full text-gray-800 placeholder-transparent py-2 px-4 focus:outline-none rounded-md border-0"
          placeholder="Type inside me"
        />
        <label
          for="address"
          class="absolute cursor-text left-0 -top-3 text-sm text-gray-900 bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm rounded-sm pt-[2px] peer-focus:pt-[2px] peer-focus:rounded-sm peer-focus:text-gray-800 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:border-0 peer-placeholder-shown:pt-0 transition-all"
          >Địa chỉ</label
        >
      </div>
      <div
        class="bg-red-600 text-center text-white py-3 text-base mt-3 rounded-md cursor-pointer"
        v-if="type == 'create'"
        @click="create()"
      >
        TẠO ĐỊA CHỈ
      </div>
      <div
        class="bg-red-600 text-center text-white py-3 text-base mt-3 rounded-md cursor-pointer"
        v-else
        @click="update()"
      >
        LƯU ĐỊA CHỈ
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
const type = ref("create");
const emit = defineEmits(["update"]);
const modal = ref(false);
const form = reactive({
  id: "",
  name: "",
  phone_number: "",
  address: "",
});

function resetForm() {
  form.id = "";
  form.name = "";
  form.phone_number = "";
  form.address = "";
}

async function show(action = "create", id: number) {
  type.value = action;
  if (action == "edit") {
    const data: {
      status: number;
      data: {
        id: number;
        name: string;
        address: string;
        phone_number: string;
      };
    } = await useRequest("/api/user/address/info", {
      params: { id: id },
      method: "GET",
    });

    if (data.status == 200) {
      Object.assign(form, {
        id: data.data.id,
        name: data.data.name,
        phone_number: data.data.phone_number,
        address: data.data.address,
      });
    }
  }
  modal.value = true;
}

async function create() {
  const data: { status: number; msg: "" } = await useRequest(
    "/api/user/address/create",
    {
      body: form,
      autoToast: true,
    }
  );

  if (data.status == 200) {
    emit("update");
    modal.value = false;
    resetForm();
  }
}

async function update() {
  const data: { status: number; msg: "" } = await useRequest(
    "/api/user/address/update",
    {
      method: "PUT",
      body: form,
      autoToast: true,
    }
  );

  if (data.status == 200) {
    emit("update");
    modal.value = false;
    resetForm();
  }
}

defineExpose({ show });
</script>

<style scoped></style>

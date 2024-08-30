<template>
  <div>
    <el-dialog
      v-model="modal"
      title="ĐĂNG NHẬP TÀI KHOẢN"
      width="500"
      align-center
    >
      <div>
        <div
          class="bg-white relative mt-3 mb-1 border-[1px] border-slate-400 focus:outline-none focus:border-slate-500 rounded-md"
        >
          <input
            name="email"
            rules="required"
            type="text"
            id="email"
            v-model="form.email"
            class="peer bg-transparent h-10 w-full text-gray-800 placeholder-transparent py-2 px-4 focus:outline-none rounded-md border-0"
            placeholder="Type inside me"
          />
          <label
            for="username"
            class="absolute cursor-text left-0 -top-3 text-sm text-gray-900 bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm rounded-sm pt-[2px] peer-focus:pt-[2px] peer-focus:rounded-sm peer-focus:text-gray-800 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:border-0 peer-placeholder-shown:pt-0 transition-all"
            >Email</label
          >
        </div>
        <div
          class="bg-white relative mt-3 mb-1 border-[1px] border-slate-400 focus:outline-none focus:border-slate-500 rounded-md"
        >
          <input
            name="password"
            rules="required"
            type="password"
            id="password"
            v-model="form.password"
            class="peer bg-transparent h-10 w-full text-gray-800 placeholder-transparent py-2 px-4 focus:outline-none rounded-md border-0"
            placeholder="Type inside me"
          />
          <label
            for="username"
            class="absolute cursor-text left-0 -top-3 text-sm text-gray-900 bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm rounded-sm pt-[2px] peer-focus:pt-[2px] peer-focus:rounded-sm peer-focus:text-gray-800 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:border-0 peer-placeholder-shown:pt-0 transition-all"
            >Mật khẩu</label
          >
        </div>
        <div class="text-end mt-3 text-base cursor-pointer">Quên mật khẩu?</div>
        <div
          class="bg-red-600 text-center text-white py-3 text-base mt-3 rounded-md cursor-pointer"
          @click="on_login"
        >
          ĐĂNG NHẬP
        </div>

        <div class="my-8">
          <el-divider> HOẶC ĐĂNG NHẬP BẰNG </el-divider>
        </div>
        <div class="mt-3 flex gap-3 text-center text-white">
          <div
            class="w-full bg-[#df4a32] py-2 text-base rounded-md cursor-pointer"
          >
            <i class="bi bi-google me-2"></i> Google
          </div>
          <div
            class="w-full bg-[#3b5998] py-2 text-base rounded-md cursor-pointer"
          >
            <i class="bi bi-facebook me-2"></i> Facebook
          </div>
        </div>

        <div class="mt-5 text-center text-base">
          Bạn chưa có tài khoản?
          <span
            class="cursor-pointer text-blue-500"
            @click="
              () => {
                modal = false;
                useEmit('show-register');
              }
            "
            >Đăng ký ngay</span
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
const modal = ref(false);
const toast = eToast();
const auth = useAuth();

const form = reactive({
  email: "",
  password: "",
});

useListen("show-login", () => {
  modal.value = true;
});

onBeforeUnmount(() => {
  removeListen("show-login");
});

async function on_login() {
  showLoading();
  const { data } = await eFetch<{
    status: Number;
    data: {
      token: string;
    };
    msg: String;
  }>("/api/auth/login", {
    method: "POST",
    body: form,
    watch: false,
  });
  hideLoading();

  if (data.value?.status == 200) {
    auth.setToken(data.value?.data.token);

    toast.success("Đăng nhập thành công");
    setTimeout(() => {
      modal.value = false;
    }, 500);
  } else {
    toast.error(data.value?.msg ?? "Lấy dữ liệu thất bại");
  }
}

defineExpose({ modal });
</script>

<style scoped></style>

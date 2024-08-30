<template>
  <div>
    <div class="bg-[#ffed3a]">
      <div class="container">
        <img
          src="https://file.hstatic.net/200000722513/file/pc_gvn_hssv_ffed3a.png"
          alt=""
          srcset=""
        />
      </div>
    </div>
    <Theheader></Theheader>
    <erisLoadingVue id="default" v-model="isLoading"></erisLoadingVue>
    <NuxtPage />
    <Thefooter></Thefooter>
  </div>
</template>

<script setup lang="ts">
import erisLoadingVue from "~/components/eris-loading.vue";
const isLoading = ref();
</script>

<style scoped></style>

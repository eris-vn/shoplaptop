<script setup lang="ts">
import { PerfectScrollbar } from "vue3-perfect-scrollbar";

import { VForm } from "vuetify/components/VForm";

const refVForm = ref<VForm>();
const input = ref();
const toast = useToasts();
const emit = defineEmits(["update"]);

async function uploadImage() {
  if (!input.value) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    data.image = e.target?.result as any;
  };
  reader.readAsDataURL(input.value[0]);
}

const type = ref<string>("create");
const drawer = ref(false);

async function show(action = "create", id: number) {
  type.value = action;
  data.image = "";
  refVForm.value?.reset();
  if (id) {
    const { data: response } = await useApi<{
      status: number;
      data: {
        id: number;
        name: string;
        slug: string;
        image_url: string;
      };
    }>("/api/admin/category/info", {
      method: "GET",
      params: {
        id: id,
      },
    });

    if (response.value?.status == 200) {
      Object.assign(data, {
        id: response.value?.data.id,
        title: response.value?.data.name,
        slug: response.value?.data.slug,
        image: response.value?.data.image_url,
      });

      drawer.value = true;
    }
  } else {
    drawer.value = true;
  }
}

const data = reactive({
  id: "",
  title: "",
  slug: "",
  image: "",
  status: "",
});

const resetForm = () => {
  data.image = "";
  drawer.value = false;
  refVForm.value?.reset();
};

async function create() {
  const { data: response } = await useApi<{
    status: number;
    msg: string;
  }>("/api/admin/category/create", {
    method: "POST",
    body: data,
    watch: false,
  });

  if (response.value?.status == 200) {
    resetForm();
    emit("update");
    toast.success(response.value?.msg ?? "Lấy dữ liệu thất bại");
  } else {
    toast.error(response.value?.msg ?? "Lấy dữ liệu thất bại");
  }
}

async function edit() {
  const { data: response } = await useApi<{
    status: number;
    msg: string;
  }>("/api/admin/category/update", {
    method: "PUT",
    body: data,
    watch: false,
  });

  if (response.value?.status == 200) {
    resetForm();
    emit("update");
    toast.success(response.value?.msg ?? "Lấy dữ liệu thất bại");
  } else {
    toast.error(response.value?.msg ?? "Lấy dữ liệu thất bại");
  }
}
defineExpose({ show });
</script>

<template>
  <VNavigationDrawer
    v-model="drawer"
    temporary
    location="end"
    width="370"
    class="category-navigation-drawer scrollable-content"
  >
    <!-- 👉 Header -->
    <AppDrawerHeaderSection
      :title="type == 'create' ? 'Tạo danh mục' : 'Chỉnh sửa danh mục'"
      @cancel="drawer = false"
    />

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm ref="refVForm" @submit.prevent="">
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="data.title"
                  label="Title"
                  :rules="[requiredValidator]"
                  placeholder="Fashion"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="data.slug"
                  label="Slug"
                  :rules="[requiredValidator]"
                  placeholder="Trends fashion"
                />
              </VCol>

              <VCol cols="12" v-if="data.image">
                <v-img width="100%" cover :src="data.image"></v-img>
              </VCol>

              <VCol cols="12">
                <VLabel>
                  <span class="text-sm text-high-emphasis mb-1"
                    >Attachment</span
                  >
                </VLabel>
                <VFileInput
                  v-model="input"
                  prepend-icon=""
                  density="compact"
                  placeholder="No file chosen"
                  @change="uploadImage"
                  :clearable="false"
                >
                  <template #prepend-inner>
                    <div class="text-no-wrap pe-2 cursor-pointer">
                      Choose Image
                    </div>
                    <VDivider vertical />
                  </template>
                </VFileInput>
              </VCol>

              <VCol cols="12">
                <div class="d-flex justify-start">
                  <VBtn
                    v-if="type == 'create'"
                    type="submit"
                    color="primary"
                    class="me-4"
                    @click="create()"
                  >
                    Tạo
                  </VBtn>
                  <VBtn
                    v-else
                    type="submit"
                    color="primary"
                    class="me-4"
                    @click="edit()"
                  >
                    Lưu
                  </VBtn>
                  <VBtn color="error" variant="tonal" @click="resetForm">
                    Huỷ
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

<style lang="scss">
.category-navigation-drawer {
  .ProseMirror {
    padding: 0.5rem;
    min-block-size: 15vh;

    p {
      margin-block-end: 0;
    }

    p.is-editor-empty:first-child::before {
      block-size: 0;
      color: #adb5bd;
      content: attr(data-placeholder);
      float: inline-start;
      pointer-events: none;
    }
  }

  .is-active {
    border-color: rgba(
      var(--v-theme-primary),
      var(--v-border-opacity)
    ) !important;
    background-color: rgba(var(--v-theme-primary), var(--v-activated-opacity));
    color: rgb(var(--v-theme-primary));
  }

  .ProseMirror-focused {
    outline: none !important;
  }
}
</style>

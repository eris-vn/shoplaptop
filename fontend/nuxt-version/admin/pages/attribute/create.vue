<template>
  <div>
    <div
      class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6"
    >
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">Thêm thuộc tính</h4>
      </div>

      <div class="d-flex gap-4 align-center flex-wrap" @click="create()">
        <VBtn>ĐĂNG</VBtn>
      </div>
    </div>

    <VRow>
      <VCol cols="12">
        <!-- 👉 Windows -->
        <VWindow
          v-model="activeTab"
          class="faq-v-window disable-tab-transition"
        >
          <VWindowItem :key="'THÔNG TIN'" :value="'THÔNG TIN'">
            <VCard class="mb-6" title="Thông tin thuộc tính">
              <VCardText>
                <VRow>
                  <VCol cols="12">
                    <AppTextField
                      label="Tên thuộc tính"
                      placeholder="Ví dụ: Màu, Ram, ..."
                      v-model="data.name"
                    />
                  </VCol>
                  <VCol cols="12">
                    <AppTextField
                      label="Giá trị thuộc tính"
                      placeholder="Ví dụ: mau, ram, ..."
                      v-model="data.value"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VWindowItem>

          <VWindowItem :key="'DỮ LIỆU'" :value="'DỮ LIỆU'">
            <VCard class="mb-6" title="Danh sách giá trị">
              <VDivider />
              <div class="category-table">
                <VDataTable
                  :headers="[
                    {
                      title: 'Tên',
                      key: 'name',
                      align: 'start',
                      sortable: false,
                    },
                    {
                      title: 'Giá trị',
                      key: 'value',
                      align: 'end',
                      sortable: false,
                    },
                    { title: 'Hành động', key: 'actions', sortable: false },
                  ]"
                  :items="[]"
                  class="text-no-wrap"
                  no-data-text="Không có dữ liệu"
                >
                  <template #item.actions="{ item }">
                    <IconBtn>
                      <VIcon icon="tabler-trash" />
                    </IconBtn>
                    <IconBtn>
                      <VIcon icon="tabler-edit" />
                    </IconBtn>
                  </template>
                  <template #bottom>
                    <VDivider />
                    <div
                      class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3"
                    ></div>
                  </template>
                </VDataTable>
              </div>
            </VCard>
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>
  </div>
</template>

<script setup lang="ts">
import { VDataTable } from "vuetify/labs/components";

const activeTab = ref(0);
const toast = useToasts();
const data = reactive({
  name: "",
  value: "",
});

async function create() {
  const { data: response } = await useApi<{
    status: number;
    msg: string;
  }>("/api/admin/attribute/create", {
    method: "POST",
    body: data,
    watch: false,
  });

  if (response.value?.status == 200) {
    navigateTo("/attribute");
    toast.success(response.value?.msg ?? "Lấy dữ liệu thất bại");
  } else {
    toast.error(response.value?.msg ?? "Lấy dữ liệu thất bại");
  }
}
</script>

<style scoped></style>

<template>
  <div>
    <div
      class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6"
    >
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">Chỉnh sửa thuộc tính</h4>
      </div>

      <div
        class="d-flex gap-4 align-center flex-wrap"
        @click="updateAttribute()"
      >
        <VBtn>LƯU</VBtn>
      </div>
    </div>

    <VRow>
      <VCol cols="12">
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
        <VCard class="mb-6">
          <div class="d-flex flex-wrap gap-4 mx-5 my-5">
            <div class="d-flex align-center">
              <h3>Danh sách giá trị</h3>
              <!-- 👉 Search  -->
            </div>

            <VSpacer />
            <div class="d-flex gap-4 flex-wrap align-center">
              <VBtn
                color="primary"
                prepend-icon="tabler-plus"
                @click="showCreate()"
              >
                TẠO MỚI
              </VBtn>
            </div>
          </div>
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
                {
                  title: 'Hành động',
                  key: 'actions',
                  align: 'end',
                  sortable: false,
                },
              ]"
              :items="valueItems as any"
              class="text-no-wrap"
              no-data-text="Không có dữ liệu"
            >
              <template #item.actions="{ item }">
                <IconBtn>
                  <VIcon icon="tabler-trash" />
                </IconBtn>
                <IconBtn @click="showUpdate(item.id)">
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

          <VDialog v-model="isDialogVisible" persistent class="v-dialog-sm">
            <!-- Dialog close btn -->
            <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

            <!-- Dialog Content -->
            <VCard
              :title="action == 'create' ? 'ĐĂNG DỮ LIỆU' : 'CHỈNH SỬA DỮ LIỆU'"
            >
              <VCardText>
                <AppTextField
                  label="Tên giá trị"
                  placeholder="Nhập tên giá trị"
                  type="text"
                  class="mb-4"
                  v-model="valueData.name"
                />
                <AppTextField
                  label="Slug giá trị"
                  placeholder="Nhập slug giá trị"
                  type="text"
                  v-model="valueData.value"
                />
              </VCardText>

              <VCardText class="d-flex justify-end gap-3 flex-wrap">
                <VBtn
                  color="secondary"
                  variant="tonal"
                  @click="isDialogVisible = false"
                >
                  HUỶ
                </VBtn>
                <VBtn v-if="action == 'create'" @click="createValue()">
                  ĐĂNG
                </VBtn>
                <VBtn v-else-if="action == 'update'" @click="updateValue()">
                  LƯU
                </VBtn>
              </VCardText>
            </VCard>
          </VDialog>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script setup lang="ts">
import type { ApiResponse } from "@/types/ApiReponse";
import { VDataTable } from "vuetify/labs/components";

const activeTab = ref(0);
const toast = useToasts();
const route = useRoute();
const router = useRouter();

const data = reactive({
  id: parseInt((route.params as any).id),
  name: "",
  value: "",
});

async function updateAttribute() {
  const { data: response } = await useApi<{
    status: number;
    msg: string;
  }>("/api/admin/attribute/update", {
    method: "put",
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

const [
  { data: response },
  { data: attributeValueData, refresh: refreshAttributeValueData },
] = await Promise.all([
  useApi<
    ApiResponse<{
      name: string;
      value: string;
    }>
  >("/api/admin/attribute/info", {
    method: "get",
    params: {
      id: (route.params as any).id,
    },
  }),
  useApi<
    ApiResponse<{
      name: string;
      value: string;
    }>
  >("/api/admin/attribute/value/list", {
    method: "get",
    params: {
      attribute_id: (route.params as any).id,
    },
  }),
]);

if (response.value?.status != 200) {
  router.push("/attribute");
  toast.error(response.value?.msg ?? "Lấy dữ liệu thất bại");
} else {
  data.name = response.value.data.name;
  data.value = response.value.data.value;
}

// Attribute Value

const action = ref("create");
const isDialogVisible = ref(false);

const valueItems = computed(() => attributeValueData.value?.data ?? []);

const valueData = reactive({
  id: 0,
  name: "",
  value: "",
  attribute_id: (route.params as any).id,
});

async function clearData() {
  valueData.name = "";
  valueData.value = "";
}

async function showCreate() {
  action.value = "create";
  isDialogVisible.value = true;
  clearData();
}

async function createValue() {
  const { data: response } = await useApi<{
    status: number;
    msg: string;
  }>(`/api/admin/attribute/value/create`, {
    method: "post",
    body: valueData,
    watch: false,
  });

  if (response.value?.status == 200) {
    refreshAttributeValueData();
    isDialogVisible.value = false;
    toast.success(response.value?.msg ?? "Lấy dữ liệu thất bại");
  } else {
    toast.error(response.value?.msg ?? "Lấy dữ liệu thất bại");
  }
}

async function showUpdate(id: number) {
  valueData.id = id;
  const { data: responseInfo } = await useApi<
    ApiResponse<{
      id: number;
      name: string;
      value: string;
    }>
  >("/api/admin/attribute/value/info", {
    method: "get",
    params: valueData,
    watch: false,
  });

  if (responseInfo.value?.status == 200) {
    valueData.id = responseInfo.value.data.id;
    valueData.name = responseInfo.value.data.name;
    valueData.value = responseInfo.value.data.value;
    action.value = "update";
    isDialogVisible.value = true;
  } else {
    toast.error(responseInfo.value?.msg ?? "Lấy dữ liệu thất bại");
  }
}

async function updateValue() {
  const { data: response } = await useApi<{
    status: number;
    msg: string;
  }>(`/api/admin/attribute/value/update`, {
    method: "put",
    body: valueData,
    watch: false,
  });

  if (response.value?.status == 200) {
    refreshAttributeValueData();
    isDialogVisible.value = false;
    toast.success(response.value?.msg ?? "Lấy dữ liệu thất bại");
  } else {
    toast.error(response.value?.msg ?? "Lấy dữ liệu thất bại");
  }
}
</script>

<style scoped></style>

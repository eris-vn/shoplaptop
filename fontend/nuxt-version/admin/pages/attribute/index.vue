<script setup lang="ts">
import { VDataTable } from "vuetify/labs/components";

interface Attribute {
  id: number;
  name: string;
  value: string;
  _count: {
    values: number;
  };
}

const headers = [
  { title: "ID", key: "id", align: "start", sortable: false },
  { title: "Tên", key: "name", align: "end", sortable: false },
  { title: "Slug", key: "value", align: "end", sortable: false },
  { title: "Giá trị", key: "_count.values", align: "end", sortable: false },
  { title: "Action", key: "actions", align: "end", sortable: false },
] as any;

const toast = useToasts();
const attributeList = computed(() => attributeRequest.value?.data ?? []);

async function deleteCategory(id: number) {
  const { data } = await useApi<{
    status: number;
    msg: string;
  }>("/api/admin/category/delete", {
    method: "DELETE",
    body: { id },
  });

  if (data.value?.status == 200) {
    fetchCategories();
    toast.success(data.value?.msg ?? "Lấy dữ liệu thất bại");
  } else {
    toast.error(data.value?.msg ?? "Lấy dữ liệu thất bại");
  }
}

const { data: attributeRequest, execute: fetchCategories } = await useApi<{
  status: number;
  data: Attribute[];
}>("/api/admin/attribute/list", {
  method: "GET",
});

const itemsPerPage = ref(100);
const page = ref(1);
const searchQuery = ref("");
const action = ref();
</script>

<template>
  <div>
    <VCard>
      <VCardText>
        <div
          class="d-flex justify-sm-space-between flex-wrap gap-y-4 gap-x-6 justify-start"
        >
          <VTextField
            v-model="searchQuery"
            placeholder="Tìm kiếm"
            density="compact"
            style="max-inline-size: 200px; min-inline-size: 200px"
          />

          <div class="d-flex align-center flex-wrap gap-4">
            <AppSelect v-model="itemsPerPage" :items="[10, 15, 20]" />
            <nuxt-link to="/attribute/create">
              <VBtn prepend-icon="tabler-plus" @click="action.show('create')">
                TẠO MỚI
              </VBtn>
            </nuxt-link>
          </div>
        </div>
      </VCardText>

      <VDivider />

      <div class="category-table">
        <VDataTable
          :headers="headers"
          :items="attributeList"
          :search="searchQuery"
          class="text-no-wrap"
          no-data-text="Nothing found"
        >
          <template #item.actions="{ item }">
            <IconBtn>
              <VIcon icon="tabler-trash" @click="deleteCategory(item.id)" />
            </IconBtn>
            <nuxt-link :to="`/attribute/edit/${item.id}`">
              <IconBtn>
                <VIcon icon="tabler-edit" /> </IconBtn
            ></nuxt-link>
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
  </div>
</template>

<style lang="scss">
.category-table {
  .v-table {
    th:nth-child(3),
    th:nth-child(4) {
      .v-data-table-header__content {
        justify-content: end;
      }
    }
  }
}
</style>

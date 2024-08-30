<script setup lang="ts">
import { VDataTable } from "vuetify/labs/VDataTable";
import ECommerceAddCategoryDrawer from "./action.vue";

const headers = [
  { title: "Danh mục", key: "categoryTitle" },
  { title: "Action", key: "actions", sortable: false },
];

const toast = useToasts();

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

const { data: categoryRequest, execute: fetchCategories } = await useApi<{
  status: number;
  data: {
    id: number;
    name: string;
    slug: string;
    image_url: string;
  }[];
}>(createUrl("/api/admin/category/list"), {
  body: {},
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
            placeholder="Search"
            density="compact"
            style="max-inline-size: 200px; min-inline-size: 200px"
          />

          <div class="d-flex align-center flex-wrap gap-4">
            <AppSelect v-model="itemsPerPage" :items="[5, 10, 15]" />
            <VBtn prepend-icon="tabler-plus" @click="action.show('create')">
              Tạo danh mục
            </VBtn>
          </div>
        </div>
      </VCardText>

      <VDivider />

      <div class="category-table">
        <VDataTable
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :headers="headers"
          :items="categoryRequest?.data"
          item-value="categoryTitle"
          :search="searchQuery"
          show-select
          class="text-no-wrap"
        >
          <template #item.actions="{ item }">
            <IconBtn>
              <VIcon icon="tabler-trash" @click="deleteCategory(item.id)" />
            </IconBtn>
            <IconBtn>
              <VIcon icon="tabler-edit" @click="action.show('edit', item.id)" />
            </IconBtn>
          </template>
          <template #item.categoryTitle="{ item }">
            <div class="d-flex gap-x-3">
              <VAvatar variant="tonal" rounded size="38">
                <img
                  :src="item.image_url"
                  :alt="item.name"
                  width="38"
                  height="38"
                />
              </VAvatar>
              <div>
                <h6 class="text-h6">
                  {{ item.name }}
                </h6>
              </div>
            </div>
          </template>
          <template #bottom>
            <VDivider />
            <div
              class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3"
            >
              <p class="text-sm text-medium-emphasis mb-0">
                <!-- showing {{ itemsPerPage * (page - 1) + 1 }} to
                {{ Math.min(itemsPerPage * page, categoryData.length) }} of
                {{ categoryData.length }} entries -->
              </p>
              <!-- <VPagination
                v-model="page"
                :length="Math.ceil(categoryData.length / itemsPerPage)"
                :total-visible="5"
              >
                <template #prev="slotProps">
                  <VBtn
                    variant="tonal"
                    color="default"
                    v-bind="slotProps"
                    :icon="false"
                  >
                    Previous
                  </VBtn>
                </template>
                <template #next="slotProps">
                  <VBtn
                    variant="tonal"
                    color="default"
                    v-bind="slotProps"
                    :icon="false"
                  >
                    Next
                  </VBtn>
                </template>
              </VPagination> -->
            </div>
          </template>
        </VDataTable>
      </div>
    </VCard>

    <ECommerceAddCategoryDrawer ref="action" @update="fetchCategories" />
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

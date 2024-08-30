<script setup lang="ts">
import { VDataTableServer } from "vuetify/labs/VDataTable";

const toast = useToasts();

const headers = [
  { title: "Sản phẩm", key: "product" },
  { title: "Category", key: "category" },
  { title: "Stock", key: "stock", sortable: false },
  { title: "Price", key: "price" },
  { title: "Status", key: "status" },
  { title: "Actions", key: "actions", sortable: false },
];

const selectedStatus = ref();
const selectedCategory = ref();
const selectedStock = ref<boolean | undefined>();
const searchQuery = ref("");

const status = ref([
  { title: "Scheduled", value: "Scheduled" },
  { title: "Publish", value: "Published" },
  { title: "Inactive", value: "Inactive" },
]);

const categories = ref([
  { title: "Accessories", value: "Accessories" },
  { title: "Home Decor", value: "Home Decor" },
  { title: "Electronics", value: "Electronics" },
  { title: "Shoes", value: "Shoes" },
  { title: "Office", value: "Office" },
  { title: "Games", value: "Games" },
]);

const stockStatus = ref([
  { title: "Còn hàng", value: true },
  { title: "Hết hàng", value: false },
]);

// Data table options
const itemsPerPage = ref(10);
const page = ref(1);
const sortBy = ref();
const orderBy = ref();

// Update data table options
const updateOptions = (options: any) => {
  page.value = options.page;
  sortBy.value = options.sortBy[0]?.key;
  orderBy.value = options.sortBy[0]?.order;
};

const resolveStatus = (status: number) => {
  if (status === 0) return { text: "Công khai", color: "success" };
  else if (status === 1) return { text: "Không công khai", color: "error" };
};

const [
  { data: productsData, execute: fetchProducts },
  { data: categoryRequest, execute: fetchCategories },
] = await Promise.all([
  useApi<any>("/api/admin/product/list", {
    body: {
      q: searchQuery,
      stock: selectedStock,
      category: selectedCategory,
      status: selectedStatus,
      page,
      itemsPerPage,
      sortBy,
      orderBy,
    },
  }),
  useApi<{
    status: number;
    data: {
      id: number;
      name: string;
      slug: string;
      image_url: string;
    }[];
  }>(createUrl("/api/admin/category/list"), {
    body: {},
  }),
]);

const products = computed(() => productsData.value.data);
const totalProduct = computed(() => productsData.value.total);

const deleteProduct = async (id: number) => {
  const { data } = await useApi<{
    status: number;
    msg: string;
  }>("/api/admin/product/delete", {
    method: "DELETE",
    body: { id },
  });

  if (data.value?.status == 200) {
    fetchProducts();
    toast.success(data.value?.msg ?? "Lấy dữ liệu thất bại");
  } else {
    toast.error(data.value?.msg ?? "Lấy dữ liệu thất bại");
  }
};
</script>

<template>
  <div>
    <!-- 👉 widgets -->
    <!-- <VCard class="mb-6">
      <VCardText>
        <VRow>
          <template v-for="(data, id) in widgetData" :key="id">
            <VCol cols="12" sm="6" md="3" class="px-6">
              <div
                class="d-flex justify-space-between"
                :class="
                  $vuetify.display.xs
                    ? 'product-widget'
                    : $vuetify.display.sm
                    ? id < 2
                      ? 'product-widget'
                      : ''
                    : ''
                "
              >
                <div class="d-flex flex-column gap-y-1">
                  <div class="text-body-1 font-weight-medium text-capitalize">
                    {{ data.title }}
                  </div>

                  <h4 class="text-h4 my-1">
                    {{ data.value }}
                  </h4>

                  <div class="d-flex">
                    <div class="me-2 text-disabled text-no-wrap">
                      {{ data.desc }}
                    </div>

                    <VChip
                      v-if="data.change"
                      label
                      :color="data.change > 0 ? 'success' : 'error'"
                    >
                      {{ prefixWithPlus(data.change) }}%
                    </VChip>
                  </div>
                </div>

                <VAvatar variant="tonal" rounded size="38">
                  <VIcon :icon="data.icon" size="28" />
                </VAvatar>
              </div>
            </VCol>
            <VDivider
              v-if="
                $vuetify.display.mdAndUp
                  ? id !== widgetData.length - 1
                  : $vuetify.display.smAndUp
                  ? id % 2 === 0
                  : false
              "
              vertical
              inset
              length="95"
            />
          </template>
        </VRow>
      </VCardText>
    </VCard> -->

    <!-- 👉 products -->
    <VCard title="Bộ lọc" class="mb-6">
      <VCardText>
        <VRow>
          <!-- 👉 Select Status -->
          <!-- <VCol cols="12" sm="4">
            <AppSelect
              v-model="selectedStatus"
              placeholder="Status"
              :items="status"
              clearable
              clear-icon="tabler-x"
            />
          </VCol> -->

          <!-- 👉 Select Category -->
          <VCol cols="12" sm="4">
            <AppSelect
              v-model="selectedCategory"
              placeholder="Category"
              :items="categoryRequest?.data"
              item-title="name"
              item-value="id"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>

          <!-- 👉 Select Stock Status -->
          <!-- <VCol cols="12" sm="4">
            <AppSelect
              v-model="selectedStock"
              placeholder="Stock"
              :items="stockStatus"
              clearable
              clear-icon="tabler-x"
            />
          </VCol> -->
        </VRow>
      </VCardText>

      <VDivider class="my-4" />

      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="d-flex align-center">
          <!-- 👉 Search  -->
          <AppTextField
            v-model="searchQuery"
            placeholder="Search Product"
            density="compact"
            style="inline-size: 200px"
            class="me-3"
          />
        </div>

        <VSpacer />
        <div class="d-flex gap-4 flex-wrap align-center">
          <AppSelect v-model="itemsPerPage" :items="[5, 10, 20, 25, 50]" />
          <!-- 👉 Export button -->
          <VBtn variant="tonal" color="secondary" prepend-icon="tabler-upload">
            Export
          </VBtn>

          <nuxt-link to="/product/add">
            <VBtn color="primary" prepend-icon="tabler-plus">
              Add Product
            </VBtn>
          </nuxt-link>
        </div>
      </div>

      <VDivider class="mt-4" />

      <!-- 👉 Datatable  -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        show-select
        :items="products"
        :items-length="totalProduct"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- product  -->
        <template #item.product="{ item }">
          <div class="d-flex align-center gap-x-2">
            <VAvatar
              v-if="item.images.length"
              size="38"
              variant="tonal"
              rounded
              :image="item.images[0].image_url"
            />
            <div class="d-flex flex-column">
              <span class="text-body-1 font-weight-medium">{{
                item.name
              }}</span>
              <span class="text-sm text-disabled">{{ item.productBrand }}</span>
            </div>
          </div>
        </template>

        <!-- category -->
        <template #item.category="{ item }">
          <div class="d-flex align-center gap-x-2" v-if="item.category">
            <VAvatar
              v-if="item.category"
              size="38"
              variant="tonal"
              rounded
              :image="item.category.image_url"
            />
            <div class="d-flex flex-column">
              <span class="text-body-1 font-weight-medium">{{
                item.category.name
              }}</span>
            </div>
          </div>
          <div v-else>Không xác định</div>
        </template>

        <template #item.price="{ item }">
          <div>
            {{
              item.price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
            }}
          </div>
        </template>

        <!-- stock -->
        <template #item.stock="{ item }">
          <VSwitch :model-value="item.stock_status" disabled />
        </template>

        <!-- status -->
        <template #item.status="{ item }">
          <VChip v-bind="resolveStatus(item.status)" density="default" label />
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <NuxtLink :to="`/product/edit/${item.id}`">
            <IconBtn>
              <VIcon icon="tabler-edit" />
            </IconBtn>
          </NuxtLink>

          <IconBtn @click="deleteProduct(item.id)">
            <VIcon icon="tabler-trash text-red" />
          </IconBtn>
        </template>

        <template #bottom>
          <VDivider />

          <div
            class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3"
          >
            <VPagination
              v-model="page"
              :length="
                Math.min(
                  Math.ceil(
                    productsData.paginate.total / productsData.paginate.per_page
                  ),
                  5
                )
              "
              :total-visible="
                $vuetify.display.xs
                  ? 1
                  : Math.min(
                      Math.ceil(
                        productsData.paginate.total /
                          productsData.paginate.per_page
                      ),
                      5
                    )
              "
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
            </VPagination>
          </div>
        </template>
      </VDataTableServer>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
.product-widget {
  border-block-end: 1px solid
    rgba(var(--v-theme-on-surface), var(--v-border-opacity));
  padding-block-end: 1rem;
}
</style>

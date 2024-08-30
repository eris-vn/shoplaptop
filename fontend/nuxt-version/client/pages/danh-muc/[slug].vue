<template>
  <div>
    <div class="container mx-auto">
      <div class="text-base my-4">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }" class="text-base"
            >Trang hủ</el-breadcrumb-item
          >
          <el-breadcrumb-item class="text-base">{{
            request?.data.category.name
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div
        class="bg-white rounded-md p-4 grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 sticky top-[80px] border"
      >
        <Select
          v-model="query.price"
          optionValue="code"
          :options="[
            { name: 'Giá: thấp đến cao', code: 'a-b' },
            { name: 'Giá: cao đến thấp', code: 'b-a' },
          ]"
          optionLabel="name"
          placeholder="Sắp xếp theo giá"
          class="w-full"
        ></Select>
        <div v-for="filter in filtersRequest?.data">
          <MultiSelect
            v-model="selectedFilter[filter.value]"
            :options="filter.values"
            option-label="name"
            option-value="value"
            filter
            :placeholder="filter.name"
            :maxSelectedLabels="3"
            class="w-full"
          />
        </div>

        <div class="flex gap-4">
          <Button
            class="w-full"
            label="LỌC"
            severity="danger"
            @click="onFilter()"
            :loading="status == 'pending' ? true : false"
          ></Button>
          <Button
            class="w-full"
            label="XOÁ LỌC"
            severity="secondary"
            @click="onClearFilter()"
          ></Button>
        </div>
      </div>

      <div class="bg-white rounded-md py-4 shadow-sm mt-4">
        <div
          class="grid grid-cols-1 xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 gap-4 px-4 rounded-sm"
        >
          <div v-if="!request?.data.products.list.length" class="col-span-12">
            Chưa có sản phẩm nào
          </div>
          <NuxtLink
            :to="`/san-pham/${product.slug}`"
            class="col-span-2 flex items-center flex-col border cursor-pointer"
            v-for="product in request?.data.products.list"
          >
            <img
              :src="product.thumbnail ?? 'https://i.imgur.com/igbbIRf.png'"
              alt=""
              class="w-full aspect-[10/10] object-contain"
            />
            <div class="p-2">
              <div class="text-start text-md font-semibold line-clamp-2 mb-2">
                {{ product.name }}
              </div>
              <div v-if="product.discount" class="text-sm text-gray-600">
                <span class="line-through me-3">
                  {{
                    (product.discount ?? 0).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}
                </span>
                <span
                  v-if="product.discount"
                  class="text-red-600 text-sm px-[4px] py-[1px] bg-red-100 border border-red-500 rounded-sm"
                  >-5%</span
                >
              </div>
              <div class="text-lg font-semibold text-red-600">
                {{
                  (product.price ?? 0).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                }}
              </div>
              <div class="flex gap-3 mt-2">
                <div class="text-sm text-amber-600 font-semibold">
                  0
                  <i class="text-xs bi bi-star-fill"></i>
                </div>
                <div class="text-sm text-gray-700">(0 đánh giá)</div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div
        class="bg-white rounded-md mt-4"
        v-if="request?.data.products.paginate.totalCount"
      >
        <Paginator
          :rows="query.per_page"
          :totalRecords="request?.data.products.paginate.totalCount"
          @page="pageChange"
        ></Paginator>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PageState } from "primevue/paginator";
import type { ApiResponse, Paginate } from "~/types/ApiReponse";
import type { Categories } from "~/types/category";
import type { Product } from "~/types/product";

const route = useRoute();
const selectedFilter = ref<Record<string, string[]>>({});

const query = reactive<{
  price: string;
  per_page: number;
  page: number;
  filters: string;
}>({
  price: "",
  per_page: 20,
  page: 1,
  filters: "",
});

function convertFiltersToQueryString(
  filters: Record<string, string[]>
): string {
  console.log(filters);

  const queryParts: string[] = [];

  for (const key in filters) {
    if (filters[key] && filters[key].length > 0) {
      queryParts.push(`${key}=${filters[key].join(",")}`);
    }
  }

  return queryParts.join("&");
}

const [{ data: request, refresh, status }, { data: filtersRequest }] =
  await Promise.all([
    eFetch<
      ApiResponse<{
        products: {
          list: Product[];
          paginate: Paginate;
        };
        category: Categories;
      }>
    >(`/api/category/${route.params.slug}`, {
      method: "GET",
      query: query,
      watch: false,
    }),
    eFetch<
      ApiResponse<
        {
          name: string;
          value: string;
          values: {
            name: string;
            value: string;
          }[];
        }[]
      >
    >(`/api/category/${route.params.slug}/filter`, {
      method: "GET",
      watch: false,
    }),
  ]);

function onFilter() {
  query.filters = convertFiltersToQueryString(selectedFilter.value);
  query.page = 1;
  refresh();
}

function onClearFilter() {
  query.page = 1;
  query.per_page = 20;
  query.price = "";
  query.filters = "";
  selectedFilter.value = {};
  refresh();
}

function pageChange(data: PageState) {
  query.page = data.page + 1;
  refresh();
}
</script>

<style scoped></style>

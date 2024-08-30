<script setup lang="ts">
import { VDataTableServer } from "vuetify/labs/VDataTable";

const widgetData = ref([
  { title: "Pending Payment", value: 56, icon: "tabler-calendar-stats" },
  { title: "Unfulfilled", value: 25, icon: "tabler-circle-x" },
  { title: "Completed", value: 12689, icon: "tabler-checks" },
  { title: "Refunded", value: 124, icon: "tabler-wallet" },
]);

const searchQuery = ref("");

// Data table options
const itemsPerPage = ref(10);
const page = ref(1);
const sortBy = ref();
const orderBy = ref();

// Data table Headers
const headers = [
  { title: "Mã đơn", key: "order" },
  { title: "Ngày đặt", key: "date" },
  { title: "Khách hàng", key: "customers" },
  { title: "Thanh toán", key: "payment", sortable: false },
  { title: "Trạng thái", key: "status" },
  { title: "Actions", key: "actions", sortable: false },
];

// Update data table options
const updateOptions = (options: any) => {
  page.value = options.page;
  sortBy.value = options.sortBy[0]?.key;
  orderBy.value = options.sortBy[0]?.order;
};

const resolveStatus = (status: string) => {
  if (status === "Delivered") return { text: "Delivered", color: "success" };
  if (status === "Out for Delivery")
    return { text: "Out for Delivery", color: "primary" };
  if (status === "Ready to Pickup")
    return { text: "Ready to Pickup", color: "info" };
  if (status === "Dispatched") return { text: "Dispatched", color: "warning" };
};

// Fetch Orders
const { data: ordersData, execute: fetchOrders } = await useApi<any>(
  createUrl("/api/admin/orders/list", {
    query: {
      q: searchQuery,
      page,
      itemsPerPage,
      sortBy,
      orderBy,
    },
  }),
  {
    method: "GET",
  }
);

const orders = computed(() => ordersData.value.data);
const totalOrder = computed(() => ordersData.value.total);

function getStatusText(status: number) {
  switch (status) {
    case 0:
      return "Chờ xử lý";
    case 1:
      return "Đã đóng gói";
    case 2:
      return "Đang giao hàng";
    case 3:
      return "Giao thành công";
    case 4:
      return "Giao hàng thất bại";
    case 5:
      return "Đã huỷ";
    default:
      return "";
  }
}

// Delete Orders
const deleteOrder = async (id: number) => {
  await $api(`/api/admin/orders/${id}`, {
    method: "DELETE",
  });
  fetchOrders();
};
</script>

<template>
  <div>
    <VCard class="mb-6">
      <!-- 👉 Widgets  -->
      <!-- <VCardText>
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
                  <h4 class="text-h4">
                    {{ data.value }}
                  </h4>

                  <h6 class="text-h6">
                    {{ data.title }}
                  </h6>
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
              length="55"
            />
          </template>
        </VRow>
      </VCardText> -->
    </VCard>

    <VCard>
      <!-- 👉 Filters -->
      <VCardText>
        <div
          class="d-flex justify-sm-space-between justify-start flex-wrap gap-4"
        >
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Serach Order"
            style="max-inline-size: 200px; min-inline-size: 200px"
          />

          <div class="d-flex gap-x-4 align-center">
            <!-- <AppSelect
              v-model="itemsPerPage"
              style="min-inline-size: 6.25rem"
              :items="[5, 10, 20, 50, 100]"
            /> -->
            <VBtn
              variant="tonal"
              color="secondary"
              prepend-icon="tabler-screen-share"
              text="Export"
              append-icon="tabler-chevron-down"
            />
          </div>
        </div>
      </VCardText>

      <VDivider />

      <!-- 👉 Order Table -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        :items="orders"
        :items-length="totalOrder"
        show-select
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- Order ID -->
        <template #item.order="{ item }">
          <NuxtLink
            :to="{ name: 'order-details-id', params: { id: item.id } }"
            class="font-weight-medium"
          >
            #{{ item.id }}
          </NuxtLink>
        </template>

        <!-- Date -->
        <template #item.date="{ item }">
          {{ new Date(item.created_at).toDateString() }}
        </template>

        <!-- Customers  -->
        <template #item.customers="{ item }">
          <div class="d-flex align-center">
            <div class="d-flex flex-column">
              <div class="text-body-1 font-weight-medium">
                <!-- <NuxtLink
                  :to="{
                    name: 'pages-user-profile-tab',
                    params: { tab: 'profile' },
                  }"
                  class="text-link"
                >
                  {{ item.customer }}
                </NuxtLink> -->
              </div>
              <span class="text-sm text-disabled">{{ item.user.name }}</span>
            </div>
          </div>
        </template>

        <!-- Payments -->
        <template #item.payment="{ item }">
          {{ item.payment_method }}
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          {{ getStatusText(item.status) }}
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn>
            <VIcon icon="tabler-dots-vertical" />
            <VMenu activator="parent">
              <VList>
                <VListItem
                  value="view"
                  :to="{ name: 'order-details-id', params: { id: item.order } }"
                >
                  View
                </VListItem>
                <VListItem value="delete" @click="deleteOrder(item.id)">
                  Delete
                </VListItem>
              </VList>
            </VMenu>
          </IconBtn>
        </template>

        <!-- pagination -->
        <template #bottom>
          <VDivider />

          <div
            class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3"
          >
            <VPagination
              v-model="page"
              :length="Math.ceil(totalOrder / itemsPerPage)"
              :total-visible="
                $vuetify.display.xs
                  ? 1
                  : Math.min(Math.ceil(totalOrder / itemsPerPage), 5)
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
.customer-title:hover {
  color: rgba(var(--v-theme-primary)) !important;
}

.product-widget {
  border-block-end: 1px solid
    rgba(var(--v-theme-on-surface), var(--v-border-opacity));
  padding-block-end: 1rem;
}
</style>

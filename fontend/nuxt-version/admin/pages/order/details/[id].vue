<script setup lang="ts">
import { VDataTable } from "vuetify/labs/VDataTable";

const route = useRoute("order-details-id");
const isConfirmDialogVisible = ref(false);
const isUserInfoEditDialogVisible = ref(false);
const isEditAddressDialogVisible = ref(false);

const toast = useToasts();

const headers = [
  { title: "Sản phẩm", key: "productName" },
  { title: "Giá", key: "price" },
  { title: "Số lượng", key: "quantity" },
  { title: "Tổng cộng", key: "total" },
];

const orderData = reactive({
  id: "",
  status: 0,
});

const [{ data: orderDetails, refresh }] = await Promise.all([
  useApi<{
    status: number;
    data: {
      id: number;
      address: {
        name: string;
        phone_number: string;
        address: string;
      };
      order_details: {
        product: {
          name: string;
          price: number;
        };
        quantity: number;
      }[];
      status: number;
      total_price: string;
      created_at: Date;
      user: {
        id: string;
        name: string;
        email: string;
        phone_number: string;
      };
      payment_method: string;
    };
  }>("/api/admin/orders/info", {
    method: "GET",
    params: { id: route.params.id },
  }),
]);

if (orderDetails.value?.status == 200) {
  Object.assign(orderData, {
    id: orderDetails.value?.data.id,
    status: orderDetails.value?.data.status,
  });
}

function formatDate(dateString: Date) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

async function update() {
  const { data } = await useApi<{
    status: number;
    msg: string;
  }>("/api/admin/orders/update", {
    body: orderData,
    method: "PUT",
  });

  if (data.value?.status == 200) {
    navigateTo("/order/list");
    toast.success(data.value?.msg);
  } else {
    toast.error(data.value?.msg);
  }
}
</script>

<template>
  <div>
    <div
      class="d-flex justify-space-between align-center flex-wrap gap-y-4 mb-6"
    >
      <div>
        <div class="d-flex gap-2 align-center mb-2 flex-wrap">
          <h4 class="text-h4">ĐƠN HÀNG #{{ route.params.id }}</h4>
        </div>
        <div>
          <span class="text-body-1">
            {{ formatDate(orderDetails?.data.created_at) }}
          </span>
        </div>
      </div>

      <VBtn variant="tonal" color="success" @click="update"> LƯU </VBtn>
    </div>

    <VRow>
      <VCol cols="12" md="8">
        <!-- 👉 Order Details -->
        <VCard class="mb-6">
          <VCardItem>
            <template #title>
              <h5 class="text-h5">Chi tiết đơn hàng</h5>
            </template>
            <!-- <template #append>
              <VBtn variant="text"> Edit </VBtn>
            </template> -->
          </VCardItem>

          <VDivider />
          <VDataTable
            :headers="headers"
            :items="orderDetails?.data.order_details"
            item-value="productName"
            show-select
            class="text-no-wrap"
          >
            <template #item.productName="{ item }">
              <div class="d-flex gap-x-3">
                <VAvatar
                  v-if="item.product.images.length"
                  size="38"
                  :image="item.product.images[0].image_url"
                  :rounded="0"
                />

                <div class="d-flex flex-column align-start">
                  <span class="text-body-1 font-weight-medium">
                    {{ item.product.name }}
                  </span>
                </div>
              </div>
            </template>

            <template #item.price="{ item }">
              <span>
                {{
                  item.product.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                }}</span
              >
            </template>

            <template #item.total="{ item }">
              <span class="text-h6">
                {{
                  (item.product.price * item.quantity).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                }}
              </span>
            </template>

            <template #item.quantity="{ item }">
              <span class="text-high-emphasis font-weight-medium">{{
                item.quantity
              }}</span>
            </template>

            <template #bottom />
          </VDataTable>
          <VDivider />

          <VCardText>
            <div class="d-flex align-end flex-column">
              <table class="text-high-emphasis">
                <tbody>
                  <tr>
                    <td class="text-high-emphasis font-weight-medium">
                      Tổng cộng:
                    </td>
                    <td class="font-weight-medium">
                      {{
                        (orderDetails?.data.total_price ?? 0).toLocaleString(
                          "it-IT",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VCardText>
        </VCard>

        <!-- 👉 Shipping Activity -->
        <!-- <VCard title="Shipping Activity">
          <VCardText>
            <VTimeline
              truncate-line="both"
              align="start"
              side="end"
              line-color="primary"
              density="compact"
              class="v-timeline-density-compact"
            >
              <VTimelineItem dot-color="primary" size="x-small">
                <div class="d-flex justify-space-between align-center">
                  <div class="app-timeline-title">
                    Order was placed (Order ID: #32543)
                  </div>
                  <div class="app-timeline-meta">Tuesday 10:20 AM</div>
                </div>
                <p class="app-timeline-text mb-0">
                  Your order has been placed successfully
                </p>
              </VTimelineItem>

              <VTimelineItem dot-color="primary" size="x-small">
                <div class="d-flex justify-space-between align-center">
                  <span class="app-timeline-title">Pick-up</span>
                  <span class="app-timeline-meta">Wednesday 11:29 AM</span>
                </div>
                <p class="app-timeline-text mb-0">
                  Pick-up scheduled with courier
                </p>
              </VTimelineItem>

              <VTimelineItem dot-color="primary" size="x-small">
                <div class="d-flex justify-space-between align-center">
                  <span class="app-timeline-title">Dispatched</span>
                  <span class="app-timeline-meta">Thursday 8:15 AM</span>
                </div>
                <p class="app-timeline-text mb-0">
                  Item has been picked up by courier.
                </p>
              </VTimelineItem>

              <VTimelineItem dot-color="primary" size="x-small">
                <div class="d-flex justify-space-between align-center">
                  <span class="app-timeline-title">Package arrived</span>
                  <span class="app-timeline-meta">Saturday 15:20 AM</span>
                </div>
                <p class="app-timeline-text mb-0">
                  Package arrived at an Amazon facility, NY
                </p>
              </VTimelineItem>

              <VTimelineItem dot-color="primary" size="x-small">
                <div class="d-flex justify-space-between align-center">
                  <span class="app-timeline-title"
                    >Dispatched for delivery</span
                  >
                  <span class="app-timeline-meta">Today 14:12 PM</span>
                </div>
                <p class="app-timeline-text mb-0">
                  Package has left an Amazon facility , NY
                </p>
              </VTimelineItem>

              <VTimelineItem dot-color="secondary" size="x-small">
                <div class="d-flex justify-space-between align-center">
                  <span class="app-timeline-title">Delivery</span>
                </div>
                <p class="app-timeline-text mb-0">
                  Package will be delivered by tomorrow
                </p>
              </VTimelineItem>
            </VTimeline>
          </VCardText>
        </VCard> -->

        <VCard>
          <VCardText>
            <div class="d-flex align-center justify-space-between">
              <div
                class="text-body-1 text-high-emphasis font-weight-medium mb-4"
              >
                Địa chỉ giao hàng
              </div>
              <!-- <VBtn
                variant="text"
                density="compact"
                @click="
                  isEditAddressDialogVisible = !isEditAddressDialogVisible
                "
              >
                Edit
              </VBtn> -->
            </div>
            <div>
              <div>Tên người nhận: {{ orderDetails?.data.address.name }}</div>
              <div>
                Số điện thoại: {{ orderDetails?.data.address.phone_number }}
              </div>
              <div>Địa chỉ: {{ orderDetails?.data.address.address }}</div>
            </div>

            <div class="mt-6">
              <div
                class="text-body-1 text-body-1 text-high-emphasis font-weight-medium"
              >
                Phương thức thanh toán
              </div>
              <div class="text-body-1">
                {{ orderDetails?.data.payment_method }}
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="4">
        <VCard class="mb-6">
          <VCardText>
            <div class="d-flex flex-column gap-y-4">
              <AppSelect
                v-model="orderData.status"
                :items="[
                  { label: 'Chờ xử lý', value: 0 },
                  { label: 'Đã đóng gói', value: 1 },
                  { label: 'Đang giao hàng', value: 2 },
                  { label: 'Giao thành công', value: 3 },
                  { label: 'Giao thất bại', value: 4 },
                  { label: 'Đã huỷ', value: 5 },
                ]"
                item-title="label"
                item-value="value"
                label="Trạng thái"
              ></AppSelect>
            </div>
          </VCardText>
        </VCard>

        <!-- 👉 Customer Details  -->
        <VCard class="mb-6">
          <VCardText class="d-flex flex-column gap-y-6">
            <div class="text-body-1 text-high-emphasis font-weight-medium">
              THÔNG TIN KHÁCH HÀNG
            </div>

            <div class="d-flex align-center">
              <div>
                <div class="text-body-1 font-weight-medium">
                  {{ orderDetails?.data.user.name }}
                </div>
                <span class="text-sm text-disabled"
                  >Customer ID: #{{ orderDetails?.data.user.id }}</span
                >
              </div>
            </div>

            <div class="d-flex flex-column gap-y-1">
              <div
                class="d-flex justify-space-between align-center text-body-2"
              >
                <span class="text-body-1 text-high-emphasis font-weight-medium"
                  >Thông tin liên hệ</span
                >
              </div>
              <span>Email: {{ orderDetails?.data.user.email }}</span>
              <span>Số điện thoại: chưa liên kết</span>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <ConfirmDialog
      v-model:isDialogVisible="isConfirmDialogVisible"
      confirmation-question="Are you sure to cancel your Order?"
      cancel-msg="Order cancelled!!"
      cancel-title="Cancelled"
      confirm-msg="Your order cancelled successfully."
      confirm-title="Cancelled!"
    />

    <UserInfoEditDialog v-model:isDialogVisible="isUserInfoEditDialogVisible" />

    <AddEditAddressDialog
      v-model:isDialogVisible="isEditAddressDialogVisible"
    />
  </div>
</template>

<script setup lang="ts">
import type { ApiResponse } from "@/types/ApiReponse";
import { useFileDialog } from "@vueuse/core";

const dropZoneRef = ref<HTMLDivElement>();
interface FileData {
  file: File;
  url: string;
}

const fileData = ref<FileData[]>([]);
const { open, onChange } = useFileDialog({ accept: "image/*" });

function encodeFileToBase64(
  file: any,
  callback: (base64Data: string) => void
): void {
  const reader = new FileReader();
  reader.onload = () => {
    const base64Data = reader.result;
    callback(base64Data as string);
  };
  reader.readAsDataURL(file);
}

onChange((selectedFiles) => {
  if (!selectedFiles) return;

  for (const file of selectedFiles) {
    encodeFileToBase64(file, (base64Data) => {
      fileData.value.push({
        file,
        url: base64Data,
      });
    });
  }
});

const toast = useToasts();

const data = reactive({
  name: "",
  slug: "",
  thumbnail: "",
  short_description: "",
  description: "",
  price: 0,
  discount_price: 0,
  stock_status: false,
  category_id: null,
  attribute: [],
  status: 0,
});

const attributeItems = computed(() => attributeRequest.value?.data ?? []);

const [
  { data: categoryRequest, execute: fetchCategories },
  { data: attributeRequest },
] = await Promise.all([
  useApi<
    ApiResponse<
      {
        id: number;
        name: string;
        slug: string;
        image_url: string;
      }[]
    >
  >("/api/admin/category/list", {
    body: {},
  }),
  useApi<
    ApiResponse<
      {
        label: string;
        options: {
          label: string;
          value: string;
        }[];
      }[]
    >
  >("/api/admin/product/attribute", {
    method: "get",
  }),
]);

async function create() {
  const { data: response } = await useApi<{
    status: number;
    msg: string;
  }>("/api/admin/product/create", {
    method: "POST",
    body: {
      ...data,
      images: fileData.value,
    },
    watch: false,
  });

  if (response.value?.status == 200) {
    navigateTo("/product/list");
    toast.success(response.value?.msg ?? "Lấy dữ liệu thất bại");
  } else {
    toast.error(response.value?.msg ?? "Lấy dữ liệu thất bại");
  }
}

const input = ref();

async function uploadImage() {
  if (!input.value) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    data.thumbnail = e.target?.result as any;
  };
  reader.readAsDataURL(input.value[0]);
}
</script>

<template>
  <div>
    <div
      class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6"
    >
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">Thêm sản phẩm</h4>
      </div>

      <div class="d-flex gap-4 align-center flex-wrap" @click="create">
        <VBtn>Đăng Sản Phẩm</VBtn>
      </div>
    </div>

    <VRow>
      <VCol md="8">
        <!-- 👉 Product Information -->
        <VCard class="mb-6" title="Thông tin sản phẩm">
          <VCardText>
            <VRow>
              <VCol cols="12">
                <AppTextField
                  label="Tên sản phẩm"
                  placeholder="Ví dụ: iPhone 14"
                  v-model="data.name"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  label="Dường dẫn"
                  placeholder="Ví dụ: iphone-14"
                  v-model="data.slug"
                />
              </VCol>
              <VCol cols="12">
                <span class="mb-1">Mô tả ngắn (optional)</span>
                <div>
                  <quill-editor
                    contentType="html"
                    toolbar="full"
                    placeholder="Mô tả ngắn"
                    v-model:content="data.short_description"
                  />
                </div>
              </VCol>
              <VCol>
                <span class="mb-1">Mô tả sản phẩm</span>
                <div>
                  <quill-editor
                    contentType="html"
                    toolbar="full"
                    placeholder="Mô tả sản phẩm"
                    v-model:content="data.description"
                  />
                </div>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>

        <!-- 👉 Media -->
        <VCard class="mb-6">
          <VCardItem>
            <template #title> Ảnh sản phẩm </template>
          </VCardItem>

          <VCardText>
            <div class="flex">
              <div class="w-full h-auto relative">
                <div
                  ref="dropZoneRef"
                  class="cursor-pointer"
                  @click="() => open()"
                >
                  <div
                    v-if="fileData.length === 0"
                    class="d-flex flex-column justify-center align-center gap-y-3 px-6 py-10 border-dashed drop-zone"
                  >
                    <IconBtn variant="tonal" class="rounded-sm">
                      <VIcon icon="tabler-upload" />
                    </IconBtn>
                    <div
                      class="text-base text-high-emphasis font-weight-medium"
                    >
                      Drag and Drop Your Image Here.
                    </div>
                    <span class="text-disabled">or</span>

                    <VBtn variant="tonal"> Browse Images </VBtn>
                  </div>

                  <div
                    v-else
                    class="d-flex justify-center align-center gap-3 pa-8 border-dashed drop-zone flex-wrap"
                  >
                    <VRow class="match-height w-100">
                      <template v-for="(item, index) in fileData" :key="index">
                        <VCol cols="12" sm="4">
                          <VCard :ripple="false" border>
                            <VCardText class="d-flex flex-column" @click.stop>
                              <VImg
                                :src="item.url"
                                width="200px"
                                height="150px"
                                class="w-100 mx-auto"
                              />
                              <div class="mt-2">
                                <span class="clamp-text text-wrap">
                                  {{ item.file.name }}
                                </span>
                                <span> {{ item.file.size / 1000 }} KB </span>
                              </div>
                            </VCardText>
                            <VSpacer />
                            <VCardActions>
                              <VBtn
                                variant="outlined"
                                block
                                @click.stop="fileData.splice(index, 1)"
                              >
                                Remove File
                              </VBtn>
                            </VCardActions>
                          </VCard>
                        </VCol>
                      </template>
                    </VRow>
                  </div>
                </div>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol md="4" cols="12">
        <!-- 👉 Pricing -->
        <VCard title="Giá" class="mb-6">
          <VCardText>
            <AppTextField
              v-model="data.price"
              label="Giá sản phẩm"
              placeholder="Nhập giá bán sản phẩm"
              class="mb-6"
              type="number"
            />
            <AppTextField
              v-model="data.discount_price"
              label="Giá giảm giá"
              placeholder="Nhập giá giảm giá"
              class="mb-4"
              type="number"
            />

            <VDivider class="my-2" />

            <div class="d-flex flex-raw align-center justify-space-between">
              <span>Còn hàng</span>
              <VSwitch density="compact" v-model="data.stock_status" />
            </div>
          </VCardText>
        </VCard>

        <VCard title="Ảnh sản phẩm" class="mb-6">
          <VCardText>
            <v-img
              v-if="data.thumbnail"
              width="100%"
              cover
              :src="data.thumbnail"
              class="mb-2"
            ></v-img>

            <VLabel>
              <span class="text-sm text-high-emphasis mb-1"
                >Chọn ảnh sản phẩm</span
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
                <div class="text-no-wrap pe-2 cursor-pointer">Chọn ảnh</div>
                <VDivider vertical />
              </template>
            </VFileInput>
          </VCardText>
        </VCard>

        <!-- 👉 Organize -->
        <VCard title="Cấu hình">
          <VCardText>
            <VirtualSelect
              v-model="data.attribute"
              class="mb-4"
              label="Thuộc tính"
              :options="attributeItems"
            ></VirtualSelect>

            <div class="d-flex flex-column gap-y-4">
              <AppSelect
                v-model="data.category_id"
                placeholder="Select Category"
                :items="categoryRequest?.data"
                item-title="name"
                item-value="id"
                label="Danh mục"
              />
              <AppSelect
                v-model="data.status"
                :items="[
                  { label: 'Đang bán', value: 0 },
                  { label: 'Ngừng kinh doanh', value: 1 },
                ]"
                item-title="label"
                item-value="value"
                label="Trạng thái"
              ></AppSelect>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
.ql-snow .ql-stroke {
  fill: none;
  stroke: #b9bcc1;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.ql-toolbar.ql-snow {
  border: 1px solid #595d74 !important;
  box-sizing: border-box;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  padding: 8px;
}

.ql-container.ql-snow {
  border: 1px solid #595d74 !important;
}

.drop-zone {
  border: 2px dashed rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 6px;
}
</style>

<style lang="scss">
.v-card {
  overflow: inherit !important;
}
.inventory-card {
  .v-radio-group,
  .v-checkbox {
    .v-selection-control {
      align-items: start !important;

      .v-selection-control__wrapper {
        margin-block-start: -0.375rem !important;
      }
    }

    .v-label.custom-input {
      border: none !important;
    }
  }

  .v-tabs.v-tabs-pill {
    .v-slide-group-item--active.v-tab--selected.text-primary {
      h6 {
        color: #fff !important;
      }
    }
  }
}

.ProseMirror {
  p {
    margin-block-end: 0;
  }

  padding: 0.5rem;
  outline: none;

  p.is-editor-empty:first-child::before {
    block-size: 0;
    color: #adb5bd;
    content: attr(data-placeholder);
    float: inline-start;
    pointer-events: none;
  }
}
</style>

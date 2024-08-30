<template>
  <div>
    <label
      class="v-label mb-1 text-body-2"
      for="app-select-Vũ khí-31j31"
      style="line-height: 15px"
      >{{ label }}</label
    >
    <div :id="id">
      <input
        value=""
        type="text"
        class="v-field__input"
        placeholder="Đang tải ..."
      />
    </div>
  </div>
</template>

<script setup>
useHead({
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/virtual-select-plugin@1.0.44/dist/virtual-select.min.js",
      onload: () => {
        initVirtualSelect();
      },
    },
  ],
  link: [
    {
      href: "https://cdn.jsdelivr.net/npm/virtual-select-plugin@1.0.44/dist/virtual-select.min.css",
      rel: "stylesheet",
    },
  ],
});

const props = defineProps({
  id: {
    type: String,
    default: () => "vs-" + Math.random().toString(36).substring(2, 9),
  },
  label: { type: String, default: "Label" },
  multiple: { type: Boolean, default: true },
  options: { type: Array, default: () => [] },
  valueKey: { type: String, default: "value" },
  labelKey: { type: String, default: "label" },
  disableOptionGroupCheckbox: { type: Boolean, default: true },
  descriptionKey: { type: String, default: "description" },
  aliasKey: { type: String, default: "alias" },
  value: { type: [String, Array, null], default: "" },
  showValueAsTags: { type: Boolean, default: false },
});

const selectedValue = ref(props.value);
const emits = defineEmits(["update:modelValue", "change"]);

const initVirtualSelect = () => {
  if (import.meta.client) {
    VirtualSelect.init({
      ele: `#${props.id}`,
      options: props.options,
      search: true,
      multiple: props.multiple,
      optionsSelectedText: "đã chọn",
      allOptionsSelectedText: "Tất cả",
      disableOptionGroupCheckbox: props.disableOptionGroupCheckbox,
      valueKey: props.valueKey,
      labelKey: props.labelKey,
      descriptionKey: props.descriptionKey,
      selectedValue: selectedValue.value,
      placeholder: "Chưa chọn",
      showValueAsTags: props.showValueAsTags,
    });

    const select = document.querySelector(`#${props.id}`);

    document
      .querySelector(`#${props.id}`)
      .addEventListener("change", handleChange);
  }
};

const handleChange = (event) => {
  const select = event.target;
  const newValue = select.value === "0" ? 0 : select.value;

  if (
    selectedValue.value !== newValue ||
    (selectedValue.value === "" && newValue === 0)
  ) {
    selectedValue.value = newValue;

    emits("update:modelValue", selectedValue.value);
    emits("change");
  }
};

async function setValue(data) {
  const select = document.querySelector(`#${props.id}`);
  setTimeout(async () => {
    await select.setValue(data);
  }, 0);
}

function setOptions(data) {
  const select = document.querySelector(`#${props.id}`);
  select.setOptions(data);
}

function reset() {
  const select = document.querySelector(`#${props.id}`);
  select.reset();
}

defineExpose({ setValue, setOptions, reset, selectedValue });
</script>

<style lang="scss">
.w-full {
  width: 100%;
}

.vscomp-ele {
  max-width: 100% !important;
}

.vscomp-toggle-button {
  border-radius: 6px !important;
  background-color: transparent !important;
  color: rgba(
    var(--v-theme-on-surface),
    var(--v-high-emphasis-opacity)
  ) !important;
  border-color: rgba(var(--v-border-color), var(--v-border-opacity)) !important;
}

.vscomp-value-tag {
  border-color: rgba(var(--v-border-color), var(--v-border-opacity)) !important;
}

.vscomp-arrow::after {
  border-bottom-color: rgba(
    var(--v-theme-on-surface),
    var(--v-high-emphasis-opacity)
  ) !important;
  border-right-color: rgba(
    var(--v-theme-on-surface),
    var(--v-high-emphasis-opacity)
  ) !important;
  height: 6px !important;
  margin-top: -3px !important;
  width: 6px !important;
  margin-right: 10px !important;
}

.vscomp-wrapper.show-value-as-tags .vscomp-toggle-button {
  padding: 5px 22px 3px 10px !important;
}
</style>

import mitt from "mitt";

const emitter = mitt();

export const useEmit = emitter.emit;
export const useListen = emitter.on;
export const removeListen = emitter.off;

export const showLoading = (msg?: string, id?: string) => {
  useEmit(
    `show-loading-${id ? id : "default"}`,
    msg ? msg : "Đang tải dữ liệu"
  );
};

export const hideLoading = (msg?: string, id?: string) => {
  useEmit(`hide-loading-${id ? id : "default"}`);
};

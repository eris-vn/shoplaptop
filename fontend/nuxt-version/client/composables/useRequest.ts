import { eToast as Toast } from "./eToast";
import { showLoading as sLoading, hideLoading as hLoading } from "./useEvent";

export const useRequest = (
  url: string,
  data: {
    body?: any;
    params?: any;
    method?: any;
    autoToast?: boolean;
    autoFailToast?: boolean;
    autoFetchData?: boolean;
    showLoading?: boolean;
    loadingMSG?: string;
    throwError?: boolean;
  } = {}
): Promise<any> => {
  const {
    autoFailToast = false,
    autoToast = false,
    method = "POST",
    params = null,
    autoFetchData = true,
    loadingMSG = "Đang tải dữ liệu",
    showLoading = true,
    throwError = true,
    body = null,
  } = data;
  const toast = Toast();

  // show loading screen
  if (showLoading && process.client) {
    sLoading(loadingMSG);
  }

  return eFetch(url, {
    method: method,
    body: body,
    params: params,
    watch: false,
  }).then(({ error, data: request }: { error: any; data: { value: any } }) => {
    // hide loading screen
    if (showLoading && process.client) {
      hLoading();
    }
    // check error
    if (error.value && process.client) {
      toast.error("Kết nối máy chủ thất bại");
      if (throwError) {
        throw new Error(error.value);
      }
    }

    // auto toast
    if (autoToast && process.client) {
      if (request.value.status == 200) {
        toast.success(request.value.msg || "Lấy dữ liệu thất bại");
      } else {
        toast.error(request.value.msg || "Lấy dữ liệu thất bại");
      }
    }

    if (autoFailToast && process.client) {
      if (request.value.status != 200) {
        toast.error(request.value.msg || "Lấy dữ liệu thất bại");
      }
    }

    // trả kết quả
    return request.value;
  });
};

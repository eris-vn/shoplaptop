interface ApiResponse<T> {
  status: number;
  msg: string;
  message: string;
  data: T;
}

interface Paginate {
  currentPage: number;
  pageCount: number;
  totalCount: number;
}

export type { ApiResponse, Paginate };

export interface IResponse<T> {
  data: T;
  succeeded: boolean;
  errors: string[];
  message: string;
}

export interface IPagedResponse<T> {
  pageNumber: number;
  pageSize: number;
  firstPage: string;
  lastPage: string;
  totalPages: number;
  totalRecords: number;
  nextPage: string;
  previousPage: string;
  data: T[];
}

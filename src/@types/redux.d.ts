export interface IPagedSelector<T> {
  data: T[];
  loading?: boolean;
  pagination: { pageNumber: number; pageSize: number; totalRecords: number };
}

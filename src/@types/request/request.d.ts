export interface IBasePaginatedQuery {
  pageNumber: number;
  pageSize: number;
}

export interface IEmployeeQuery extends IBasePaginatedQuery {
  branchId?: string;
  departmentId?: string;
  name?: string;
}

export interface IDishesQuery extends IBasePaginatedQuery {
  dishName?: string;
  minPrice?: number;
  maxPrice?: number;
  sectionId?: string;
  branchId?: string;
}

export interface ICustomerQuery extends IBasePaginatedQuery {}

export interface IDetailedReservationCardsQuery {
  branchId: string;
  datedOn: string;
}

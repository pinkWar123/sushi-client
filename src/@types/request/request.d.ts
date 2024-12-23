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

export interface ITopDishesQuery {
  branchId?: string;
  startDate?: string;
  endDate?: string;
}

export interface ICustomerQuery extends IBasePaginatedQuery {
  phoneNumber?: string;
}

export interface IDetailedReservationCardsQuery {
  branchId: string;
  datedOn: string;
}

export interface ICreateInvoiceQuery {
  orderId: string;
  paymentMethod: "Cash" | "Credit";
}

export interface IRegisterRequest {
  name: string;
  email: string;
  gender: number;
  phone: string;
  citizenID: string;
  dateOfBirth: string;
  password: string;
}

export interface ILoginRequest {
  userName: string;
  password: string;
}

export interface ICreateReservationRequest {
  note: string;
  datedOn: string;
  customerId: string;
  branchId: string;
  totalPeople: number;
  orderDetails: { dishId: string; quantity: number }[];
}

export interface IUpdateReservationStatusRequest {
  reservationId: string;
  employeeId: string;
  tableId: string;
}

export interface ISurvey {
  point: number;
  comment: string;
}

export interface ICreateSurveyRequest extends ISurvey {
  invoiceId: string;
}

export interface IChangeEmployeeBranchQuery {
  employeeId: string;
  newBranchId: string;
}

export interface IUserInvoiceQuery {
  branchId: string;
  customerName?: string;
  startDate: string;
  endDate: string;
}

export interface ILoginResponse {
  userName: string;
  token: string;
}

export interface IUserCredentials {
  customerId: string | null;
  userName: string | null;
  name: string | null;
  phone: string | null;
  employeeId: string | null;
  branchId: string | null;
  dateOfBirth: string | null;
}

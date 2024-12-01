export interface BranchNameDto {
  branchId: string;
  name: string;
}

export interface BranchDetailDto {
  branchId: string;
  name: string;
  address: string;
  phone: string;
  openingTime: string;
  closingTime: string;
  carParking: boolean;
  motorParking: boolean;
  ship: boolean;
}

export interface IDailyRevenue {
  revenueDate: string;
  totalRevenue: number;
}

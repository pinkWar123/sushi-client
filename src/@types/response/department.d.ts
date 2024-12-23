export interface IDepartment {
  departmentId: string;
  departmentName: string;
  baseSalary: number;
}

export type IDepartmentResponse = IDepartment[];

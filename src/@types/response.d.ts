export interface IUser {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface RegisterResultDto {
  success: boolean;
  accessToken: string;
}

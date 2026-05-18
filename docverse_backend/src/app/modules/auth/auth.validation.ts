export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  role?: "USER" | "AUTHOR";
}

export interface ILoginUser {
  email: string;
  password: string;
}

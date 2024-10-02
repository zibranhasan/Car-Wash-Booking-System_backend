export interface IUser {
  name: string;
  email: string;
  password: string;
  photo?: string;
  phone: string;
  role: "admin" | "user";
  address: string;
}

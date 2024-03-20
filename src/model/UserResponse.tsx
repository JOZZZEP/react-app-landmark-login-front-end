export interface UserResponse {
  uid: number
  username: string;
  password?: string;
  country: string;
  avatar: string;
  role?:string
}

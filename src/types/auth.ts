export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

export type UserInfo = Pick<User, "name" | "email" | "createdAt">;

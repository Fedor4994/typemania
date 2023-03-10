export type User = {
  _id: string;
  name: string;
  email: string;
  avatarURL?: string;
  password: string;
  createdAt: string;
};

export type UserInfo = Omit<User, "password">;

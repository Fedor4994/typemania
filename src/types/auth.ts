export type User = {
  _id: string;
  name: string;
  email: string;
  avatarURL?: string;
  password: string;
  createdAt: string;
};

export type UserInfo = Omit<User, "password">;

export type Achievements = {
  speed10: boolean;
  speed30: boolean;
  speed50: boolean;
  speed70: boolean;
  speed90: boolean;
  speed110: boolean;
  speed130: boolean;
  speed150: boolean;
  speed175: boolean;
  speed200: boolean;
  speed225: boolean;
  speed250: boolean;
  matches1: boolean;
  matches5: boolean;
  matches10: boolean;
  matches25: boolean;
  matches50: boolean;
  matches100: boolean;
  matches250: boolean;
  matches500: boolean;
  matches1000: boolean;
  matches2500: boolean;
  matches5000: boolean;
  matches10000: boolean;
  time1m: boolean;
  time10m: boolean;
  time30m: boolean;
  time1h: boolean;
  time6h: boolean;
  time12h: boolean;
  time1d: boolean;
  time7d: boolean;
  time14d: boolean;
  time1month: boolean;
  time3month: boolean;
  time6month: boolean;
};

export const initialAchievements = {
  speed10: false,
  speed30: false,
  speed50: false,
  speed70: false,
  speed90: false,
  speed110: false,
  speed130: false,
  speed150: false,
  speed175: false,
  speed200: false,
  speed225: false,
  speed250: false,
  matches1: false,
  matches5: false,
  matches10: false,
  matches25: false,
  matches50: false,
  matches100: false,
  matches250: false,
  matches500: false,
  matches1000: false,
  matches2500: false,
  matches5000: false,
  matches10000: false,
  time1m: false,
  time10m: false,
  time30m: false,
  time1h: false,
  time6h: false,
  time12h: false,
  time1d: false,
  time7d: false,
  time14d: false,
  time1month: false,
  time3month: false,
  time6month: false,
};

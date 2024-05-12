export type ResponseProps = {
  id: number;
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
  role: string;
  registerStatus: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

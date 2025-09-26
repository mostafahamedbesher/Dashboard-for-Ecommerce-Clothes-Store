export type LoginType = { email: string; password: string };

export type SignUpUserType = {
  fullName: string;
  email: string;
  password: string;
  role: "staff" | "admin";
};

export type userSignUpFormType = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "staff" | "admin";
};

export type updateUserDataFormType = Pick<
  userSignUpFormType,
  "fullName" | "email"
> & {
  avatar: File[];
};

export type updateUserPasswordFormType = {
  passwordOld: string;
  password: string;
  confirmPassword: string;
};

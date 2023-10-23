export interface SignUpData {
  firstName: string;
  lastName: string;
  nationalId: string;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface ActiveUserData {
  sub: string;
  email: string;
}

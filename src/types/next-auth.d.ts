import { DefaultUser } from "next-auth";

export interface user {
  name: string;
  email: string;
  id: string;
  role?: string;
}

declare module "next-auth" {
  interface User extends DefaultUser {
    token: string;
    role?: string;
  }

  interface Session {
    user: user;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {
    id: string;
    role?: string;
  }
}

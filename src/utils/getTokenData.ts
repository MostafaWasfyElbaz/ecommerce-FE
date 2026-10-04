import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getTokenData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token")?.value;

  if (!token) {
    return null;
  }

  const tokenData = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return (tokenData?.token as string) || null;
}

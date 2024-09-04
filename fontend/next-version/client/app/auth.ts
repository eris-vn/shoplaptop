import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// import useFetch from "@/app/hooks/useFetch";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

class customError extends AuthError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const getToken = await fetch("http://localhost:4000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials.password,
          }),
        });

        if (!getToken.ok) {
          throw new customError("Đăng nhập thất bại");
        }

        const token = await getToken.json();

        if (token.status != 200) {
          throw new customError(token.msg);
        }

        const getUser = await fetch("http://localhost:4000/api/auth/me", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.data.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials.password,
          }),
        });

        const user = await getUser.json();

        return { ...user.data, token: token.data.token };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = (user as any).token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.token) {
        try {
          const request = await fetch("http://localhost:4000/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
            method: "POST",
          });
          const res = await request.json();

          return { ...session, user: res.data, token: token.token };
        } catch (error) {
          console.error("Error fetching user data:");
        }
      }

      return { ...session };
    },
  },
});

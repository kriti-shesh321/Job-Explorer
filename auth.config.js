import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUser } from "./app/lib/data";

export const authConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await getUser(email);

        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
          return {
            id: user.id,
            email: user.email,
            name: user.name || 'User',
          };
        }

        return null;
      }
      ,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
  events: {
    error(error) {
      console.error('AUTH ERROR:  ', error);
    }
  },
  trustHost: true,
};

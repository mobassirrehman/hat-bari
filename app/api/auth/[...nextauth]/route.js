import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Demo user for testing (replace with real DB check later)
        if (
          credentials?.email === "demo@hatbari.com" &&
          credentials?.password === "demo123"
        ) {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@hatbari.com",
            role: "user",
          };
        }

        // Admin user
        if (
          credentials?.email === "admin@hatbari.com" &&
          credentials?.password === "admin123"
        ) {
          return {
            id: "2",
            name: "Admin",
            email: "admin@hatbari.com",
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

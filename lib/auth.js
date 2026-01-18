import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const client = await clientPromise;
        const user = await client
          .db()
          .collection("users")
          .findOne({ email: credentials.email });
        if (!user || !user.password) throw new Error("User not found");
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // 1. Save Google Users to MongoDB on Sign In
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const client = await clientPromise;
        const db = client.db();

        // Check if user exists
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });

        if (!existingUser) {
          // Create new user if they don't exist
          await db.collection("users").insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "customer",
            provider: "google",
            createdAt: new Date(),
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "customer";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
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

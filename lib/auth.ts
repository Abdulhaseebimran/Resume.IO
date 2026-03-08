import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "./mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect();

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter an email and password");
                }

                const user = await User.findOne({ email: credentials.email });

                if (!user || !user.password) {
                    throw new Error("No user found with this email");
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.profileImage,
                } as any;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                // Default fallback
                token.id = user.id;

                if (account?.provider === "google") {
                    try {
                        await dbConnect();
                        const dbUser = await User.findOne({ email: user.email });
                        if (dbUser) {
                            token.id = dbUser._id.toString();
                        }
                    } catch (err) {
                        console.error("JWT Callback Error:", err);
                    }
                } else {
                    token.id = (user as any)._id?.toString() || user.id;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.sub;
            }
            return session;
        },
        async signIn({ account, profile }) {
            if (account?.provider === "google") {
                try {
                    await dbConnect();
                    const existingUser = await User.findOne({ email: profile?.email });
                    if (!existingUser) {
                        await User.create({
                            name: profile?.name,
                            email: profile?.email,
                            profileImage: (profile as any).picture,
                            provider: "google",
                        });
                    }
                    return true;
                } catch (error) {
                    console.error("Google SignIn Error:", error);
                    return false;
                }
            }
            return true;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 Days
    },
    secret: process.env.NEXTAUTH_SECRET,
};

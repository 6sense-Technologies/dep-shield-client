import axios from "axios";
import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthGoogleID, AuthGoogleSecret, TEMP_BACKEND_URL } from "./config";
import jwt from 'jsonwebtoken';


declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    isVerified?: boolean;
    hasOrganization: boolean;
    expires: Date;
    role?: string;
    avatarUrl?: string;
    id?: string;
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    isVerified?: boolean;
    hasOrganization?: boolean;
    role?: string;
    avatarUrl?: string;
    id?: string;
  }
}

class CustomError extends CredentialsSignin {
  constructor(message: string) {
    super();
    this.code = message;
  }
}

// Function to check if the token is expired
const isTokenExpired = (token: string): boolean => {
  console.log("Checking if token is expired....")
  const decoded = jwt.decode(token) as { exp: number };
  console.log("Decoded",decoded)
  if (!decoded || !decoded.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};

// Function to refresh the access token
const refreshAccessToken = async (refreshToken: string): Promise<{ accessToken: string, refreshToken: string }> => {
  try {
    const response = await axios.post(
      `${TEMP_BACKEND_URL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: AuthGoogleID,
      clientSecret: AuthGoogleSecret,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailAddress: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${TEMP_BACKEND_URL}/auth/login`,
            {
              emailAddress: credentials?.emailAddress,
              password: credentials?.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = response.data;
          
          console.log("User Info",data?.userInfo);
          
          if (data?.accessToken) {
            return {
              emailAddress: data?.userInfro?.emailAddress,
              name: data?.userInfo?.displayName,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              isVerified: data?.userInfo?.isVerified,
              hasOrganization: data?.userInfo?.hasOrganization,
              role: data?.userInfo?.role,
              avatarUrl: data?.userInfo?.avatarUrl,
              id: data?.userInfo?._id,
            } as any;
          }

          return false; // Login failed
        } catch (error: any) {
          if (error.response.status === 400) {
            throw new CustomError("Invalid credentials");
          } else if (error.response.status === 404) {
            throw new CustomError("User not found");
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, user, account }) {
      if (trigger === "update") {
        if (session.isVerified !== undefined) {
          token.isVerified = session.isVerified;
        }
        // if (session.hasOrganization !== undefined) {
        //   token.hasOrganization = session.hasOrganization;
        // }
      }

      if (user) {
        token.accessToken = user.accessToken || token.accessToken;
        token.refreshToken = user.refreshToken || token.refreshToken;
        token.isVerified = user.isVerified as boolean;
        // token.hasOrganization = user.hasOrganization as boolean;
        token.role = user.role;
        token.avatarUrl = user.avatarUrl;
        token.id = user.id; 
      }

      if (account && account.provider === "google") {
        const response = await axios.post(
          `${TEMP_BACKEND_URL}/social-login`,
          {
            idToken: account.id_token,
            provider: "google",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        token.accessToken = response.data?.accessToken;
        token.refreshToken = response.data?.refreshToken;
      }
      console.log("JWT INVOKED....")
      // Check if the access token is expired and refresh it if necessary
      if (token.accessToken && isTokenExpired(token.accessToken as string)) {
        console.log("UPDATED")
        const refreshedTokens = await refreshAccessToken(token.refreshToken as string);
        token.accessToken = refreshedTokens.accessToken;
        token.refreshToken = refreshedTokens.refreshToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.isVerified = token.isVerified as boolean;
      // session.hasOrganization = token.hasOrganization as boolean;
      session.role = token.role as string;
      session.avatarUrl = token.avatarUrl as string;
      session.id = token.id as string;
      
      // Set session expiry based on the token's expiration time
      if (token.accessToken) {
        const decoded = jwt.decode(token.accessToken as string) as { exp: number };
        if (decoded && decoded.exp) {
          session.expires = new Date(decoded.exp * 1000); 
        }
      }
      
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
});
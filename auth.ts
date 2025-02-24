/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import NextAuth, { CredentialsSignin } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthGoogleID, AuthGoogleSecret, TEMP_BACKEND_URL } from './config';
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    isVerified?: boolean;
    expires?: Date;
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    isVerified?: boolean;
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
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: AuthGoogleID,
      clientSecret: AuthGoogleSecret,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: 'read:repo_hook read:user user:email repo user:email read:org',
        },
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        emailAddress: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
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
                'Content-Type': 'application/json',
              },
            }
          );

          console.log('RESPONSE:', response.status);
          const data = response.data;
          console.log("🚀 ~ authorize ~ data:", data)
          // console.log('DATA:', response.data);
          // console.log(data?.userInfo?.name);
          // Ensure tokens are included in the returned object
          if (data?.accessToken) {
            return {
              email: credentials.emailAddress,
              name: data?.userInfo?.name,
              isVerified: data?.userInfo?.isVerified,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            } as any;
          }

          return false; // Login failed
        } catch (error: any) {
          console.log('error', error.response.status);
          if (error.response.status === 401)
            throw new CustomError('User not verified');
          else if (
            error.response.status === 400 ||
            error.response.status === 404
          )
            throw new CustomError('Invalid credentials');
          // console.error('Error during credential login:', error);
          // return false;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update") {
        if (session.isVerified !== undefined) {
          token.isVerified = session.isVerified;
          console.log("SESSION IS VERIFIED", session.isVerified);
        }
      }
      // Merge tokens for both Google and Credential-based logins
      if (user) {
        console.log('SESSION FLOW');
        token.accessToken = user.accessToken || token.accessToken;
        token.refreshToken = user.refreshToken || token.refreshToken;
        token.isVerified = user.isVerified as boolean;
      }

      if (account && account.provider === 'google') {
        // Google login flow
        console.log('FOUND GOOGLE AUTH FLOW');
        const response = await axios.post(
          `${TEMP_BACKEND_URL}/auth/social-login`,
          {
            idToken: account.id_token,
            provider: 'google',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('DATA:', response.data);
        token.accessToken = response.data?.tokens?.accessToken;
        token.refreshToken = response.data?.tokens?.refreshToken;
      }
      if (account && account.provider === 'github') {
        console.warn(`ACCESS TOKEN ${account.access_token}`);
        const response = await axios.post(
          `${TEMP_BACKEND_URL}/auth/github-login`,
          {
            accessToken: account.access_token,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('DATA:', response.data);
        token.accessToken = response.data?.tokens?.accessToken;
        token.refreshToken = response.data?.tokens?.refreshToken;
      }

      console.log("JWT INVOKED....");
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
      // console.log('SESSION ACTIVATED: ' + session.accessToken);
       // Set session expiry based on the token's expiration time
       if (token.access_Token) {
        const decoded = jwt.decode(token.accessToken as string) as { exp: number };
        if (decoded && decoded.exp) {
          session.expires = new Date(decoded.exp * 1000); 
        }
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl + '/dashboard';
    },
  },
});

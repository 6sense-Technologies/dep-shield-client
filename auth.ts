/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import NextAuth, { CredentialsSignin } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthGoogleID, AuthGoogleSecret } from './config';
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
  }
}
class CustomError extends CredentialsSignin {
  constructor(message: string) {
    super();
    this.code = message;
  }
}
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
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            'http://192.168.0.158:8000/auth/v2/login',
            {
              email: credentials?.email,
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
          // console.log('DATA:', response.data);
          // console.log(data?.userInfo?.name);
          // Ensure tokens are included in the returned object
          if (data?.tokens?.access_token) {
            return {
              email: credentials.email,
              name: data?.userInfo?.name,
              accessToken: data.tokens.access_token,
              refreshToken: data.tokens.refresh_token,
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
    async jwt({ token, user, account }) {
      // Merge tokens for both Google and Credential-based logins
      if (user) {
        console.log('SESSION FLOW');
        token.accessToken = user.accessToken || token.accessToken;
        token.refreshToken = user.refreshToken || token.refreshToken;
      }

      if (account && account.provider === 'google') {
        // Google login flow
        console.log('FOUND GOOGLE AUTH FLOW');
        const response = await axios.post(
          'http://192.168.0.158:8000/auth/social-login',
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
        token.accessToken = response.data?.tokens?.access_token;
        token.refreshToken = response.data?.tokens?.refresh_token;
      }
      if (account && account.provider === 'github') {
        console.warn(`ACCESS TOKEN ${account.access_token}`);
        const response = await axios.post(
          'http://localhost:8000/auth/github-login',
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
        token.accessToken = response.data?.tokens?.access_token;
        token.refreshToken = response.data?.tokens?.refresh_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      // console.log('SESSION ACTIVATED: ' + session.accessToken);
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl + '/dashboard';
    },
  },
});

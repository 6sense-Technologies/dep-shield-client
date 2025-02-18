import '@testing-library/jest-dom';

// Mock process.env
process.env.AUTH_GOOGLE_ID = 'mock-google-id';
process.env.AUTH_GOOGLE_SECRET = 'mock-google-secret';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      pathname: '/',
    };
  },
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock axios
jest.mock('axios', () => ({
  post: jest.fn(() =>
    Promise.resolve({
      data: {
        tokens: {
          access_token: 'mock-access-token',
        },
      },
    })
  ),
  get: jest.fn(() => Promise.resolve({ data: {} })),
}));

// Mock next-auth
const mockGoogleProvider = jest.fn(() => ({
  id: 'google',
  name: 'Google',
  type: 'oauth',
  authorization: {
    params: {
      prompt: 'select_account',
    },
  },
}));

jest.mock('next-auth/providers/google', () => mockGoogleProvider);

// Mock NextAuth
const mockNextAuth = {
  auth: jest.fn(() =>
    Promise.resolve({
      user: null,
      token: null,
    })
  ),
  signIn: jest.fn(() => Promise.resolve({ ok: true, error: null })),
  signOut: jest.fn(() => Promise.resolve({ ok: true })),
  handlers: {
    GET: jest.fn(),
    POST: jest.fn(),
  },
};

jest.mock('next-auth', () => ({
  ...mockNextAuth,
  default: () => mockNextAuth,
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: {
        name: 'Test User',
        email: 'test@example.com',
      },
      accessToken: 'mock-access-token',
    },
    status: 'authenticated',
  })),
  signIn: jest.fn(() => Promise.resolve({ ok: true })),
  signOut: jest.fn(() => Promise.resolve({ ok: true })),
  getProviders: jest.fn(() =>
    Promise.resolve({
      google: {
        id: 'google',
        name: 'Google',
        type: 'oauth',
      },
    })
  ),
}));

jest.mock('lucide-react', () => {
  return {
    Icon: () => <svg data-testid="icon-mock" />,
  };
});

// jest.setup.js
jest.mock('lucide-react', () => ({
  __esModule: true,
  default: {},
}));

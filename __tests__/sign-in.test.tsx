/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @next/next/no-img-element */
import '@testing-library/jest-dom';
import { render, screen, fireEvent} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignIn from '../app/(auth)/sign-in/page';
import { useSession } from 'next-auth/react';

// Mock window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), 
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))})});

// Mock dependencies
jest.mock('../components/loader', () => {
  return jest.fn(() => <div data-testid="mock-loader">Mock Loader</div>);
});

jest.mock('../app/(auth)/sign-in/_components/invalidErrorBanner', () => {
    return jest.fn(() => <div data-testid="mock-invalid-error-banner">Mock Invalid Error Banner</div>);
  });

jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    handlers: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
  })),
}));

jest.mock('next-auth/react', () => ({
  __esModule: true,
  signIn: jest.fn(),
  useSession: jest.fn(),
}));

jest.mock('next-auth/providers/google', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    id: 'google',
    name: 'Google',
    type: 'oauth',
    clientId: 'mock-client-id',
    clientSecret: 'mock-client-secret',
  }))}));

// Mock Eye and EyeOff components
jest.mock('lucide-react', () => ({
  Eye: jest.fn(() => <div data-testid="mock-eye">Mock Eye</div>),
  EyeOff: jest.fn(() => <div data-testid="mock-eye-off">Mock EyeOff</div>),
}));

// Mock Toaster component
jest.mock('../components/ui/toaster', () => ({
  Toaster: jest.fn(() => <div data-testid="mock-toaster">Mock Toaster</div>),
}));

// Mock comingSoonAlert function
jest.mock('../hooks/use-toast', () => ({
  toast: jest.fn(),
}));

// Mock Circle component
jest.mock('@phosphor-icons/react', () => ({
  Circle: jest.fn(() => <div data-testid="mock-circle">Mock Circle</div>),
}));

// Mock Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(({ src, alt }) => <img src={src} alt={alt} data-testid={`mock-image-${alt}`} />),
}));

const queryClient = new QueryClient();

describe('SignIn Page', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated', data: null });

    render(
      <QueryClientProvider client={queryClient}>
        <SignIn />
      </QueryClientProvider>
    );
  });

  it('renders the email input', () => {
    const emailInput = screen.getByPlaceholderText('Enter your email');
    expect(emailInput).toBeInTheDocument();
  });

  it('renders the password input', () => {
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders the sign in button', () => {
    const signInButtons = screen.getAllByText('Sign in');
    const signInButton = signInButtons.find(button => button.tagName === 'BUTTON');
    expect(signInButton).toBeInTheDocument();
  });

  it('renders the sign up link', () => {
    const signUpLink = screen.getAllByText('Sign up');
    expect(signUpLink.length).toBeGreaterThan(0);
  });

  it('renders the terms of service and privacy policy text', () => {
    const termsText = screen.getByText(/By clicking continue, you agree to our/i);
    expect(termsText).toBeInTheDocument();
  });

  it('calls the comingSoonAlert function when the SSO button is clicked', () => {
    const { toast } = require('../hooks/use-toast');
    const ssoButton = screen.getByText('SSO');
    fireEvent.click(ssoButton);
    expect(toast).toHaveBeenCalledWith({
      title: 'Stay Tuned!',
      description: 'This feature is coming soon.',
    });
  });

  it('calls the comingSoonAlert function when the Google button is clicked', () => {
    const { toast } = require('../hooks/use-toast');
    const googleButton = screen.getByAltText('googleLogo');
    fireEvent.click(googleButton);
    expect(toast).toHaveBeenCalledWith({
      title: 'Stay Tuned!',
      description: 'This feature is coming soon.',
    });
  });

  it('calls the comingSoonAlert function when the Facebook button is clicked', () => {
    const { toast } = require('../hooks/use-toast');
    const facebookButton = screen.getByAltText('facebookLogo');
    fireEvent.click(facebookButton);
    expect(toast).toHaveBeenCalledWith({
      title: 'Stay Tuned!',
      description: 'This feature is coming soon.',
    });
  });

  it('calls the comingSoonAlert function when the Apple button is clicked', () => {
    const { toast } = require('../hooks/use-toast');
    const appleButton = screen.getByAltText('appleLogo');
    fireEvent.click(appleButton);
    expect(toast).toHaveBeenCalledWith({
      title: 'Stay Tuned!',
      description: 'This feature is coming soon.',
    });
  });

  it('renders the Google, Facebook, and Apple logos', () => {
    const googleLogo = screen.getByTestId('mock-image-googleLogo');
    const facebookLogo = screen.getByTestId('mock-image-facebookLogo');
    const appleLogo = screen.getByTestId('mock-image-appleLogo');
    expect(googleLogo).toBeInTheDocument();
    expect(facebookLogo).toBeInTheDocument();
    expect(appleLogo).toBeInTheDocument();
  });
});
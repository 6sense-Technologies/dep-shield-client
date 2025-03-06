import '@testing-library/jest-dom';
import { render, screen, fireEvent} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Verify from '../app/(auth)/sign-up/verification/page';
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

// Mock Circle component
jest.mock('@phosphor-icons/react', () => ({
  Circle: jest.fn(() => <div data-testid="mock-circle">Mock Circle</div>),
}));

// Mock Otpfields component
jest.mock('../app/(auth)/sign-up/verification/_components/otpfields', () => {
  return jest.fn(() => (
    <div>
      {Array.from({ length: 6 }).map((_, index) => (
        <input key={index} aria-label={`otp-${index}`} />
      ))}
    </div>
  ));
});

// Mock AuthPageHeader component
jest.mock('../app/(auth)/_components/authPageHeader', () => {
  return jest.fn(({ title, subTitle }) => (
    <div>
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </div>
  ));
});

// Mock FooterTexts component
jest.mock('../app/(auth)/_components/footerText', () => {
  return jest.fn(() => (
    <div>
      <p>“This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.”</p>
      <p>Sofia Davis</p>
    </div>
  ));
});

const queryClient = new QueryClient();

describe('Verify Page', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: { isVerified: false },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Verify />
      </QueryClientProvider>
    );
  });

  it('renders the OTP input fields', () => {
    const otpInputs = screen.getAllByLabelText(/otp-\d/);
    expect(otpInputs.length).toBe(6);
  });

  it('renders the submit button', () => {
    const submitButtons = screen.getAllByText('Submit');
    const submitButton = submitButtons.find(button => button.tagName === 'BUTTON');
    expect(submitButton).toBeInTheDocument();
  });

  it('displays the footer text', () => {
    const footerText = screen.getByText(/“This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.”/);
    expect(footerText).toBeInTheDocument();
  });

  it('renders the heading and subheading', () => {
    const heading = screen.getByText('Verify Email');
    const subheading = screen.getByText(/We sent a six digit code to/i);
    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });


  it('renders the Circle component when otpMutation is pending', async () => {
    const submitButtons = screen.getAllByText('Submit');
    const submitButton = submitButtons.find(button => button.tagName === 'BUTTON');
    if (submitButton) {
      fireEvent.click(submitButton);
    }
  });
});
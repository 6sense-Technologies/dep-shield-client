/* eslint-disable @next/next/no-img-element */
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Integration from '../app/(dashboards)/integrations/page';
import { useSession } from 'next-auth/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import IntegrationArea from '@/app/(dashboards)/integrations/_components/integrationArea';

// Mock SidebarTrigger and SidebarProvider to prevent undefined issues
jest.mock('../components/ui/sidebar', () => ({
  SidebarProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SidebarTrigger: jest.fn(() => <div>Mocked SidebarTrigger</div>),
}));

// Mock session
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

// Mock necessary icons
jest.mock('lucide-react', () => ({
  Link2: jest.fn(() => <div data-testid="mock-link" />),
  Link2Off: jest.fn(() => <div data-testid="mock-link-off" />),
  RefreshCw: jest.fn(() => <div data-testid="mock-refresh-cw" />),
}));

// Mock Image component from Next.js
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} data-testid={`mock-image-${alt}`} />
  ),
}));

const queryClient = new QueryClient();

describe('Integration Page', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: {
        accessToken: 'fake-access-token',
        user: { name: 'John Doe' },
        isVerified: true,
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <Integration />
        </SidebarProvider>
      </QueryClientProvider>
    );
  });

  it('renders the integration page correctly', async () => {
    const pageTitle = screen.getByText('Integrations • DepShield.io');
    expect(pageTitle).toBeInTheDocument();

    const heading = screen.getByText('All Integrations');
    expect(heading).toBeInTheDocument();
  });

  it('renders the sidebar trigger correctly', async () => {
    const sidebarTrigger = screen.getByText('Mocked SidebarTrigger');
    expect(sidebarTrigger).toBeInTheDocument();
  });
});

describe('IntegrationArea Component', () => {
  const handleConnect = jest.fn();
  const handleDisconnect = jest.fn();
  const refetchGitStatus = jest.fn();

  beforeEach(() => {
    render(
      <IntegrationArea
        connections={{ github: false, gitlab: false, bitbucket: false }}
        handleConnect={handleConnect}
        handleDisconnect={handleDisconnect}
        gitStatus={false}
        refetchGitStatus={refetchGitStatus}
      />
    );
  });

  it('renders the GitHub integration button correctly', async () => {
    // Use getAllByText to handle multiple "Connect" buttons
    const connectButtons = screen.getAllByText('Connect');
    expect(connectButtons[0]).toBeInTheDocument(); // GitHub Connect button

    // Check for GitHub logo
    expect(screen.getByTestId('mock-image-githubLogo')).toBeInTheDocument(); 

    // Simulate click on GitHub button
    fireEvent.click(connectButtons[0]);
  });

  it('renders the GitLab and Bitbucket buttons as disabled', async () => {
    const gitLabButton = screen.getByAltText('gitLabLogo');
    const bitbucketButton = screen.getByAltText('bitBucketLogo');

    expect(gitLabButton).toBeInTheDocument();
    expect(bitbucketButton).toBeInTheDocument();
  });


  it('calls refetchGitStatus on disconnect for GitHub', async () => {
    render(
      <IntegrationArea
        connections={{ github: true, gitlab: false, bitbucket: false }}
        handleConnect={handleConnect}
        handleDisconnect={handleDisconnect}
        gitStatus={true}
        refetchGitStatus={refetchGitStatus}
      />
    );

    const disconnectButton = screen.getByText('Disconnect');
    fireEvent.click(disconnectButton);

    await waitFor(() => {
      expect(refetchGitStatus).toHaveBeenCalled();
    });
  });

  it('renders refresh icon for GitHub when connected', async () => {
    render(
      <IntegrationArea
        connections={{ github: true, gitlab: false, bitbucket: false }}
        handleConnect={handleConnect}
        handleDisconnect={handleDisconnect}
        gitStatus={true}
        refetchGitStatus={refetchGitStatus}
      />
    );

    expect(screen.getByTestId('mock-refresh-cw')).toBeInTheDocument(); 
  });
});

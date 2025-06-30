import axios from 'axios';
import {
  AddAllRepositories,
  AddRepositories,
  getAllRepositories,
  getGitRepositories,
  getRepoAddStatus,
  handleConnection
} from '../helpers/githubApp/githubApi';

jest.mock('axios');
jest.mock('../config.ts', () => ({
  TEMP_BACKEND_URL: 'https://o4t-backend-for-tester.vercel.app',
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('repoApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleConnection', () => {
    it('should handle successful connection check', async () => {
      const mockAccessToken = 'fake-access-token';
      const mockResponse = { data: { success: true } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await handleConnection(mockAccessToken);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://o4t-backend-for-tester.vercel.app/github-app/check-status',
        {
          headers: {
            Authorization: `Bearer ${mockAccessToken}`,
          },
        }
      );
    });

    it('should handle connection check error', async () => {
      const mockAccessToken = 'fake-access-token';
      const mockError = new Error('Connection check failed');
      mockedAxios.get.mockRejectedValueOnce(mockError);

      await expect(handleConnection(mockAccessToken)).rejects.toThrow('Connection check failed');
    });
  });

  describe('getGitRepositories', () => {
    it('should handle successful retrieval of Git repositories', async () => {
      const mockSession = { data: { accessToken: 'fake-access-token' } };
      const mockPage = 1;
      const mockLimit = 10;
      const mockResponse = { data: { success: true, repositories: [] } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getGitRepositories(mockSession, mockPage, mockLimit);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://o4t-backend-for-tester.vercel.app/repositories/repos?page=1&limit=10',
        {
          headers: {
            Authorization: `Bearer ${mockSession.data.accessToken}`,
          },
        }
      );
    });

    it('should handle error while retrieving Git repositories', async () => {
      const mockSession = { data: { accessToken: 'fake-access-token' } };
      const mockPage = 1;
      const mockLimit = 10;
      const mockError = new Error('Failed to retrieve repositories');
      mockedAxios.get.mockRejectedValueOnce(mockError);

      await expect(getGitRepositories(mockSession, mockPage, mockLimit)).rejects.toThrow('Failed to retrieve repositories');
    });
  });

  describe('AddRepositories', () => {
    it('should handle successful repository addition', async () => {
      const mockSession = { data: { accessToken: 'fake-access-token' } };
      const mockRepoId = 'repo-id';
      const mockResponse = { data: { success: true } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await AddRepositories(mockSession, mockRepoId);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://o4t-backend-for-tester.vercel.app/repositories/select-repo',
        { selectedRepo: mockRepoId },
        {
          headers: {
            Authorization: `Bearer ${mockSession.data.accessToken}`,
          },
        }
      );
    });

    it('should handle error while adding repository', async () => {
      const mockSession = { data: { accessToken: 'fake-access-token' } };
      const mockRepoId = 'repo-id';
      const mockError = new Error('Failed to add repository');
      mockedAxios.post.mockRejectedValueOnce(mockError);

      await expect(AddRepositories(mockSession, mockRepoId)).rejects.toThrow('Failed to add repository');
    });
  });

  describe('AddAllRepositories', () => {
    it('should handle successful addition of all repositories', async () => {
      const mockSession = { data: { accessToken: 'fake-access-token' } };
      const mockResponse = { data: { success: true } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await AddAllRepositories(mockSession);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://o4t-backend-for-tester.vercel.app/repositories/select-all',
        {},
        {
          headers: {
            Authorization: `Bearer ${mockSession.data.accessToken}`,
          },
        }
      );
    });

    it('should handle error while adding all repositories', async () => {
      const mockSession = { data: { accessToken: 'fake-access-token' } };
      const mockError = new Error('Failed to add all repositories');
      mockedAxios.post.mockRejectedValueOnce(mockError);

      await expect(AddAllRepositories(mockSession)).rejects.toThrow('Failed to add all repositories');
    });
  });

  describe('getRepoAddStatus', () => {
    it('should handle successful retrieval of repo addition status', async () => {
      const mockSession = { data: { accessToken: 'fake-access-token' } };
      const mockResponse = { data: { success: true, repositories: [] } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getRepoAddStatus(mockSession);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://o4t-backend-for-tester.vercel.app/repositories/selected-repos?page=1&limit=10',
        {
          headers: {
            Authorization: `Bearer ${mockSession.data.accessToken}`,
          },
        }
      );
    });

    it('should handle error while retrieving repo addition status', async () => {
      const mockSession = { data: { accessToken: 'fake-access-token' } };
      const mockError = new Error('Failed to retrieve repo add status');
      mockedAxios.get.mockRejectedValueOnce(mockError);

      await expect(getRepoAddStatus(mockSession)).rejects.toThrow('Failed to retrieve repo add status');
    });
  });

  describe('getAllRepositories', () => {
    it('should handle successful retrieval of all repositories', async () => {
      const mockSession = { data: { accessToken: 'fake-access-token' } };
      const mockPage = 1;
      const mockLimit = 10;
      const mockResponse = { data: { success: true, repositories: [] } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getAllRepositories(mockSession, mockPage, mockLimit);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://o4t-backend-for-tester.vercel.app/repositories/selected-repos?page=1&limit=10',
        {
          headers: {
            Authorization: `Bearer ${mockSession.data.accessToken}`,
          },
        }
      );
    });

    it('should handle error while retrieving all repositories', async () => {
      const mockSession = { data: { accessToken: 'fake-access-token' } };
      const mockPage = 1;
      const mockLimit = 10;
      const mockError = new Error('Failed to retrieve all repositories');
      mockedAxios.get.mockRejectedValueOnce(mockError);

      await expect(getAllRepositories(mockSession, mockPage, mockLimit)).rejects.toThrow('Failed to retrieve all repositories');
    });
  });
});

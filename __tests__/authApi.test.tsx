import axios from 'axios';
import {
  handleBasicSignup,
  handleOtp,
  handleResendOTP,
} from '../helpers/Auth/authApi';
import {
  TBasicSignupFormInputs,
  TVerifyEmail,
} from '../types/Auth.types';

jest.mock('axios');
jest.mock('../config.ts', () => ({
  TEMP_BACKEND_URL: 'https://o4t-backend-for-tester.vercel.app',
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('authApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleBasicSignup', () => {
    it('should handle successful signup', async () => {
      const mockData: TBasicSignupFormInputs = {
        displayName: 'Test User',
        emailAddress: 'test@example.com',
        password: 'password123',
      };
      const mockResponse = { data: { success: true } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await handleBasicSignup(mockData);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://o4t-backend-for-tester.vercel.app/auth/signup',
        mockData,
        { headers: { 'Content-Type': 'application/json' } }
      );
    });

    it('should handle signup error', async () => {
      const mockData: TBasicSignupFormInputs = {
        displayName: 'Test User',
        emailAddress: 'test@example.com',
        password: 'password123',
      };
      const mockError = new Error('Signup failed');
      mockedAxios.post.mockRejectedValueOnce(mockError);

      await expect(handleBasicSignup(mockData)).rejects.toThrow('Signup failed');
    });
  });

  describe('handleOtp', () => {
    it('should handle successful OTP verification', async () => {
      const mockData: TVerifyEmail = { emailAddress: 'test@example.com', token: '123456' };
      const mockResponse = { data: { success: true } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await handleOtp(mockData);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://o4t-backend-for-tester.vercel.app/auth/verify-email',
        mockData,
        { headers: { 'Content-Type': 'application/json' } }
      );
    });

    it('should handle OTP verification error', async () => {
      const mockData: TVerifyEmail = { emailAddress: 'test@example.com', token: '123456' };
      const mockError = new Error('OTP verification failed');
      mockedAxios.post.mockRejectedValueOnce(mockError);

      await expect(handleOtp(mockData)).rejects.toThrow('OTP verification failed');
    });
  });

  describe('handleResendOTP', () => {
    it('should handle successful OTP resend', async () => {
      const mockEmail = 'test@example.com';
      const mockResponse = { data: { success: true } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await handleResendOTP(mockEmail);

      expect(result).toEqual(mockResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://o4t-backend-for-tester.vercel.app/auth/send-otp',
        { emailAddress: mockEmail },
        { headers: { 'Content-Type': 'application/json' } }
      );
    });

    it('should handle OTP resend error', async () => {
      const mockEmail = 'test@example.com';
      const mockError = new Error('OTP resend failed');
      mockedAxios.post.mockRejectedValueOnce(mockError);

      await expect(handleResendOTP(mockEmail)).rejects.toThrow('OTP resend failed');
    });
  });
});
import { TEMP_BACKEND_URL } from '@/config';
import { TBasicSignupFormInputs, TVerifyEmail } from '@/types/Auth.types';
import axios from 'axios';
//   import { TEMP_BACKEND_URI } from "../../globalConstants";

export const handleBasicSignup = async (data: TBasicSignupFormInputs) => {
  const response = await axios.post(`${TEMP_BACKEND_URL}/auth/signup`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response.data);
  return response.data;
};

export const handleOtp = async (data: TVerifyEmail) => {
  const response = await axios.post(
    `${TEMP_BACKEND_URL}/auth/verify-email`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const handleResendOTP = (data: string) => {
  console.log('OTP', data);
  const response = axios.post(
    `${TEMP_BACKEND_URL}/auth/send-otp`,
    { emailAddress: data },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response;
};

export const warmUpServer = async () => {
  const response = await axios.get(`${TEMP_BACKEND_URL}`);
  return response.data;
};

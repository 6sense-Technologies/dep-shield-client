import axios from 'axios';
import { NEXT_PUBLIC_BACKEND_URL } from '@/config';

export const getAllGlobalLicense = async (
  session: any,
  page: number,
  limit: number
) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.get(
    `${NEXT_PUBLIC_BACKEND_URL}/licenses?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const getLicenseByRepoId = async (session: any, licenseId: string) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.get(
    `${NEXT_PUBLIC_BACKEND_URL}/licenses/${licenseId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

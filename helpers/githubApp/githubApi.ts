import { NEXT_PUBLIC_BACKEND_URL, TEMP_BACKEND_URL } from '@/config';
import axios from 'axios';

export const handleConnection = async (accessToken: string) => {
  const response = await axios.get(
    `${TEMP_BACKEND_URL}/github-app/check-status`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const getGitRepositories = async (
  session: any,
  page: number,
  limit: number
) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.get(
    `${TEMP_BACKEND_URL}/repositories/repos?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const AddRepositories = async (session: any, id: string) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.post(
    `${TEMP_BACKEND_URL}/repositories/select-repo`,
    {
      selectedRepo: id,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const AddAllRepositories = async (session: any) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.post(
    `${TEMP_BACKEND_URL}/repositories/select-all`,
    {},

    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const getRepoAddStatus = async (session: any) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.get(
    `${TEMP_BACKEND_URL}/repositories/selected-repos?page=${1}&limit=${10}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const getAllRepositories = async (
  session: any,
  page: number,
  limit: number
) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.get(
    `${TEMP_BACKEND_URL}/repositories/selected-repos?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const getAllDependencies = async (
  repoId: string,
  session: any,
  page: number,
  limit: number
) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.get(
    `${NEXT_PUBLIC_BACKEND_URL}/dependencies?repoId=${repoId}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const getAllLicences = async (
  repoId: string,
  session: any,
  page: number,
  limit: number
) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.get(
    `${NEXT_PUBLIC_BACKEND_URL}/licenses?${repoId}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const getRepositoryBranches = async (
  repoId: string,
  session: any
) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.get(
    `${TEMP_BACKEND_URL}/repositories/${repoId}/branches`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

import { NEXT_PUBLIC_BACKEND_URL } from "@/config";
import axios from "axios";

export const getAllVulnerabilities = async (
  session: any,
  page: number,
  limit: number
) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.get(
    `${NEXT_PUBLIC_BACKEND_URL}/vulnerabilities?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const getAllReposByVulnerability = async (
  session: any,
  vulnerabilityId: string,
  page: number,
  limit: number
) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.get(
    `${NEXT_PUBLIC_BACKEND_URL}/repositories/selected-repos?vulnerabilityId=${vulnerabilityId}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const getAllVulnerabilitiesByRepo = async (
  session: any,
  repoId: string,
  page: number,
  limit: number
) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.get(
    `${NEXT_PUBLIC_BACKEND_URL}/vulnerabilities?repoId=${repoId}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};
export const getVulnerabilityDetails = async (
  session: any,
  vulnerabilityId: string,
) => {
  let accessToken: string = session.data.accessToken;

  const response = await axios.get(
    `${NEXT_PUBLIC_BACKEND_URL}/vulnerabilities/${vulnerabilityId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};
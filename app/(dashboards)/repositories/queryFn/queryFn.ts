import { NEXT_PUBLIC_BACKEND_URL } from "@/config";
import axios from "axios";

export const getRepoSharedUsers = async (session: any, page: number, limit: number) => {
    let accessToken: string = session.data.accessToken;

    const response = await axios.get(
        `${NEXT_PUBLIC_BACKEND_URL}/repositories/shared-repos?page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return response.data;
};
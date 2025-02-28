import { TEMP_BACKEND_URL } from "@/config"
import axios from "axios"

export const handleConnection = async (accessToken: string) =>
{
    const response = await axios.get(`${TEMP_BACKEND_URL}/github-app/check-status`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data
}
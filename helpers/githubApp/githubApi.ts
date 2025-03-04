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


export const getGitRepositories = async (session: any, page: number, limit: number) =>
{
    let accessToken: string  = session.data.accessToken; 
    
    const response = await axios.get(`${TEMP_BACKEND_URL}/github/repos?page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data
}


export const AddRepositories = async (session: any, id: string) =>
{
    let accessToken: string  = session.data.accessToken; 
    
    const response = await axios.post(`${TEMP_BACKEND_URL}/github/select-repo`,
        {
            selectedRepo: id
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data
}

export const getRepoAddStatus = async (session: any) =>
{
    let accessToken: string  = session.data.accessToken; 
    
    const response = await axios.get(`${TEMP_BACKEND_URL}/github/selected-repos?page=${1}&limit=${10}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data
}


export const getAllRepositories = async (session: any, page:number, limit:number) =>
    {
        let accessToken: string  = session.data.accessToken; 
        
        const response = await axios.get(`${TEMP_BACKEND_URL}/github/selected-repos?page=${page}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
    
        return response.data
    }
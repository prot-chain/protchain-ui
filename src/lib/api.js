import axios from 'axios';
import cuid from 'cuid'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8082',
    headers: {
        'Content-Type': 'application/json',
        'X-Request-Source': 'protchain-client',
        'X-Request-ID': cuid()
    },
    withCredentials: false
});

export const authenticateUser = async (email, password) => {
    try {
        const response = await apiClient.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.log("error is", error)
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const registerUser = async (email, password) => {
    try {
        const response = await apiClient.post('/auth/register', { email, password });
        return response.data;
    } catch (error) {
        console.log("error is", error)
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const retrieveProteinDetail = async (proteinId) => {
    try {
        const response = await apiClient.post('/protein', {
        "code": proteinId,
    });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

import axios from 'axios';
import cuid from 'cuid'

export const apiClient = axios.create({
  baseURL: 'http://localhost:8002',
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
        // Send request to retrieve protein details
        const response = await apiClient.post(
            '/protein',
            { code: proteinId },
            {
                headers: { Accept: 'multipart/form-data' }, // Expect multipart response
                responseType: 'text', // Force plain text response for parsing
            }
        );

        // Check if the response is multipart/form-data
        const contentType = response.headers['content-type'];
        if (!contentType || !contentType.startsWith('multipart/form-data')) {
            throw new Error('Invalid response type: Expected multipart/form-data');
        }

        // Extract the boundary
        const boundary = contentType.split('boundary=')[1];
        if (!boundary) {
            throw new Error('Boundary not found in Content-Type header');
        }

        // Parse the response text
        const responseText = response.data;
        const parts = responseText.split(`--${boundary}`).filter((part) => part.trim() && part.trim() !== '--');

        // Parse JSON metadata part
        const jsonPart = parts[0];
        const jsonContent = jsonPart.split('\r\n\r\n')[1]; // Get content after headers
        const metadata = JSON.parse(jsonContent);

        // Parse file content part
        const filePart = parts[1];
        const fileContent = filePart.split('\r\n\r\n')[1]; // Get file content
        const fileBlob = new Blob([fileContent], { type: metadata.type });

        // Return both metadata and the file blob
        return {
            metadata,
            file: fileBlob,
        };
    } catch (error) {
        console.error('Error in retrieveProteinDetail:', error);
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

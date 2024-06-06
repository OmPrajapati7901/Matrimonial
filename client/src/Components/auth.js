import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_API_BASE_URL;


export const checkAuth = async () => {
    console.log('API_BASE_URL',API_BASE_URL)
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/verify`, { withCredentials: true });
        return response.data.user;
    } catch (error) {
        console.error('Not authenticated', error);
        return null;
    }
};

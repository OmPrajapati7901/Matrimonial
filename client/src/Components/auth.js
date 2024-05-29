import axios from 'axios';

export const checkAuth = async () => {
    try {
        const response = await axios.get('http://localhost:6005/auth/verify', { withCredentials: true });
        return response.data.user;
    } catch (error) {
        console.error('Not authenticated', error);
        return null;
    }
};

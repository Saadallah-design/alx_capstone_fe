import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add tokens and CSRF protection
apiClient.interceptors.request.use(
    (config) => {
        // 1. Add JWT access token
        const token = Cookies.get('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // 2. Add CSRF token for Django
        const csrfToken = Cookies.get('csrftoken');
        if (csrfToken && ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
            config.headers['X-CSRFToken'] = csrfToken;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh on 401 errors
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = Cookies.get('refresh_token');

            if (refreshToken) {
                try {
                    const response = await axios.post(`${apiClient.defaults.baseURL}/api/auth/token/refresh/`, {
                        refresh: refreshToken,
                    });

                    const { access } = response.data;
                    Cookies.set('access_token', access);
                    apiClient.defaults.headers.common.Authorization = `Bearer ${access}`;

                    return apiClient(originalRequest);
                } catch (refreshError) {
                    // If refresh fails, log out the user
                    Cookies.remove('access_token');
                    Cookies.remove('refresh_token');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;

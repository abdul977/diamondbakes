
import axios from 'axios';

// Get token from cookie
const getToken = () => {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

// Create base axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
apiClient.interceptors.request.use(request => {
  const token = getToken();
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  return request;
});

// Add request logging
apiClient.interceptors.request.use(request => {
  console.log('API Request:', {
    method: request.method,
    url: request.url,
    data: request.data,
    headers: request.headers
  });
  return request;
});

// Add response logging
apiClient.interceptors.response.use(
  response => {
    console.log('API Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data
    });
    throw error;
  }
);

export default apiClient;

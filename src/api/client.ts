import axios from 'axios';

// Anda dapat mengganti VITE_API_URL dengan URL backend Anda di file .env
// Contoh .env: VITE_API_URL=http://localhost:3000/api
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 10000, // Opsional: batasi waktu tunggu request
});

// Interceptor untuk menyisipkan token pada setiap request
apiClient.interceptors.request.use(
  (config) => {
    // Nanti token bisa diambil dari localStorage atau state management
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani error global dari response
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tangani error secara global, misalnya jika token expired (401)
    if (error.response?.status === 401) {
      console.warn('Unauthorized! Mengarahkan ke halaman login...');
      // Logika redirect ke login atau hapus token bisa ditempatkan di sini
      // localStorage.removeItem('access_token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

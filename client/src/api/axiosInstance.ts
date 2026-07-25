import axios from "axios";



const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});



axiosInstance.interceptors.request.use((config) => {
    const stored = localStorage.getItem('user');
    if(stored){
        const user = JSON.parse(stored);
        if(user?.token){
            config.headers.Authorization = `Bearer ${user.token}`;
        }
    }
    return config;
});



export default axiosInstance;
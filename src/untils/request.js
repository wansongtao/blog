import axios from 'axios';
import { ElMessage } from 'element-plus';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
});

// 响应拦截器
service.interceptors.response.use((response) => {
        const {
            data,
            message,
            success
        } = response.data;

        if (success) {
            return data;
        }
        else {
            ElMessage({
                message: message || '操作失败',
                type: 'error',
                duration: 2 * 1000
            });
            return Promise.reject(message);
        }
    },
    (error) => {
        console.error('err' + error);

        ElMessage({
            message: error.message,
            type: 'error',
            duration: 2 * 1000
        });

        return Promise.reject(error);
    });

export default service;
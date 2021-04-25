import axios from 'axios';
import messageQueue from './messageQueue';

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
            messageQueue(message || '操作失败', "error", 2000);
            return Promise.reject(message);
        }
    },
    (error) => {
        console.error('err' + error);
        messageQueue(error.message || '操作失败', "error", 2000);
        return Promise.reject(error);
    });

export default service;
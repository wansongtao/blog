import request from '@/untils/request';

/**
 * @description 获取留言列表
 * @param {*} params 
 * @returns {Promise}
 */
export const getMessageList = (params) => {
    return request({
        url: '/blog/getmessage',
        method: 'GET',
        params
    });
};

/**
 * @description 发表留言
 * @param {*} data 
 * @returns {Promise}
 */
export const addMessage = (data) => {
    return request({
        url: '/blog/addmessage',
        method: 'POST',
        data
    });
};
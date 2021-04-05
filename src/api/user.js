import request from '@/untils/request'

/**
 * @description 获取用户信息
 * @returns {Promise}
 */
export const getUserInfo = () => {
    return request({
        url: '/blog/getuserinfo',
        method: 'get'
    })
}
import request from '@/untils/request';

/**
 * @description 获取热门文章
 * @returns {promise}
 */
export const getHotArticle = () => {
    return request({
        url: '/blog/gethotarticle',
        method: 'GET'
    });
};
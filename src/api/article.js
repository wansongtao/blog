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

/**
 * @description 获取最新文章
 * @returns {promise}
 */
export const getNewArticle = () => {
    return request({
        url: '/blog/getnewarticle',
        method: 'GET'
    });
};

/**
 * @description 搜索文章
 * @returns {promise}
 */
 export const getSearchArticle = (keyword) => {
    return request({
        url: `/blog/searcharticle?keyword=${keyword}`,
        method: 'GET',
    });
};

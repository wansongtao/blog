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

/**
 * @description 文章详情
 * @returns {promise}
 */
 export const getArticleDetail = (articleId) => {
    return request({
        url: `/blog/getarticlecontent?articleId=${articleId}`,
        method: 'GET',
    });
};

/**
 * @description 文章评论列表
 * @returns {promise}
 */
 export const getArticleComment = (articleId) => {
    return request({
        url: `/blog/getcommentlist?articleId=${articleId}`,
        method: 'GET',
    });
};
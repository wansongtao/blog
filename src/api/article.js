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
export const getNewArticle = (data) => {
    return request({
        url: '/blog/getnewarticle',
        method: 'post',
        data
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

/**
 * @description 发表评论
 * @param {*} data 
 * @returns {promise}
 */
export const addComment = (data) => {
    return request({
        url: '/blog/addcomment',
        method: 'POST',
        data
    });
};

/**
 * @description 获取文章分类
 * @returns 
 */
export const getCategory = () => {
    return request({
        url: '/blog/getcategory',
        method: 'GET'
    });
};
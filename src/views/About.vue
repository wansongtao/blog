<template>
  <div class="container">
    <h6 class="title">关于我</h6>
    <div class="personal">
      <p>姓名：{{users.name}}</p>
      <p>格言：{{users.lifeMotto}}</p>
      <p>爱好：{{users.hobby.join('、')}}</p>
      <p>自我介绍：{{users.personalDes}}</p>
    </div>
    <h6 class="title">关于博客</h6>
    <div class="blog">
      <p>
        前端所用技术：1.博客前台采用vue3、vue-router4、vuex4、vue-cli、element-ui-plus、axios；
        2.博客后台管理端采用vue-element-admin、vue-router、vuex、vue-cli、element-ui、axios。
      </p>
      <p>
        后端所用技术：node的express框架, mysql数据库。
      </p>
      <p>
        服务器相关：使用的是Ubuntu20.04系统，web服务器采用nginx，使用pm2运行node.js。
      </p>
      <p>
        主要功能：1.前台功能主要有查看文章、搜索文章、发表评论、发表留言、留言的滚动加载等功能。
        2.后台功能主要有用户的增删改查、用户的权限管理、文章分类的增删改查、文章的增删改查、文章审核、评论审核/删除、留言审核/删除等功能。
      </p>
      <p>仓库地址：</p>
      <p>前台仓库地址：<a href="https://gitee.com/wan-songtao/blog" target="blog">https://gitee.com/wan-songtao/blog</a></p>
      <p>管理端仓库地址：<a href="https://gitee.com/wan-songtao/blog-admin" target="blogadmin">https://gitee.com/wan-songtao/blog-admin</a></p>
      <p>后端代码仓库地址：<a href="https://gitee.com/wan-songtao/blogserve" target="blogserve">https://gitee.com/wan-songtao/blogserve</a></p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const users = JSON.parse(localStorage.user);

    return {
      users
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 10px;
  min-height: calc(100vh - 90px);
  background: #fff;
  animation: main-ani 0.6s linear 0s 1 forwards;
}

.title {
  margin: 0 10px;
  height: 40px;
  font-size: 24px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.personal {
  padding: 10px 0;

  p {
    font-size: 18px;
    line-height: 1.8em;
    text-indent: 2em;
    text-align: left;
  }
}

.blog {
  padding: 10px 0;

  p {
    font-size: 20px;
    line-height: 2em;
    text-indent: 2em;
    text-align: left;
  }
}

@keyframes main-ani {
  from {
    opacity: 0;
    transform: translateX(-14vw);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
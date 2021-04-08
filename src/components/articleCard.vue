<template>
  <div class="list-item" @click="articleDetails(article.articleId, article.articleTitle)">
    <div class="list-img">
      <img src="@/assets/images/new1.jpg" alt="封面"/>
    </div>
    <div class="title">
      <div class="main-title">
        {{ article.articleTitle || "" }}
      </div>
      <div class="hot"><i class="iconfont iconhot2" />{{ article.hot || 0 }}</div>
    </div>
    <p class="author">{{ article.author || "" }}</p>
    <p class="date">{{ chinaDate || "" }}</p>
    <span>+阅读更多</span>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from "vue";
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { addTime } = toRefs(props.article);

    // 使用计算属性处理日期
    const chinaDate = computed(() => {
      const dateArr = addTime.value.replace(/-/g, "/").substr(0, 10).split("/");

      return `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`;
    });

    const router = useRouter();
    /**
     * @description 跳转到文章详情页
     */
    function articleDetails(articleId, articleTitle) {
      router.push(`/blog/details/${articleId}/${articleTitle}`);
    }

    return {
      chinaDate,
      articleDetails,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-item {
  margin: 0 5px 10px 5px;
  width: calc(100% / 3 - 10px);
  background: #faf9f9;
  text-align: left;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 8px 2px rgb(206, 204, 204);
    transition: all 0.5s linear;
  }

  .list-img {
    width: 100%;
    overflow: hidden;

    img {
      display: block;
      border: none;
      width: 100%;
      border-radius: 10px;

      &:hover {
        transform: scale(1.1);
        transition: all 0.5s linear;
      }
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    font-size: 16px;
    color: #000;
    font-weight: bold;

    .main-title {
      width: 87%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hot {
      width: 12%;
      text-align: right;
      font-weight: 300;
    }

    i {
      padding-right: 5px;
      font-size: 18px;
      color: red;
    }
  }

  .author {
    padding: 5px 10px;
    font-size: 14px;
    color: #000;
  }

  .date {
    padding: 5px 10px;
    font-size: 12px;
  }

  span {
    display: block;
    padding: 5px 10px;
    font-size: 14px;
    color: #0000ee;
    text-align: right;
  }
}
</style>
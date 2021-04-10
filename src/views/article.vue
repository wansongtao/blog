<template>
  <div class="container">
    <h6>最新文章</h6>
    <div class="article-list" v-if="newList.length > 0" @scroll="loadArticle">
      <ArticleCard
        v-for="(item, index) in newList"
        :key="index"
        :article="item"
      />
    </div>
    <div class="tempty" v-else>数据为空...</div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import { getNewArticle } from "@/api/article.js";
import ArticleCard from "@/components/articleCard.vue";

export default defineComponent({
  components: {
    ArticleCard,
  },
  setup() {
    const state = reactive({
      newList: [],
      isMore: true,
      currentPage: 1,
      pageSize: 12,
    });

    /**
     * @description 从服务器获取文章
     */
    const getArticle = () => {
      getNewArticle({
        currentPage: state.currentPage,
        pageSize: state.pageSize,
      })
        .then((data) => {
          if (data.articles) {
            state.newList.push(...data.articles);

            sessionStorage.newArticleList = JSON.stringify(state.newList);

            if (data.articles.length < state.pageSize) {
              state.isMore = false;
            }
          } else {
            state.isMore = false;
          }
          console.log(state.isMore);
        })
        .catch(() => {
          state.isMore = false;
        });
    };

    // 滚动加载更多文章
    const loadArticle = (e) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target;

      // scrollTop + clientHeight = scrollHeight 时，滚动到底部
      if (scrollTop + clientHeight + 20 >= scrollHeight && state.isMore) {
        state.currentPage++;

        if (!sessionStorage.newArticleList) {
          // 本地没有则直接从服务器拉取
          getArticle();
        } else {
          const list = JSON.parse(sessionStorage.newArticleList);

          if (list.length > (state.currentPage - 1) * state.pageSize) {
            const addArticle = list.slice(
              state.pageSize * state.currentPage,
              state.pageSize * state.currentPage + state.pageSize
            );
            state.newList.push(...addArticle);
          } else {
            // 本地数据不足，从服务器拉取
            getArticle();
          }
        }
      }
    };

    

    if (!sessionStorage.newArticleList) {
      getArticle();
    } else {
      state.newList = JSON.parse(sessionStorage.newArticleList).slice(0, state.pageSize);
    }

    return {
      ...toRefs(state),
      loadArticle,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  height: 40px;
  font-size: 24px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.container {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  animation: main-ani 0.6s linear 0s 1 forwards;

  h6 {
    @extend .title;
  }

  .article-list {
    display: flex;
    padding: 10px;
    height: 1225px;
    flex-wrap: wrap;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 3px;
      background: rgba(128, 128, 128, 0.2);
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: #5c5b5a;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    }
  }
}

.tempty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
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
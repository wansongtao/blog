<template>
  <div class="container">
    <h6>最新文章</h6>
    <div class="search-title">
      文章筛选：
      <el-select
        v-model="categoryType"
        filterable
        clearable
        placeholder="请选择文章分类"
        @change="changeType"
      >
        <el-option
          v-for="item in categories"
          :key="item.categoryType"
          :label="item.categoryType"
          :value="item.categoryType"
        >
        </el-option>
      </el-select>
    </div>
    <div class="article-list" v-if="newList.length > 0" @scroll="loadArticle">
      <ArticleCard
        v-for="(item, index) in newList"
        :key="index"
        :article="item"
      />
    </div>
    <div class="tempty" v-else>未查找到相关文章...</div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { getNewArticle, getCategory } from "@/api/article.js";
import ArticleCard from "@/components/articleCard.vue";

export default defineComponent({
  name: "articlelist",
  components: {
    ArticleCard,
  },
  setup() {
    const state = reactive({
      newList: [], // 文章列表数据
      isMore: true, // 是否还有更多文章
      currentPage: 1, // 当前页
      pageSize: 12, // 每页大小
      categories: [], // 分类数据
      categoryType: "", // 当前选择的分类
      isReqData: false // 是否请求了服务器的文章列表数据
    });

    /**
     * @description 从服务器获取文章
     * @param {boolean} isReplace 是否要覆盖newList
     */
    const getArticle = (isReplace = false) => {
      state.isReqData = true;

      getNewArticle({
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        categoryType: state.categoryType,
      })
        .then((data) => {
          // 判断是否返回了文章
          if (data.articles) {
            if (isReplace) {
              state.newList = data.articles;
            } else {
              state.newList.push(...data.articles);
            }

            if (sessionStorage.newArticleList) {
              // 当切换分类时，服务器返回的数据可能和本地数据有重复，所以只将本地没有的数据存储起来。
              const list = JSON.parse(sessionStorage.newArticleList);
              const tempList = list;

              data.articles.forEach((item) => {
                const isSame = tempList.every((value) => {
                  if (value.articleId !== item.articleId) {
                    return true;
                  }

                  return false;
                });

                if (isSame) {
                  list.push(item);
                }
              });

              sessionStorage.newArticleList = JSON.stringify(list);
            } else {
              // 本地没有数据，则直接保存
              sessionStorage.newArticleList = JSON.stringify(state.newList);
            }

            if (data.articles.length < state.pageSize) {
              // 根据返回的数据长度，判断是否还有更多文章
              state.isMore = false;

              if (state.categoryType === "") {
                // 当没有选择分类时，数据长度不够则代表已经请求了所有文章数据了
                sessionStorage.loadAll = JSON.stringify(true);
              }
            }
          } else {
            // 没有返回文章，则设置为false
            state.isMore = false;

            if (state.currentPage === 1) {
              state.newList = [];
            }

            if (state.categoryType === "") {
              // 当没有选择分类时，数据长度不够则代表已经请求了所有文章数据了
              sessionStorage.loadAll = JSON.stringify(true);
            }
          }

          state.isReqData = false;
        })
        .catch(() => {
          state.isMore = false;
          state.isReqData = false;
        });
    };

    // 滚动加载更多文章
    const loadArticle = (e) => {
      if (state.isReqData) {
        // 请求数据还未结束，不再加载
        return;
      }

      const { scrollHeight, scrollTop, clientHeight } = e.target;

      // 在滚动到距离底部40px时，加载更多
      if (scrollTop + clientHeight + 40 >= scrollHeight && state.isMore) {
        state.currentPage++;

        if (!sessionStorage.newArticleList) {
          // 本地没有则直接从服务器拉取
          getArticle();
        } else {
          // 取出本地数据
          let list = JSON.parse(sessionStorage.newArticleList);

          if (state.categoryType != "") {
            // 取出对应分类的数据
            list = list.filter(
              (item) => item.categoryType === state.categoryType
            );
          }

          // 判断本地是否有对应页码的数据
          if (
            sessionStorage.loadAll || 
            list.length >= state.currentPage * state.pageSize
          ) {
            // 取出对应页码的数据
            const addArticle = list.slice(
              state.pageSize * (state.currentPage - 1),
              state.pageSize * state.currentPage
            );

            state.newList.push(...addArticle);

            // 当数据长度小于每页条数时，则没有更多数据了，不再加载。
            if (addArticle.length < state.pageSize) {
              state.isMore = false;
            }
          } else {
            // 本地数据不足，从服务器拉取
            getArticle();
          }
        }
      }
    };

    if (sessionStorage.newArticleList) {
      // 取出本地数据
      state.newList = JSON.parse(sessionStorage.newArticleList).slice(
        0,
        state.pageSize
      );
    } else {
      // 没有本地数据
      getArticle();
    }

    onMounted(() => {
      // 获取文章分类数据
      if (sessionStorage.categories) {
        state.categories = JSON.parse(sessionStorage.categories);
      } else {
        getCategory().then((data) => {
          state.categories = data.categories;

          sessionStorage.categories = JSON.stringify(data.categories);
        });
      }
    });

    // 改变文章分类，搜索对应分类的文章
    const changeType = () => {
      state.currentPage = 1;
      state.isMore = true;

      if (sessionStorage.loadAll && sessionStorage.newArticleList) {
        // 如果本地存在所有文章数据，则直接从本地查找相关分类的文章
        let list = JSON.parse(sessionStorage.newArticleList);

        if (state.categoryType !== "") {
          // 取出对应分类的数据
          list = list.filter(
            (item) => item.categoryType === state.categoryType
          );
        }

        // 判断本地是否有对应页码的数据
        if (list.length > (state.currentPage - 1) * state.pageSize) {
          // 取出对应页码的数据
          const addArticle = list.slice(
            state.pageSize * (state.currentPage - 1),
            state.pageSize * state.currentPage
          );

          state.newList = addArticle;

          // 当数据长度小于每页条数时，则没有更多数据了，不再加载。
          if (addArticle.length < state.pageSize) {
            state.isMore = false;
          }
        } else {
          // 本地数据不足，从服务器拉取
          getArticle();
        }
      } else {
        getArticle(true);
      }
    };

    return {
      ...toRefs(state),
      loadArticle,
      changeType,
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
    padding: 0 10px;
    height: 1175px;
    flex-wrap: wrap;
    overflow-y: auto;
    justify-content: flex-start;
    align-content: flex-start;

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

.search-title {
  padding: 10px;
  margin-top: 10px;
  text-align: left;
  height: 40px;
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
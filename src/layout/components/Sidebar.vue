<template>
  <div class="sidebar">
    <div class="search">
      <input
        type="text"
        placeholder="输入标题、日期、作者搜索文章"
        maxlength="50"
        class="search-input"
        v-model="keyword"
        @keypress.enter="searchHandler"
      />
      <span class="iconfont iconsousuo" @click="searchHandler"></span>
    </div>
    <div class="search-list" @mouseleave="activeIndex = 0">
      <div
        class="list-item"
        v-for="(item, index) in searchList"
        :key="index"
        @mouseenter="changeSelected(index)"
        @click="jumpPage(item.articleId, item.articleTitle)"
      >
        {{ item.articleTitle }}
      </div>
      <div
        class="mask"
        :style="`top: ${20 + activeIndex * 50}px; transition: all 0.4s linear;`"
        @click="
          jumpPage(
            searchList[activeIndex].articleId,
            searchList[activeIndex].articleTitle
          )
        "
      ></div>
      <p v-show="searchList.length === 0">未搜索到任何相关内容...</p>
    </div>
    <div class="send-word">
      <h6>寄语</h6>
      <div class="word">
        <img src="@/assets/images/paragraph.jpg" alt="icon" />
        <p>
          要知道，许多在眼前看来天大的事，都不是人生一战，而只是人生一站。（七堇年语）
        </p>
        <p>
          希望不论途径多少地方，经历多少人事，我们都要在被消耗殆尽之前，有勇气选择转身离开，重新开始。敢于失去和承担代价。
        </p>
        <p>
          我们听到的一切都是一个观点，不是事实，我们看到的一切都是一个视角，不是真相。
        </p>
      </div>
    </div>
    <div class="hot-article" v-if="hotList.length > 0">
      <h6>热门文章</h6>
      <div class="hot-list">
        <div
          class="hot-item"
          v-for="(item, index) in hotList"
          :key="index"
          @click="jumpPage(item.articleId, item.articleTitle)"
        >
          <div
            :class="{
              'hot-icon': true,
              'hot-icon-frist': index === 0,
              'hot-icon-two': index === 1,
              'hot-icon-three': index === 2,
              'hot-icon-font': index <= 2,
            }"
          >
            {{ index + 1 }}
          </div>
          <div class="hot-content">{{ item.articleTitle }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getSearchArticle, getHotArticle } from "@/api/article.js";
import messageQueue from "@/untils/messageQueue.js";

export default defineComponent({
  setup() {
    const activeIndex = ref(0);

    const state = reactive({
      keyword: "",
      searchList: [],
      hotList: [],
      loading: false,
    });

    const router = useRouter();

    // 初始化搜索列表
    function initSearchList() {
      if (!sessionStorage.hotArticleList) {
        router.push("/");
        return;
      }

      const data = JSON.parse(sessionStorage.hotArticleList);

      state.searchList = data.slice(0, 6).map((item) => {
        return {
          articleId: item.articleId,
          articleTitle: item.articleTitle,
        };
      });
    }

    initSearchList();

    onMounted(() => {
      // 获取热门文章列表
      if (!sessionStorage.hotArticleList) {
        getHotArticle().then((data) => {
          state.hotList = data.articles.slice(0, 8).map((item) => {
            return {
              articleId: item.articleId,
              articleTitle: item.articleTitle,
            };
          });

          sessionStorage.hotArticleList = JSON.stringify(
            data.articles.slice(0, 8)
          );
        });
      } else {
        state.hotList = JSON.parse(sessionStorage.hotArticleList)
          .slice(0, 8)
          .map((item) => {
            return {
              articleId: item.articleId,
              articleTitle: item.articleTitle,
            };
          });
      }
    });

    // 鼠标移入时，保存索引
    function changeSelected(index) {
      activeIndex.value = index;
    }

    // 搜索文章
    const searchHandler = () => {
      if (state.keyword !== "") {
        if (state.loading) {
          messageQueue("搜索中...", "warning", 2500);
          return;
        }

        state.loading = true;

        getSearchArticle(state.keyword)
          .then((data) => {
            state.searchList = data.articles.slice(0, 6).map((item) => {
              return {
                articleId: item.articleId,
                articleTitle: item.articleTitle,
              };
            });
            state.loading = false;
          })
          .catch(() => {
            state.searchList = [];
            state.loading = false;
          });
      } else {
        messageQueue("请输入您要搜索的内容", "warning", 1500);
        initSearchList();
      }
    };

    // 跳转到文章详情页
    function jumpPage(articleId, articleTitle) {
      router.push(`/blog/details/${articleId}/${encodeURI(articleTitle)}`);
    }

    return {
      activeIndex,
      changeSelected,
      ...toRefs(state),
      jumpPage,
      searchHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.common {
  padding: 20px 8%;
  width: 84%;
  background: #fff;
}

.title {
  height: 40px;
  font-size: 24px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.sidebar {
  width: 30%;
  animation: side-ani 0.6s linear 0s 1 forwards;

  .search {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;
    background: #808080;

    .search-input {
      display: block;
      margin: 0 20px;
      padding: 0 10px 0 30px;
      width: 100%;
      height: 40px;
      border-radius: 20px;
      outline: none;
      border: none;
    }

    .iconfont {
      position: absolute;
      top: 20px;
      right: 18px;
      display: block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
  }
}

.search-list {
  @extend .common;
  position: relative;
  height: 300px;
  line-height: 300px;
  text-align: center;
  font-size: 20px;
  color: #a6a7a5;

  .list-item {
    padding-left: 10px;
    height: 50px;
    text-align: left;
    font-size: 16px;
    color: #a6a7a5;
    line-height: 49px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  .mask {
    position: absolute;
    top: 20px;
    left: 0;
    width: calc(100% - 5px);
    height: 50px;
    border-right: 5px solid #5c5a5a;
    background-color: rgba(143, 140, 140, 0.1);
    cursor: pointer;
  }
}

.send-word {
  margin-top: 20px;
  @extend .common;

  h6 {
    @extend .title;
  }

  .word {
    padding: 10px 0;

    img {
      display: block;
      float: left;
      width: 60%;
    }

    p {
      margin-bottom: 10px;
      text-indent: 2em;
      font-size: 16px;
      line-height: 30px;
      color: #a6a7a5;
      text-align: left;
    }
  }
}

.hot-article {
  margin-top: 20px;
  @extend .common;

  h6 {
    @extend .title;
  }

  .hot-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    .hot-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #eeeeee;
      font-weight: 300;
      font-size: 14px;
    }

    .hot-icon-font {
      color: #fff;
    }

    .hot-icon-frist {
      background: #e24d46;
    }

    .hot-icon-two {
      background: #2ea7e0;
    }

    .hot-icon-three {
      background: #6bc30d;
    }

    .hot-content {
      flex: 1;
      padding: 10px;
      text-align: left;
      font-size: 16px;
      color: #a6a7a5;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover {
        color: #6bc30d;
      }
    }
  }
}

@keyframes side-ani {
  from {
    opacity: 0;
    transform: translateX(15vw);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
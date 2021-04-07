<template>
  <div class="sidebar">
    <div class="search">
      <input
        type="text"
        placeholder="输入标题、日期、作者搜索文章"
        maxlength="50"
        class="search-input"
        v-model="keyword"
      />
      <span class="iconfont iconsousuo"></span>
    </div>
    <div class="search-list" @mouseleave="activeIndex = 0">
      <template v-if="searchList.length > 0">
        <div
          class="list-item"
          v-for="(item, index) in searchList"
          :key="index"
          @mouseenter="changeSelected(index)"
        >
          {{ item.articleTitle }}
        </div>
        <div
          class="mask"
          :style="`top: ${
            20 + activeIndex * 50
          }px; transition: all 0.5s linear;`"
          @click="jumpPage(searchList[activeIndex].articleId)"
        ></div>
      </template>
      <template v-else> 未搜索到任何相关内容... </template>
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
        <div class="hot-item" v-for="(item, index) in hotList" :key="index" @click="jumpPage(item.articleId)">
          <div
            :class="{
              'hot-icon': true,
              'hot-icon-frist': index === 0,
              'hot-icon-two': index === 1,
              'hot-icon-three': index === 2,
              'hot-icon-font': index <= 2
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
import { defineComponent, ref, reactive, toRefs, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import {
  getNewArticle,
  getSearchArticle,
  getHotArticle,
} from "@/api/article.js";

export default defineComponent({
  setup() {
    const activeIndex = ref(0);

    const state = reactive({
      keyword: "",
      searchList: [],
      hotList: [],
    });

    // 初始化搜索列表
    function initSearchList() {
      getNewArticle().then((data) => {
        state.searchList = data.articles.slice(0, 6).map((item) => {
          return {
            articleId: item.articleId,
            articleTitle: item.articleTitle,
          };
        });
      });
    }

    onMounted(() => {
      initSearchList();

      // 获取热门文章列表
      getHotArticle().then((data) => {
        state.hotList = data.articles.slice(0, 8).map((item) => {
          return {
            articleId: item.articleId,
            articleTitle: item.articleTitle,
          };
        });
      });
    });

    // 鼠标移入时，保存索引
    function changeSelected(index) {
      activeIndex.value = index;
    }

    // 监听搜索框的值
    watch(
      () => state.keyword,
      (newVal) => {
        if (newVal !== "") {
          getSearchArticle(newVal)
            .then((data) => {
              state.searchList = data.articles.slice(0, 6).map((item) => {
                return {
                  articleId: item.articleId,
                  articleTitle: item.articleTitle,
                };
              });
            })
            .catch(() => {
              state.searchList = [];
            });
        } else {
          initSearchList();
        }
      }
    );

    const router = useRouter();

    // 跳转到文章详情页
    function jumpPage(articleId) {
      router.push(`/blog/details/${articleId}`);
    }

    return {
      activeIndex,
      changeSelected,
      ...toRefs(state),
      jumpPage,
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
  margin-left: 20px;
  width: 30%;

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
      margin: 0 30px;
      padding: 0 20px;
      width: 100%;
      height: 40px;
      border-radius: 20px;
      outline: none;
      border: none;
    }

    .iconfont {
      position: absolute;
      top: 20px;
      right: 30px;
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
      flex: 1 1 auto;
      padding: 10px;
      text-align: left;
      font-size: 16px;
      color: #a6a7a5;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
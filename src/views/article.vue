<template>
  <div class="container">
    <h6>最新文章</h6>
    <div class="article-list" v-if="newList.length > 0">
      <ArticleCard
        v-for="(item, index) in newList"
        :key="index"
        :article="item"
      />
    </div>
    <div class="tempty" v-else>
      数据为空...
    </div>
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
      newList: []
    });

    getNewArticle().then((data) => {
      state.newList = data.articles.slice(0, 7);
    });

    return {
      ...toRefs(state),
    };
  }
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
  background: #fff;

  h6 {
    @extend .title;
  }

  .article-list {
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: flex-start;
  }
}

.tempty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
}
</style>
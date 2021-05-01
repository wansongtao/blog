<template>
  <div class="container">
    <div class="focus">
      <div class="animate-content" v-if="name">
        <div class="name">{{ name }}</div>
        <div class="des">{{ lifeMotto }}</div>
        <el-button type="primary" @click="jumpBlog">Enter Blog</el-button>
      </div>
    </div>
    <div class="article">
      <h4>热门文章</h4>
      <div class="divider"></div>
      <p class="para">
        在这个世界既没有幸福也没有不幸，只是一种处境和另一种处境的比较，仅此而已，唯有经历过最大厄运磨难的人，才能感受到最大的乐趣。
      </p>
      <div class="art-list" v-if="articles.length > 0">
        <ArticleCard
          v-for="(item, index) in articles"
          :key="index"
          :article="item"
        />
      </div>
    </div>
    <footer class="footer">
      <div class="ft-content">
        <div class="ft-content-item">
          <h6>{{ name }}</h6>
          <p>{{ lifeMotto }}</p>
          <el-button type="primary" @click="jumpBlog">Enter Blog</el-button>
        </div>
        <div class="ft-content-item">
          <h6>相关链接</h6>
          <div class="ft-link">
            <div v-for="(item, index) in menuList" :key="index">
              <router-link :to="item.path">{{ item.title }}</router-link>
            </div>
          </div>
        </div>
        <div class="ft-content-item">
          <h6>联系我</h6>
          <div class="about-me">weChat：{{ weChat }}</div>
          <div class="about-me">QQ: {{ qqAcc }}</div>
          <div class="about-me">email: {{ email }}</div>
        </div>
      </div>
      <BeiAn />
    </footer>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import menu from "@/hooks/menu.js";
import BeiAn from "@/components/footerBeiAn.vue";
import ArticleCard from "@/components/articleCard.vue";
import { getHotArticle, getNewArticle } from "@/api/article.js";

export default defineComponent({
  components: {
    BeiAn,
    ArticleCard,
  },
  setup() {
    const state = reactive({
      name: "",
      lifeMotto: "",
      weChat: "",
      qqAcc: "",
      email: "",
      articles: [],
    });

    // 调用vuex获取用户信息
    const store = useStore();

    store.dispatch("getUserInfo").then((data) => {
      state.name = data.name;
      state.lifeMotto = data.lifeMotto;
      state.weChat = data.weChat;
      state.qqAcc = data.qqAcc;
      state.email = data.email;
    });

    // 获取菜单列表
    const menuList = menu();

    const router = useRouter();
    function jumpBlog() {
      router.push("/blog/article");
    }

    // 获取热门文章列表
    if (!sessionStorage.hotArticleList) {
      getHotArticle().then((data) => {
        state.articles = data.articles.slice(0, 3);

        sessionStorage.hotArticleList = JSON.stringify(data.articles);
      });
    }
    else {
      state.articles = JSON.parse(sessionStorage.hotArticleList).slice(0, 3);
    }

    onMounted(() => {
      if (!sessionStorage.newArticleList) {
        // 获取最新文章列表，并保存至会话存储中
        getNewArticle().then((data) => {
          const newList = data.articles;

          sessionStorage.newArticleList = JSON.stringify(newList);
        });
      }
    });

    return {
      ...toRefs(state),
      menuList,
      jumpBlog,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background: url("../assets/images/bg.jpg") no-repeat center center;
  background-attachment: fixed;
  background-size: cover;
  background-color: transparent;

  .focus {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.4);

    .animate-content {
      animation: mainAni 1s linear 0s 1 normal forwards;
    }

    .name {
      padding: 10px;
      font-size: 36px;
      color: #fff;
    }

    .des {
      margin-bottom: 15px;
      padding: 5px;
      font-size: 20px;
      color: #fff;
    }
  }

  .article {
    width: 100%;
    background: #fff;

    h4 {
      font-size: 28px;
      line-height: 40px;
    }

    .divider {
      margin: 0 auto;
      width: 50px;
      height: 2px;
      background: #00c2ff;
      border-radius: 1px;
    }

    .para {
      margin: 10px auto;
      width: 20%;
      text-align: center;
      font-size: 16px;
      line-height: 1.5em;
      color: #888;
    }

    .art-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      padding: 10px 0;
      width: 60%;
    }
  }
}

@keyframes mainAni {
  from {
    transform: scale(0.2);
  }
  to {
    transform: scale(1);
  }
}

.footer {
  width: 100%;
  background: #232328;

  .ft-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 5%;
    width: 90%;
  }
}

.ft-content-item {
  flex: 1;
  height: 130px;
  color: #fff;
  text-align: left;

  h6 {
    font-size: 18px;
    line-height: 40px;
  }

  p {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 30px;
  }
}

.ft-link {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  padding: 10px 0;
  height: 70px;

  div {
    width: 50%;
    font-size: 14px;
    color: #fff;

    ::v-deep a {
      display: block;
      text-decoration: none;
      color: #fff;
    }

    ::v-deep a:hover {
      color: #82b440;
    }
  }
}

.about-me {
  font-size: 14px;
  line-height: 30px;
}
</style>
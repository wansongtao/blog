<template>
  <div class="container">
    <h6 class="title">我的分享</h6>
    <div class="content">
      <h4>{{ title }}</h4>
      <article v-html="articleContent" class="article" />
      <div class="pre-next">
        <p @click="preArticle">
          上一篇：<span>{{ preTitle }}</span>
        </p>
        <p @click="nextArticle">
          下一篇：<span>{{ nextTitle }}</span>
        </p>
      </div>
      <h6 class="title">文章评论</h6>
      <div class="comment-box">
        <textarea
          id="comment"
          placeholder="请输入您的评论"
          maxlength="200"
          class="textarea"
          v-model="commentContent"
        ></textarea>
        <div class="btn">
          <el-button type="primary" @click="sendComment" :loading="loading"
            >发表</el-button
          >
        </div>
      </div>
      <template v-if="commentList !== -1 && commentList.length > 0">
        <div
          class="comment-list"
          v-for="(item, index) in commentList"
          :key="index"
        >
          <div class="parent-comment">
            <img src="@/assets/images/chutian.jpg" alt="avatr" class="avatr" />
            <div class="main-comment">
              <p class="comment-time">{{ item.commentTime }}</p>
              <p class="comment-content" @click="replyComment(item.commentId)">
                {{ item.commentContent }}
              </p>
            </div>
          </div>
          <div class="child-comment" v-if="item.children">
            <p
              v-for="(child, idx) in item.children"
              :key="idx"
              @click="replyChildComment(item.commentId, child.commentId)"
            >
              <span>{{ child.commentId }}</span
              ><i v-if="child.replyId">回复</i
              ><span>{{ child.replyId || "" }}</span
              >：{{ child.commentContent }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import {
  getArticleDetail,
  getArticleComment,
  addComment,
} from "@/api/article.js";

export default {
  props: {
    articleId: {
      type: String,
      required: true,
    },
    articleTitle: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      articleContent: "",
      commentList: [],
      articleId: Number(props.articleId),
      title: props.articleTitle,
      commentContent: "",
      parentId: null,
      replyId: null,
      loading: false,
      preArticleId: "",
      nextArticleId: "",
      preTitle: "",
      nextTitle: "",
    });

    // 从服务器获取文章内容并存入会话存储
    const getArticleContent = (articleId = state.articleId) => {
      getArticleDetail(articleId).then((data) => {
        state.articleContent = data.articleContent;

        if (sessionStorage.articleDetails) {
          // 从会话存储中获取文章相关数据
          const details = JSON.parse(sessionStorage.articleDetails);

          // 查找是否有这篇文章
          const index = details.findIndex(
            (item) => item.articleId === articleId
          );

          if (index !== -1) {
            // 有，添加文章内容字段
            details[index].articleContent = data.articleContent;
          } else {
            // 没有，添加一个对象包含文章id字段和文章内容字段
            details.push({
              articleId,
              articleContent: data.articleContent,
            });
          }

          sessionStorage.articleDetails = JSON.stringify(details);
        } else {
          // 会话存储没有任何数据
          sessionStorage.articleDetails = JSON.stringify([
            {
              articleId,
              articleContent: data.articleContent,
            },
          ]);
        }
      });
    };

    // 从服务器拉取文章评论列表并存入会话存储中。
    const getServerComment = (articleId = state.articleId) => {
      getArticleComment(articleId).then((data) => {
        if (!data.commentList) {
          // 没有评论
          data.commentList = -1;
        }

        state.commentList = data.commentList;

        if (sessionStorage.articleDetails) {
          // 从会话存储中获取文章数据
          const details = JSON.parse(sessionStorage.articleDetails);

          // 查找是否有这篇文章的数据
          const index = details.findIndex(
            (item) => item.articleId === articleId
          );

          if (index !== -1) {
            // 有，添加文章评论字段
            details[index].commentList = data.commentList;
          } else {
            // 没有，添加一个对象包含文章id和文章评论字段
            details.push({
              articleId,
              commentList: data.commentList,
            });
          }

          sessionStorage.articleDetails = JSON.stringify(details);
        } else {
          sessionStorage.articleDetails = JSON.stringify([
            {
              articleId,
              commentList: data.commentList,
            },
          ]);
        }
      });
    };

    // 发表评论
    const sendComment = () => {
      if (state.commentContent === "") {
        ElMessage({
          message: "请先输入评论内容",
          type: "warning",
          duration: 2 * 1000,
        });
      } else {
        state.loading = true;

        const data = {
          articleId: state.articleId,
          commentContent: state.commentContent,
        };

        if (state.parentId) {
          data.parentId = state.parentId;
        }

        if (state.replyId) {
          data.replyId = state.replyId;
        }

        addComment(data)
          .then(() => {
            clearComment();

            state.loading = false;

            ElMessage({
              message: "发表成功，审核中...",
              type: "success",
              duration: 2 * 1000,
            });
          })
          .catch(() => {
            state.loading = false;
          });
      }
    };

    // 清空评论相关参数
    const clearComment = () => {
      state.commentContent = "";
      state.parentId = null;
      state.replyId = null;
    };

    // 回复主评论
    const replyComment = (parentId) => {
      state.parentId = parentId;

      document.getElementById("comment").focus();
    };

    // 回复子评论
    const replyChildComment = (parentId, replyId) => {
      state.parentId = parentId;
      state.replyId = replyId;

      document.getElementById("comment").focus();
    };

    // 获取文章内容
    if (sessionStorage.articleDetails) {
      // 取出会话存储中保存的文章相关数据
      const article = JSON.parse(sessionStorage.articleDetails);

      // 查找是否有这篇文章且有这篇文章的内容
      const index = article.findIndex(
        (item) => item.articleId === state.articleId && item.articleContent
      );

      if (index !== -1) {
        // 有，直接赋值
        state.articleContent = article[index].articleContent;
      } else {
        // 没有，从服务器拉取
        getArticleContent();
      }
    } else {
      getArticleContent();
    }

    // 获取文章评论
    if (sessionStorage.articleDetails) {
      // 从会话存储中获取文章数据
      const article = JSON.parse(sessionStorage.articleDetails);

      // 查找是否有这篇文章且有这篇文章的评论
      const index = article.findIndex(
        (item) => item.articleId === state.articleId && item.commentList
      );

      if (index !== -1) {
        // 有，直接获取
        state.commentList = article[index].commentList;
      } else {
        getServerComment();
      }
    } else {
      getServerComment();
    }

    // 侦听文章id的变化，获取上一篇和下一篇文章
    watch(
      () => state.articleId,
      (newval) => {
        try {
          const list = JSON.parse(sessionStorage.newArticleList);

          const index = list.findIndex((item) => item.articleId === newval);

          state.preArticleId = index
            ? list[index - 1].articleId
            : list[list.length - 1].articleId;

          state.nextArticleId =
            index === list.length - 1
              ? list[0].articleId
              : list[index + 1].articleId;

          state.preTitle = index
            ? list[index - 1].articleTitle
            : list[list.length - 1].articleTitle;

          state.nextTitle =
            index === list.length - 1
              ? list[0].articleTitle
              : list[index + 1].articleTitle;
        } catch (ex) {
          console.error(ex);
        }
      },
      { immediate: true }
    );

    const router = useRouter();
    const preArticle = () => {
      router.push(`/blog/details/${state.preArticleId}/${state.preTitle}`);
    };

    const nextArticle = () => {
      router.push(`/blog/details/${state.nextArticleId}/${state.nextTitle}`);
    };

    return {
      ...toRefs(state),
      sendComment,
      replyComment,
      replyChildComment,
      preArticle,
      nextArticle,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px 0;
  min-height: calc(100vh - 110px);
  background: #fff;
  animation: main-ani 0.6s linear 0s 1 forwards;

  h4 {
    text-align: center;
    font-size: 24px;
    line-height: 50px;
    color: #808080;
  }

  .comment-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;

    .textarea {
      overflow: hidden;
      margin: 0 auto;
      padding: 10px;
      width: 90%;
      height: 200px;
      box-sizing: border-box;
      resize: none;
      outline: none;
      border-radius: 5px;
      background: #f7f7f7;
      font-size: 16px;
      line-height: 1.5em;
      color: #000;
      caret-color: red; // 改变光标颜色
    }

    .btn {
      display: flex;
      align-items: flex-end;
      width: 8%;
      height: 200px;
    }
  }
}

.content {
  max-height: calc(1286px - 41px);
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

.article {
  padding: 10px;
  min-height: calc(100vh - 340px);
  font-size: 18px;

  ::v-deep p {
    text-indent: 2em;
    text-align: left;
    line-height: 2em;
  }

  ::v-deep img {
    display: block;
    margin: 10px auto;
    max-width: 100%;
  }

  ::v-deep pre {
    padding: 0 10px;
    text-align: left;
    line-height: 2em;
    background: #eee;
    overflow-x: auto;
  }

  ::v-deep h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: center;
    line-height: 1.6em;
  }
}

.title {
  margin: 0 10px;
  height: 40px;
  font-size: 24px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.pre-next {
  padding: 10px;
  text-align: left;

  p {
    font-size: 16px;
    line-height: 30px;
    cursor: pointer;

    span {
      color: #6bc30d;
    }
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

.comment-list {
  margin: 0 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;

  .parent-comment {
    display: flex;
    margin-bottom: 5px;
  }

  .avatr {
    display: block;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
  }

  .main-comment {
    flex: 1 1 auto;

    p {
      padding-left: 10px;
      font-size: 16px;
      color: #000;
      line-height: 30px;
      text-align: left;
    }

    .comment-content {
      cursor: pointer;
    }
  }

  .child-comment {
    margin-left: 70px;
    margin-bottom: 5px;
    padding: 10px;
    background: #f7f7f7;
    border-radius: 15px;

    p {
      font-size: 16px;
      text-align: left;
      line-height: 1.5em;
      cursor: pointer;

      span {
        padding: 0 5px;
        color: #409eff;
      }
    }
  }
}
</style>
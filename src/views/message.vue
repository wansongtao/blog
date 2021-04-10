<template>
  <div class="container">
    <div class="header">
      <h4>留言板</h4>
      <h6>沟通交流，拉近你我</h6>
      <textarea
        id="comment"
        placeholder="写下您想对我说的话"
        maxlength="200"
        class="textarea"
        v-model="msgContent"
      ></textarea>
      <el-button type="primary" :loading="loading" @click="sendMessage"
        >提交留言</el-button
      >
    </div>
    <div class="message-list">
      <h6 class="title">所有留言</h6>
      <div class="scroll" @scroll="scrollHandler">
        <div
          class="comment-list"
          v-for="(item, index) in messageList"
          :key="index"
        >
          <div class="parent-comment">
            <img src="@/assets/images/chutian.jpg" alt="avatr" class="avatr" />
            <div class="main-comment">
              <p class="comment-time">{{ item.addTime }}</p>
              <p class="comment-content">
                {{ item.msgContent }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { getMessageList, addMessage } from "@/api/message.js";

export default {
  setup() {
    const state = reactive({
      currentPage: 1,
      pageSize: 8,
      messageList: [],
      loading: false,
      msgContent: "",
      isMore: true
    });

    // 获取留言
    function getMessage() {
      getMessageList({
        currentPage: state.currentPage,
        pageSize: state.pageSize,
      }).then((data) => {
        state.messageList.push(...data.messageList);

        if (data.messageList.length < state.pageSize) {
          state.isMore = false;
        }
      }).catch(() => {
        state.isMore = false;
      });
    }

    // 提交留言
    function sendMessage() {
      if (!state.msgContent) {
        ElMessage({
          message: "请先输入内容",
          type: "warning",
          duration: 2 * 1000,
        });
      } else {
        state.loading = true;

        addMessage({ msgContent: state.msgContent })
          .then(() => {
            state.loading = false;
            state.msgContent = "";

            ElMessage({
              message: "提交成功，审核中...",
              type: "success",
              duration: 2 * 1000,
            });
          })
          .catch(() => {
            state.loading = false;
          });
      }
    }

    // 滚动加载留言
    function scrollHandler(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      
      // scrollTop + clientHeight = scrollHeight 时，滚动到底部
      if (scrollTop + clientHeight + 60 >= scrollHeight && state.isMore) {
        state.currentPage++;
        getMessage();
      }
    }

    getMessage();

    return {
      ...toRefs(state),
      sendMessage,
      scrollHandler,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: calc(100vh - 110px);
  animation: main-ani 0.6s linear 0s 1 forwards;

  .header {
    padding: 10px;
    background: #fff;
    text-align: left;

    h4 {
      text-align: center;
      font-size: 40px;
      line-height: 80px;
      color: #000;
    }

    h6 {
      text-align: center;
      font-size: 20px;
      line-height: 40px;
      color: #808080;
    }

    .textarea {
      overflow: hidden;
      margin: 0 auto;
      padding: 10px;
      width: 100%;
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
  }

  .message-list {
    margin-top: 20px;
    background: #fff;
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

.scroll {
  overflow: auto;
  min-height: calc(100vh - 385px - 150px);
  max-height: 600px;

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

.comment-list {
  margin: 0 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;

  .parent-comment {
    display: flex;
    margin: 10px 0;
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
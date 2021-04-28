<template>
  <div class="container">
    <h4 class="title">MD5在线加密</h4>
    <div class="md5">
      <textarea
        id="crypto"
        placeholder="请输入您需要加密的内容"
        maxlength="200"
        class="textarea"
        v-model="decryStr"
      ></textarea>
      <div class="btn-list">
        <el-button type="primary" :loading="loading" @click="encryHandler"
          >加密</el-button
        >
        <el-button type="primary" @click="clearEncry">清空</el-button>
      </div>
      <textarea
        id="cryptos"
        placeholder="加密后的字符串"
        maxlength="200"
        class="textarea"
        readonly
        :value="encryStr"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import CryptoJS from "crypto-js";
import messageQueue from "@/untils/messageQueue";

export default {
  setup() {
    /**
     * @description 需要加密的字符串
     */
    const decryStr = ref("");

    /**
     * @description 加密后的字符串
     */
    const encryStr = ref("");

    /**
     * @description 用来表示是否在加密中
     */
    const loading = ref(false);

    /**
     * @description 使用md5加密字符串
     */
    function encryHandler() {
      if (decryStr.value === "") {
        messageQueue("请先输入您要加密的内容", "warning");
        return;
      }

      if (loading.value) {
        messageQueue("加密中...", "warning");
        return;
      }

      loading.value = true;
      encryStr.value = CryptoJS.MD5(encryStr.value).toString();

      loading.value = false;
    }

    /**
     * @description 清空加密框内容
     */
    function clearEncry() {
        decryStr.value = '';
        encryStr.value = '';
    }

    return {
      decryStr,
      encryStr,
      loading,
      encryHandler,
      clearEncry
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  width: 100%;
  height: 1305px;
  box-sizing: border-box;
  background: #fff;
  animation: main-ani 0.6s linear 0s 1 forwards;

  .title {
    height: 40px;
    font-size: 24px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    text-align: left;
  }

  .md5 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;

    .textarea {
      overflow: hidden;
      padding: 10px;
      width: 40%;
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
}
</style>
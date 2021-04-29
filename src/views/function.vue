/* eslint-disable no-unused-vars */
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
        placeholder="加密后的字符串"
        maxlength="200"
        class="textarea"
        readonly
        :value="encryStr"
      ></textarea>
    </div>
    <h4 class="title">进制转换</h4>
    <div class="md5">
      <textarea
        placeholder="请输入您需要转换的内容"
        maxlength="200"
        class="textarea"
        v-model="toConvert"
      ></textarea>
      <div class="convert">
        <el-select
          v-model="numType"
          filterable
          placeholder="请选择转换类型"
          @change="changeType"
        >
          <el-option
            v-for="item in type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="btn-list">
          <el-button type="primary" @click="convertHandler">转换</el-button>
          <el-button type="primary" @click="clearConvert">清空</el-button>
        </div>
      </div>
      <textarea
        placeholder="转换后的内容"
        maxlength="200"
        class="textarea"
        readonly
        :value="convertTo"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
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
      decryStr.value = "";
      encryStr.value = "";
    }

    const state = reactive({
      toConvert: "", // 要转换的内容
      convertTo: "", // 转换后的内容
      numType: 0,
      type: [
        {
          label: "十进制转换为二进制",
          value: 0,
        },
        {
          label: "十进制转换为八进制",
          value: 1,
        },
        {
          label: "十进制转换为十六进制",
          value: 2,
        },
        {
          label: "二进制转换为十进制",
          value: 3,
        },
        {
          label: "二进制转换为八进制",
          value: 4,
        },
        {
          label: "二进制转换为十六进制",
          value: 5,
        },
        {
          label: "八进制转换为二进制",
          value: 6,
        },
        {
          label: "八进制转换为十进制",
          value: 7,
        },
        {
          label: "八进制转换为十六进制",
          value: 8,
        },
        {
          label: "十六进制转换为二进制",
          value: 9,
        },
        {
          label: "十六进制转换为八进制",
          value: 10,
        },
        {
          label: "十六进制转换为十进制",
          value: 11,
        },
      ],
    });

    /**
     * @description 切换转换类型
     */
    function changeType(numType) {
      state.numType = numType;
    }

    /**
     * @description 转换进制
     */
    function convertHandler() {
      if (state.toConvert === "") {
        messageQueue("请先输入您要转换的内容", "warning");
        return;
      }

      if (state.numType <= 2) {
        // 十进制转换为其他进制
        const num = Number(state.toConvert);

        if (isNaN(num)) {
          messageQueue("请输入正确的十进制数！", "warning");
          state.toConvert = "";
          return;
        }

        const decimal = backDecimalType(state.numType);
        state.convertTo = num.toString(decimal);
      } else if (state.numType <= 5) {
        // 二进制转换
        const regExp = /^[01]+$/;

        if (regExp.test(state.toConvert)) {
          const decimal = backDecimalType(state.numType);

          // parseInt(state.toConvert, 2)先将这个二进制数转换为十进制
          state.convertTo = parseInt(state.toConvert, 2).toString(decimal);
        } else {
          messageQueue("请输入正确的二进制数！", "warning");
          state.toConvert = "";
          return;
        }
      } else if (state.numType <= 8) {
        // 八进制转换
        const regExp = /^[01234567]+$/;

        if (regExp.test(state.toConvert)) {
          const decimal = backDecimalType(state.numType);
          state.convertTo = parseInt(state.toConvert, 8).toString(decimal);
        } else {
          messageQueue("请输入正确的八进制数！", "warning");
          state.toConvert = "";
          return;
        }
      } else {
        // 十六进制转换
        const regExp = /^[0123456789aAbBcCdDeEfF]+$/;

        if (regExp.test(state.toConvert)) {
          const decimal = backDecimalType(state.numType);
          state.convertTo = parseInt(state.toConvert, 16).toString(decimal);
        } else {
          messageQueue("请输入正确的十六进制数！", "warning");
          state.toConvert = "";
          return;
        }
      }
    }

    /**
     * @description 清空转换内容
     */
    function clearConvert() {
      state.convertTo = "";
      state.toConvert = "";
    }

    return {
      decryStr,
      encryStr,
      loading,
      encryHandler,
      clearEncry,
      ...toRefs(state),
      changeType,
      convertHandler,
      clearConvert,
    };
  },
};

/**
 * @description 返回要转换为的进制，例如要转换为二进制则返回2
 * @param {number} type
 * @returns {number}
 */
function backDecimalType(type) {
  let decimal = 2;

  switch (type) {
    case 0:
    case 6:
    case 9:
      decimal = 2;
      break;
    case 1:
    case 4:
    case 10:
      decimal = 8;
      break;
    case 2:
    case 5:
    case 8:
      decimal = 16;
      break;
    default:
      decimal = 10;
      break;
  }

  return decimal;
}
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

.convert {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 10px;
  height: 200px;
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
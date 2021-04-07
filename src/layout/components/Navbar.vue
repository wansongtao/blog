<template>
  <div class="header">
    <div class="content">
      <img src="@/assets/images/bloglogo.png" alt="logo" class="logo" @click="jumpPage('/', -1)" />
      <div class="nav">
        <div
          class="nav-item"
          :class="{'active-item': activeIndex === -1}"
          @click="jumpPage('/', -1)"
        >
          首页
          <div class="line" :class="{'active-line': activeIndex === -1}" />
        </div>
        <div
          class="nav-item"
          :class="{'active-item': activeIndex === index}"
          v-for="(item, index) in menuList"
          :key="index"
          @click="jumpPage(item.path, index)"
        >
          {{ item.title || "" }}
          <div class="line" :class="{'active-line': activeIndex === index}" />
        </div>
      </div>
      <img src="@/assets/images/chutian.jpg" alt="icon" class="chutian" @click="jumpPage('/', -1)" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import menu from "@/hooks/menu.js";

export default defineComponent({
  setup() {
    const activeIndex = ref(0);

    // 获取要显示的菜单列表
    const menuList = menu();

    // 跳转页面
    const router = useRouter();
    function jumpPage(path, index) {
      activeIndex.value = index || 0;
      router.push(path);
    }

    return {
      menuList,
      jumpPage,
      activeIndex
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 70%;
    height: 70px;

    img {
      display: block;
      outline: none;
      border: none;
      cursor: pointer;
    }

    .logo {
      width: 120px;
      height: 60px;
    }

    .nav {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .nav-item {
        position: relative;
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        font-size: 18px;

        &:hover {
          color: #6bc30d;
          transition: all 1s ease-in-out;
        }

        &:hover div {
          background: #6bc30d;
          transform: scale(1);
          transition: all 1s ease-in-out;
        }
      }

      .active-item {
        color: #6bc30d;
      }
    }

    .chutian {
      margin-left: 60px;
      width: 60px;
      height: 60px;
    }
  }
}

.line {
  position: absolute;
  bottom: -3px;
  left: 15%;
  margin: 0 auto;
  width: 70%;
  height: 2px;
  background: transparent;
  transform: scale(0.1);
}

.active-line {
  background: #6bc30d;
  transform: scale(1);
}
</style>
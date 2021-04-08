<template>
  <div class="header">
    <div class="content">
      <img src="@/assets/images/bloglogo.png" alt="logo" class="logo" @click="jumpPage('/', -1)" />
      <div class="nav">
        <div
          class="nav-item"
          @click="jumpPage('/')"
        >
          首页
          <div class="line" />
        </div>
        <div
          class="nav-item"
          :class="{'active-item': item.path === currPath}"
          v-for="(item, index) in menuList"
          :key="index"
          @click="jumpPage(item.path)"
        >
          {{ item.title || "" }}
          <div class="line" :class="{'active-line': item.path === currPath}" />
        </div>
      </div>
      <img src="@/assets/images/chutian.jpg" alt="icon" class="chutian" @click="jumpPage('/')" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import menu from "@/hooks/menu.js";

export default defineComponent({
  setup() {
    // 获取要显示的菜单列表
    const menuList = menu();

    // 跳转页面
    const router = useRouter();
    function jumpPage(path) {
      router.push(path);
    }

    const route = useRoute();

    const currPath = computed(() => {
      return route.path;
    });

    return {
      menuList,
      jumpPage,
      currPath
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  background: #fff;
  box-shadow: 0 0 4px 0 rgb(209, 206, 206);

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
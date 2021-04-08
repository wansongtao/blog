<template>
  <router-view />
</template>

<style lang="scss">
@import url("~@/assets/styles/iconfont.css");
html,
body,
ul,
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

body {
  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
    background: rgba(128, 128, 128, 0.2);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
  }

  /* 滚动条滑块 */
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #5c5b5a;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  }
}

#app {
  font-family: "KaiTi", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 18px;
}
</style>

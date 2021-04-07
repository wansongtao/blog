<template>
  <div class="container">
    <Navbar />
    <div class="main-box">
      <AppMain />
      <Sidebar />
    </div>
    <FooterBeiAn />
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import FooterBeiAn from "@/components/footerBeiAn.vue";

export default {
  components: {
    Navbar,
    Sidebar,
    AppMain,
    FooterBeiAn,
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background: url("../assets/images/article1.jpg") no-repeat center center;
  background-attachment: fixed;
  background-size: cover;
  background-color: transparent;

  .main-box {
    display: flex;
    justify-content: space-between;
    padding-top: 90px;
    padding-bottom: 20px;
    margin: 0 auto;
    width: 70%;
    min-height: calc(100vh - 110px - 43px);
  }
}
</style>
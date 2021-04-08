<template>
  <section class="focus">
    <router-view :key="key" />
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.focus {
  margin-right: 20px;
  width: calc(70% - 20px);
}
</style>
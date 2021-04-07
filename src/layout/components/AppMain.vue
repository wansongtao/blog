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
  flex: 1 1 auto;
}
</style>
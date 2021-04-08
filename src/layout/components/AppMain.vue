<template>
  <section class="focus">
    <router-view :key="key" />
  </section>
</template>

<script>
import { computed } from 'vue';
import {useRoute} from 'vue-router';

export default {
  name: "AppMain",
  setup() {
    const route = useRoute();

    const key = computed(() => {
      return route.path;
    });

    return {
      key
    };
  }
};
</script>

<style lang="scss" scoped>
.focus {
  margin-right: 20px;
  width: calc(70% - 20px);
}
</style>
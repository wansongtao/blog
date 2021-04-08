<template>
  <div>about</div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.container {
  animation: main-ani 0.6s linear 0s 1 forwards;
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
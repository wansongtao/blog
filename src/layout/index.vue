<template>
  <Navbar />
  <div>
      <AppMain />
      <Sidebar />
  </div>
</template>

<script>
import {Navbar, Sidebar, AppMain} from './components'
export default {
    components: {
        Navbar,
        Sidebar,
        AppMain
    }
}
</script>

<style>

</style>
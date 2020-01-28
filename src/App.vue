<template>
  <DefaultLayout>
    <transition name="fade" appear>
      <router-view />
    </transition>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '~/layouts/Default'

export default {
  components: {
      DefaultLayout,
  },
}
</script>

<style>
  .fade-enter-active {
    transition: opacity .5s;
  }

  .fade-enter {
    opacity: 0;
  }
</style>

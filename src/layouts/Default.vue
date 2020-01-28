<template>
  <div class="text-gray-900 text-lg leading-loose">
    <MattHeader />
    <slot/>
    <MattFooter />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import MattHeader from './partials/Header'
import MattFooter from './partials/Footer'

export default {
  components: {
    MattHeader,
    MattFooter,
  },
}
</script>

<style>
  h1 {
    @apply text-4xl;
  }
  a {
    @apply text-blue-500;
  }
  p {
    @apply mb-4;
  }
</style>

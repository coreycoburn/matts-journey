<template>
  <div class="flex flex-col text-gray-900 text-lg leading-loose min-h-screen">
    <MattHeader />
    <div class="flex-1">
      <slot/>
    </div>
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
  h2 {
    @apply text-2xl;
  }
  a {
    @apply text-blue-500;
  }
  p {
    @apply mb-4;
  }
  .button {
    @apply bg-blue-200 shadow text-gray-100 uppercase text-xl font-bold rounded-full px-8 py-2;
  }
  .button:hover {
    @apply bg-blue-300;
  }
</style>

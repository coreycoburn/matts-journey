<template>
  <div class="flex flex-col text-gray-900 text-lg leading-loose min-h-screen">
    <MattHeader />
    <div class="flex-1">
      <slot/>
    </div>
    <MattFooter />
    <div :class="{ processing: processing }" class="flex justify-center items-center">Processing...</div>
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
import { mapState } from 'vuex'

export default {
  components: {
    MattHeader,
    MattFooter,
  },
  computed: {
    ...mapState({
      processing: state => state.processing,
    }),
  },
}
</script>

<style>
  h2 {
    @apply text-3xl;
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
  .processing {
    @apply fixed top-0 left-0 w-full h-full text-white text-3xl cursor-wait;
    z-index: 120;
    transform: translate3d(0, 0, 0);
    background-color: black;
    background-color: rgba(0, 0, 0, 0.8);
  }
</style>

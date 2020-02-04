<template>
  <button @click="toggle" class="button">
    <slot />
  </button>
</template>

<script>
import { mapMutations } from "vuex"

export default {
  props: {
    reference: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapMutations({
      toggle(commit) {
        commit(`${this.reference}Toggle`)
      },
    }),
  },
}
</script>

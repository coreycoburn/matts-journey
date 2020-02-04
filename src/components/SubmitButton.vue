<template>
  <button class="button" :disabled="invalid" :class="{ 'cursor-not-allowed': invalid }">
    <slot>Submit</slot>
  </button>
</template>

<script>
export default {
  props: {
    invalid: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

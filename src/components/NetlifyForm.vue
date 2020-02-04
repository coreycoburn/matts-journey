<template>
  <form @submit.prevent="submit" :ref="reference" method="post" :name="reference" :action="target" class="leading-tight mb-4" netlify data-netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" :value="reference" />
    <slot />
  </form>
</template>

<script>
import SubmitButton from './SubmitButton'

export default {
  props: {
    reference: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
  },
  components: {
    SubmitButton,
  },
  methods: {
    submit() {
      console.log('submit from netlify form...')

      this.$refs.contact.submit()
    },
  },
}
</script>

<template>
  <div class="container mx-auto max-w-2xl px-6 md:px-0">
    <h1 class="text-3xl md:text-4xl">Contact Event Coordinators</h1>
    <p>
      If you have questions or for more information you may fill out the following form, send an email or call one of the event coordinators for the {{ $static.metadata.eventName }} event.
    </p>
    <div class="mb-4">
      <h2>Coordinator Contact Info</h2>
      <ul>
        <li>Email: <a :href="`mailto:${$static.metadata.email}`" v-text="$static.metadata.email" /></li>
        <li><strong>Lisa Tarner:</strong> 707-227-6095</li>
        <li><strong>Diane Bishofberger:</strong> 707-227-2234</li>
        <li><strong>Ruth Appleby:</strong> 707-227-6123</li>
      </ul>
    </div>
    <form @submit.prevent="submit" ref="contact" method="post" name="contact" action="/thanks" class="mb-8" netlify data-netlify-honeypot="bot-field">
      <input type="hidden" name="form-name" value="contact" />
      <div>
        <label for="name" class="text-base">Name:</label>
        <input v-model="form.name" type="text" id="name" name="name" placeholder="Full Name" class="w-full px-4 py-2 text-base appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
      </div>
      <div>
        <label for="phone" class="text-base">Phone:</label>
        <input v-model="form.phone" v-mask="'(###) ###-####'" type="text" id="phone" name="phone" placeholder="Phone" class="w-full px-4 py-2 text-base appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
      </div>
      <div>
        <label for="email" class="text-base">
          Email:
          <span class="text-xs text-red-700" v-if="!$v.form.email.required">required</span>
          <span class="text-xs text-red-700" v-if="!$v.form.email.email">must be an email</span>
        </label>
        <input v-model="form.email" type="text" id="email" name="email" placeholder="Email" class="w-full px-4 py-2 text-base appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
      </div>
      <div>
        <label for="message" class="text-base">
          Message:
          <span class="text-xs text-red-700" v-if="!$v.form.message.required">required</span>
          <span class="text-xs text-red-700" v-if="!$v.form.message.minLength">please enter longer message</span>
        </label>
        <textarea v-model="form.message" id="message" name="message" placeholder="Please let us know any questions you have" class="w-full px-4 py-2 text-base appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" />
      </div>
      <div class="flex justify-center">
        <SubmitButton :invalid="$v.$invalid" />
      </div>
    </form>
  </div>
</template>

<static-query>
query {
  metadata {
    email,
    eventName,
  }
}
</static-query>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import SubmitButton from '~/components/SubmitButton'

export default {
  metaInfo: {
    title: 'Contact',
  },
  components: {
    SubmitButton,
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        message: '',
      },
    }
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      message: {
        required,
        minLength: minLength(20),
      },
    },
  },
  methods: {
    submit() {
      this.$refs.contact.submit()
    },
  },
}
</script>

<template>
  <div>
    <Dialog :reference="reference" title="Sponsor Event">
      <transition name="fade">
        <form v-if="formShow" @submit.prevent="">
          <p class="text-xs">
            All required form fields must be filled out to sponsor the {{ $static.metadata.eventName }} event.
          </p>
          <div class="leading-tight">
            <div class="mb-2">
              <label for="company" class="text-sm">Company:</label>
              <input v-model="form.company" type="text" id="company" name="company" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg">
            </div>
            <div class="flex flex-col mb-2 md:flex-row">
              <div class="w-full mb-2 md:w-1/2 md:mb-0 md:mr-3">
                <label for="firstName" class="text-sm">First Name: <span class="text-xs text-red-700" v-if="!$v.form.firstName.required">required</span></label>
                <input v-model="form.firstName" type="text" id="firstName" name="firstName" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
              </div>
              <div class="w-full md:w-1/2">
                <label for="lastName" class="text-sm">Last Name: <span class="text-xs text-red-700" v-if="!$v.form.lastName.required">required</span></label>
                <input v-model="form.lastName" type="text" id="lastName" name="lastName" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
              </div>
            </div>
            <div class="flex flex-col mb-2 md:flex-row">
              <div class="w-full mb-4 md:w-1/2 md:mb-0 md:mr-3">
                <label for="phone" class="text-sm">
                  Phone:
                  <span class="text-xs text-red-700" v-if="!$v.form.phone.required">required</span>
                  <span class="text-xs text-red-700" v-if="!$v.form.phone.minLength">must be valid, 10 digit phone</span>
                </label>
                <input v-model="form.phone" v-mask="'##########'" placeholder="7071234567" type="text" id="phone" name="phone" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
              </div>
              <div class="w-full md:w-1/2">
                <label for="email" class="text-sm">
                  Email:
                  <span class="text-xs text-red-700" v-if="!$v.form.email.required">required</span>
                  <span class="text-xs text-red-700" v-if="!$v.form.email.email">must be an email</span>
                </label>
                <input v-model="form.email" type="text" id="email" name="email" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
              </div>
            </div>
          </div>
          <p>Please choose sponsorship level:</p>
        </form>
        <div v-else>
          <p class="text-xs text-red-500 text-center">
            To update the payment details already entered, refresh the page.
          </p>
        </div>
      </transition>
    </Dialog>
    <DialogButton :reference="reference">
      Sponsor Event
    </DialogButton>
  </div>
</template>

<static-query>
query {
  metadata {
    eventName,
  }
}
</static-query>

<script>
import { mapState } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
import Dialog from './Dialog'
import DialogButton from './DialogButton'

export default {
  props: {
    reference: {
      type: String,
      required: true,
    },
  },
  components: {
    Dialog,
    DialogButton,
  },
  data() {
    return {
      form: {
        company: 'Acme',
        firstName: 'Lauren',
        lastName: 'Coburn',
        phone: '4157172722',
        email: 'laurencathryn@gmail.com',
      },
    }
  },
  validations: {
    form: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      phone: {
        required,
        minLength: minLength(10),
      },
      email: {
        required,
        email,
      },
    },
  },
  computed: {
    ...mapState({
      formShow: state => state.formShow,
    }),
  },
}
</script>

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
            <div class="flex flex-col mb-4 md:flex-row">
              <div class="w-full mb-2 md:w-1/2 md:mb-0 md:mr-3">
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
            <div class="mb-8">
              <p class="mb-2">Please choose sponsorship level:</p>
              <div class="text-xs mb-2 text-red-700" v-if="!$v.form.level.required">a sponsorship level is required</div>
              <div class="flex flex-col mb-2 md:flex-row mb-2 text-base">
                <div class="w-full mb-2 md:w-1/2 md:mb-0 md:mr-3">
                  <label class="inline-flex items-center">
                    <input v-model="level" type="radio" class="form-radio text-blue-300 bg-gray-200 border-gray-500" name="level" value="Grand Slam">
                    <span class="ml-2">$5,000 - Grand Slam</span>
                  </label>
                </div>
                <div class="w-full mb-2 md:w-1/2 md:mb-0">
                  <label class="inline-flex items-center">
                    <input v-model="level" type="radio" class="form-radio text-blue-300 bg-gray-200 border-gray-500" name="level" value="Home Run">
                    <span class="ml-2">$2,500 - Home Run</span>
                  </label>
                </div>
              </div>
              <div class="flex flex-col mb-2 md:flex-row mb-2 text-base">
                <div class="w-full mb-2 md:w-1/2 md:mb-0 md:mr-3">
                  <label class="inline-flex items-center">
                    <input v-model="level" type="radio" class="form-radio text-blue-300 bg-gray-200 border-gray-500" name="level" value="Triple">
                    <span class="ml-2">$1,500 - Triple</span>
                  </label>
                </div>
                <div class="w-full mb-2 md:w-1/2 md:mb-0">
                  <label class="inline-flex items-center">
                    <input v-model="level" type="radio" class="form-radio text-blue-300 bg-gray-200 border-gray-500" name="level" value="Double">
                    <span class="ml-2">$1,000 - Double</span>
                  </label>
                </div>
              </div>
              <div class="text-base">
                <label class="inline-flex items-center">
                  <input v-model="level" type="radio" class="form-radio text-blue-300 bg-gray-200 border-gray-500" name="level" value="Base Hit">
                  <span class="ml-2">$500 - Base Hit</span>
                </label>
              </div>
            </div>
          </div>
        </form>
        <div v-else>
          <p class="text-xs text-red-500 text-center">
            To update the payment details already entered, refresh the page.
          </p>
        </div>
      </transition>
      <Paypal @clear="clear" @contentful-entry="contentfulEntry" v-model="form" :reference="reference" :contentful-fields="contentfulFields" :message="message" :errors="$v.$invalid" />
      <template #footer>
        <div class="flex bg-blue-500 text-gray-100 text-sm px-6 py-3">
          <div class="flex-1" v-text="footerName" />
          <div class="flex-end" v-text="footerAmount" />
        </div>
      </template>
    </Dialog>
    <DialogButton :reference="reference">
      Sponsor Event
    </DialogButton>
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
import { mapState } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
import Dialog from './Dialog'
import DialogButton from './DialogButton'
import Paypal from './Paypal'

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
    Paypal,
  },
  data() {
    return {
      form: {
        company: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        level: '',
        amount: 0,
      },
      levelType: '',
      contentfulFields: {},
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
      level: {
        required,
      },
    },
  },
  computed: {
    ...mapState({
      formShow: state => state.formShow,
    }),
    level: {
      get() {
        return this.levelType || ''
      },
      set(value) {
        const levels = {
          'Grand Slam': 5000,
          'Home Run': 2500,
          'Triple': 1500,
          'Double': 1000,
          'Base Hit': 500,
        }
        this.form.level = value
        this.form.amount = levels[value]
      }
    },
    footerName() {
      return this.form.level || 'Pick a sponsorship level'
    },
    footerAmount() {
      return this.form.amount ? `$${this.form.amount.toLocaleString()}` : '$0.00'
    },
    message() {
      return {
        success: `Thank you for your sponsoring ${this.$static.metadata.eventName} in benefit of Matt Appleby. Your generosity is greatly appreciated. Please email your logo / display name to <a href="mailto:${this.$static.metadata.email}">${this.$static.metadata.email}</a>.`,
        error: `Your sponsorship payment was successful but your details were not logged to our database. Please email <a href="mailto:${this.$static.metadata.email}">${this.$static.metadata.email}</a>`,
      }
    },
  },
  methods: {
    clear() {
      this.form.company = ''
      this.form.firstName = ''
      this.form.lastName = ''
      this.form.phone = ''
      this.form.email = ''
      this.form.level = ''
      this.form.amount = 0
    },
    contentfulEntry(response) {
      this.contentfulFields = {
        company: {
          'en-US': this.form.company,
        },
        name: {
          'en-US': `${this.form.firstName} ${this.form.lastName}`,
        },
        phone: {
          'en-US': this.form.phone,
        },
        email: {
          'en-US': this.form.email,
        },
        address: {
          'en-US': response.purchase_units[0].shipping.address.address_line_1,
        },
        address2: {
          'en-US': response.purchase_units[0].shipping.address.hasOwnProperty('address_line_2')
            ? response.purchase_units[0].shipping.address.address_line_2 : '',
        },
        city: {
          'en-US': response.purchase_units[0].shipping.address.admin_area_2,
        },
        state: {
          'en-US': response.purchase_units[0].shipping.address.admin_area_1,
        },
        zip: {
          'en-US': response.purchase_units[0].shipping.address.postal_code,
        },
        level: {
          'en-US': this.form.level,
        },
        amount: {
          'en-US': parseFloat(response.purchase_units[0].amount.value),
        },
        payerId: {
          'en-US': response.payer.payer_id,
        },
        paymentId: {
          'en-US': response.id
        },
        createdTime: {
          'en-US': new Date(response.create_time),
        },
      }
    }
  },
}
</script>

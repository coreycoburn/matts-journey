<template>
  <div>
    <Dialog :reference="reference" title="Donate to Matt">
      <transition name="fade">
        <form v-if="formShow" @submit.prevent="">
          <p class="text-xs">
            All required form fields must be filled out to make a donation.
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
            <div class="w-full">
              <label for="message" class="text-sm">Message for Matt:</label>
              <textarea v-model="form.message" placeholder="Feel free to write a message to Matt here..." id="message" name="message"  class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" />
            </div>
          </div>
          <p>How much would you like to donate?</p>
          <div class="flex flex-wrap justify-around mb-6">
            <button @click="updateAmount(20)" :class="amountActive(20)" class="bg-blue-200 shadow text-gray-100 uppercase text-sm font-bold rounded-lg px-4 py-1 mb-6 hover:bg-blue-300 md:mb-0">$20</button>
            <button @click="updateAmount(50)" :class="amountActive(50)" class="bg-blue-200 shadow text-gray-100 uppercase text-sm font-bold rounded-lg px-4 py-1 mb-6 hover:bg-blue-300 md:mb-0">$50</button>
            <button @click="updateAmount(100)" :class="amountActive(100)" class="bg-blue-200 shadow text-gray-100 uppercase text-sm font-bold rounded-lg px-4 py-1 mb-6 hover:bg-blue-300 md:mb-0">$100</button>
            <button @click="updateAmount(250)" :class="amountActive(250)" class="bg-blue-200 shadow text-gray-100 uppercase text-sm font-bold rounded-lg px-4 py-1 mb-6 hover:bg-blue-300 md:mb-0">$250</button>
            <button @click="otherAmount()" :class="amountActive('other')" class="bg-blue-200 shadow text-gray-100 uppercase text-sm font-bold rounded-lg px-4 py-1 mb-6 hover:bg-blue-300 md:mb-0">Other</button>
          </div>
          <div v-show="otherAmountShow" class="flex items-end mb-12">
            <div class="mr-3">
              <label for="cash-donation-amount" class="text-sm font-bold">Amount: $</label>
            </div>
            <div>
              <CurrencyInput
                v-model="form.amount"
                :currency="null"
                locale="en"
                :allow-negative="false"
                id="cash-donation-amount"
                name="cash-donation-amount"
                placeholder="0.00"
                class="w-full px-2 text-sm appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true"
              />
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
          <div class="flex-1">Donate</div>
          <div class="flex-end" v-text="footerAmount" />
        </div>
      </template>
    </Dialog>
    <DialogButton :reference="reference">
      Make Cash Donation
    </DialogButton>
  </div>
</template>

<static-query>
query {
  metadata {
    email,
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
    CurrencyInput: () =>
      import ('vue-currency-input')
        .then(m => m.CurrencyInput)
        .catch(),
  },
  data() {
    return {
      form: {
        company: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
        amount: 0,
      },
      otherAmountShow: false,
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
    },
  },
  computed: {
    ...mapState({
      formShow: state => state.formShow,
    }),
    footerAmount() {
      return this.form.amount ? `$${this.form.amount.toFixed(2)}` : '$0.00'
    },
    message() {
      return {
        success: 'Thank you for your donation. Your generosity will help Matt continue his treatments and ease the burden caused by the expenses.',
        error: `Your donation payment was successful but your details were not logged to our database. Please email <a href="mailto:${this.$static.metadata.email}">${this.$static.metadata.email}</a>`,
      }
    },
  },
  methods: {
    updateAmount(amount) {
      this.form.amount = amount
      this.otherAmountShow = false
    },
    otherAmount() {
      this.otherAmountShow = true
      this.form.amount = 0
    },
    amountActive(amount) {
      return (amount === this.form.amount || (this.otherAmountShow && amount === 'other')) ? 'bg-blue-500 hover:bg-blue-500' : ''
    },
    clear() {
      this.form.company = ''
      this.form.firstName = ''
      this.form.lastName = ''
      this.form.phone = ''
      this.form.email = ''
      this.form.message = ''
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
        specialMessage: {
          'en-US': this.form.message,
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

<template>
  <div>
    <VDialog :showing="cashDonationDialog" @change="donationToggle" transition="slide-up" bg-transition="fade" noScroll :classes="{ content: 'w-full md:w-1/3 rounded-lg' }">
      <div class="p-6">
        <div class="flex">
          <h2 class="flex-1">Donate to Matt</h2>
          <div class="flex-end">
            <button @click="donationToggle" aria-label="close">&times;</button>
          </div>
        </div>
        <div class="leading-tight">
          <div class="mb-2">
            <label for="company" class="text-sm">Company:</label>
            <input v-model="form.company" type="text" id="company" name="company" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg">
          </div>
          <div class="flex mb-2">
            <div class="w-1/2 mr-3">
              <label for="firstName" class="text-sm">First Name: <span class="text-xs text-red-700" v-if="!$v.form.firstName.required">required</span></label>
              <input v-model="form.firstName" type="text" id="firstName" name="firstName" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
            </div>
            <div class="w-1/2">
              <label for="lastName" class="text-sm">Last Name: <span class="text-xs text-red-700" v-if="!$v.form.lastName.required">required</span></label>
              <input v-model="form.lastName" type="text" id="lastName" name="lastName" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
            </div>
          </div>

          <div class="flex mb-2">
            <div class="w-1/2 mr-3">
              <label for="phone" class="text-sm">
                Phone:
                <span class="text-xs text-red-700" v-if="!$v.form.phone.required">required</span>
                <span class="text-xs text-red-700" v-if="!$v.form.phone.minLength">must be valid, 10 digit phone</span>
              </label>
              <input v-model="form.phone" v-mask="'##########'" placeholder="707123456" type="text" id="phone" name="phone" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
            </div>
            <div class="w-1/2">
              <label for="email" class="text-sm">
                Email:
                <span class="text-xs text-red-700" v-if="!$v.form.email.required">required</span>
                <span class="text-xs text-red-700" v-if="!$v.form.email.email">must be an email</span>
              </label>
              <input v-model="form.email" type="text" id="email" name="email" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
            </div>
          </div>
        </div>
        <p>How much would you like to donate?</p>
        <div class="flex flex-wrap justify-around mb-6">
          <button @click="updatePrice(20)" :class="priceActive(20)" class="bg-blue-200 shadow text-gray-100 uppercase text-sm font-bold rounded-lg px-4 py-1 mb-6 hover:bg-blue-300 md:mb-0">$20</button>
          <button @click="updatePrice(50)" :class="priceActive(50)" class="bg-blue-200 shadow text-gray-100 uppercase text-sm font-bold rounded-lg px-4 py-1 mb-6 hover:bg-blue-300 md:mb-0">$50</button>
          <button @click="updatePrice(100)" :class="priceActive(100)" class="bg-blue-200 shadow text-gray-100 uppercase text-sm font-bold rounded-lg px-4 py-1 mb-6 hover:bg-blue-300 md:mb-0">$100</button>
          <button @click="updatePrice(250)" :class="priceActive(250)" class="bg-blue-200 shadow text-gray-100 uppercase text-sm font-bold rounded-lg px-4 py-1 mb-6 hover:bg-blue-300 md:mb-0">$250</button>
          <button @click="otherAmount()" :class="priceActive('other')" class="bg-blue-200 shadow text-gray-100 uppercase text-sm font-bold rounded-lg px-4 py-1 mb-6 hover:bg-blue-300 md:mb-0">Other</button>
        </div>
        <div v-show="otherAmountShow" class="flex items-end mb-12">
          <div class="mr-3">
            <label for="donation-amount" class="text-sm font-bold">Amount: $</label>
          </div>
          <div>
            <ClientOnly>
              <CurrencyInput
                v-model="form.price"
                :currency="null"
                locale="en"
                :allow-negative="false"
                id="donation-amount"
                name="donation-amount"
                placeholder="0.00"
                class="w-full px-2 text-sm appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true"
              />
            </ClientOnly>
          </div>
        </div>
        <Paypal v-model="form" reference="donation" :errors="$v.$invalid" />
      </div>
      <div class="flex bg-blue-500 text-gray-100 text-sm px-6 py-3">
        <div class="flex-1">Donate</div>
        <div class="flex-end" v-text="footerPrice" />
      </div>
    </VDialog>
    <button @click="donationToggle" class="button">
      Make Cash Donation
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { VDialog } from 'vuetensils'
import Paypal from './Paypal'

export default {
  components: {
    VDialog,
    Paypal,
    CurrencyInput: () =>
      import ('vue-currency-input')
        .then(m => m.CurrencyInput)
        .catch(),
  },
  data() {
    return {
      form: {
        price: 0,
        company: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
      },
      otherAmountShow: false,
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
      cashDonationDialog: state => state.donationDialogShow
    }),
    footerPrice() {
      return this.form.price ? `$${this.form.price.toFixed(2)}` : '$0.00'
    },
  },
  methods: {
    ...mapMutations({
      donationToggle: 'donationToggle',
    }),
    updatePrice(price) {
      this.form.price = price
      this.otherAmountShow = false
    },
    otherAmount() {
      this.otherAmountShow = true
      this.form.price = 0
    },
    priceActive(amount) {
      return (amount === this.form.price || (this.otherAmountShow && amount === 'other')) ? 'bg-blue-500 hover:bg-blue-500' : ''
    },
  },
}
</script>

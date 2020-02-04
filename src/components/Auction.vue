<template>
  <div>
    <Dialog :reference="reference" title="Donate to Silent Auction">
      <p class="text-xs">
        All required form fields must be filled out to make a donation.
      </p>
      <Form @submit.prevent="submit" method="post" class="leading-tight mb-4">
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
        <div class="mb-2">
          <label for="address" class="text-sm">Address:</label>
          <input v-model="form.address" type="text" id="address" name="address" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg">
        </div>
        <div class="flex flex-col mb-2 md:flex-row">
          <div class="w-full mb-2 md:w-2/5 md:mb-0 md:mr-3">
            <label for="city" class="text-sm">City:</label>
            <input v-model="form.city" type="text" id="city" name="city" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
          </div>
          <div class="w-full md:w-2/5 md:mr-3">
            <label for="state" class="text-sm">State:</label>
            <input v-model="form.state" type="text" id="state" name="state" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
          </div>
          <div class="w-full md:w-1/5">
            <label for="zip" class="text-sm">Zip:</label>
            <input v-model="form.zip" type="text" id="zip" name="zip" class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true">
          </div>
        </div>
        <div class="w-full">
          <label for="description" class="text-sm">
            Description of Item:
            <span class="text-xs text-red-700" v-if="!$v.form.description.required">required</span>
            <span class="text-xs text-red-700" v-if="!$v.form.description.minLength">please enter longer description</span>
          </label>
          <textarea v-model="form.description" placeholder="Please write a detailed description of thisf item" id="description" name="description"  class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" />
        </div>
        <div class="w-full">
          <label for="restrictions" class="text-sm">Restrictions or Expiration:</label>
          <textarea v-model="form.restrictions" placeholder="Please describe any restrictions or expiration for this item" id="restrictions" name="restrictions"  class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" />
        </div>
        <div class="mb-4">
          <label for="auction-donation-amount" class="text-sm">
            Estimated Value of Item:
            <span class="text-xs text-red-700" v-if="!$v.form.estimatedValue.required">required</span>
          </label>
          <div class="flex items-center">
            <div class="mr-2">$</div>
            <CurrencyInput
              v-model="form.estimatedValue"
              :currency="null"
              locale="en"
              :allow-negative="false"
              id="auction-donation-amount"
              name="auction-donation-amount"
              placeholder="0.00"
              class="w-full px-2 text-sm leading-loose appearance-none border-2 border-gray-400 bg-gray-200 rounded-lg" aria-required="true"
            />
          </div>
        </div>
        <div class="text-center">
          <SubmitButton :invalid="$v.$invalid" />
        </div>
      </Form>
      <template #footer>
        <div class="flex bg-blue-500 text-gray-100 text-sm px-6 py-3">
          <div class="flex-1">Estimated Value</div>
          <div class="flex-end" v-text="footerPrice" />
        </div>
      </template>
    </Dialog>
    <DialogButton :reference="reference">
      Donate Auction Item
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
import { mapMutations } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
import Contentful from '~/mixins/contentful'
import Dialog from './Dialog'
import SubmitButton from './SubmitButton'
import DialogButton from './DialogButton'

export default {
  props: {
    reference: {
      type: String,
      required: true,
    },
  },
  mixins: [Contentful],
  components: {
    Dialog,
    SubmitButton,
    DialogButton,
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
        address: '',
        city: '',
        state: '',
        zip: '',
        description: '',
        restrictions: '',
        estimatedValue: 0,
      },
    }
  },
  computed: {
    footerPrice() {
      return this.form.estimatedValue ? `$${this.form.estimatedValue.toFixed(2)}` : '$0.00'
    },
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
      description: {
        required,
        minLength: minLength(40),
      },
      estimatedValue: {
        required,
      },
    },
  },
  methods: {
    ...mapMutations({
      processingToggle: 'processingToggle',
    }),
    submit() {
      this.processingToggle()
      this.submitToContentful({
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
          'en-US': this.form.address,
        },
        city: {
          'en-US': this.form.city,
        },
        state: {
          'en-US': this.form.state,
        },
        zip: {
          'en-US': this.form.zip,
        },
        description: {
          'en-US': this.form.description,
        },
        restrictions: {
          'en-US': this.form.restrictions,
        },
        estimatedValue: {
          'en-US': parseFloat(this.form.estimatedValue),
        },
        createdTime: {
          'en-US': new Date(),
        },
      }, {
        success: `Thank you for your auction donation item. Your generosity will greatly help raise funds at the ${this.$static.metadata.eventName} event. We will follow up with you in regards to your auction item.`,
        error: `There was a problem submitting your auction item. Please email <a href="mailto:${this.$static.metadata.email}">${this.$static.metadata.email}</a>`,
      })
    },
    clear() {
      this.form.company = ''
      this.form.firstName = ''
      this.form.lastName = ''
      this.form.phone = ''
      this.form.email = ''
      this.form.address = ''
      this.form.city = ''
      this.form.state = ''
      this.form.zip = ''
      this.form.description = ''
      this.form.restrictions = ''
      this.form.estimatedValue = 0
    },
  },
}
</script>

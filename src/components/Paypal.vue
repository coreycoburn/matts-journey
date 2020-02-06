<template>
  <div>
    <transition name="fade">
      <div v-show="value.amount && !errors" :ref="reference" />
    </transition>
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
import { mapMutations } from "vuex"
import Contentful from '~/mixins/contentful'

export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    contentfulFields: {
      type: Object,
      required: true,
    },
    message: {
      type: Object,
      required: true,
    },
    errors: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [Contentful],
  mounted() {
    this.$loadScript(`https://www.paypal.com/sdk/js?client-id=${process.env.GRIDSOME_PAYPAL_CLIENT}&currency=USD&intent=capture&disable-funding=credit`)
      .then(() => {
        paypal.Buttons({
          enableStandardCardFields: true,
          createOrder: (data, actions) => {
            return actions.order.create({
              payer: {
                name: {
                  given_name: this.value.firstName,
                  surname: this.value.lastName,
                },
                email_address: this.value.email,
                phone: {
                  phone_number: {
                    national_number: this.value.phone,
                  }
                }
              },
              purchase_units: [
                {
                  amount: {
                    value: this.value.amount,
                  },
                }
              ]
            })
          },
          onClick: () => {
            this.formHide()
          },
          onApprove: (data, actions) => {
            this.processingToggle()

            return actions.order.capture().then(response => {
              new Promise((resolve, reject) => {
                this.$emit('contentful-entry', response)
                resolve('done')
                reject('error')
              }).then(() => {
                this.submitToContentful(this.contentfulFields, this.message)
              })
            })
          },
          onError: (err) => {
            this.toggle()
            this.messageToggle({
              status: 400,
              message: `Hmm... something went wrong with PayPal. Please email at <a href="mailto:${this.$static.metadata.email}">${this.$static.metadata.email}</a> Please reference error: ${error}`,
            })
          },
        }).render(this.$refs[this.reference])
      })
      .catch(() => {
        this.toggle()
        this.messageToggle({
          status: 400,
          message: 'Failed to load PayPal. Please refresh the page',
        })
      })
  },
  watch: {
    value() {
      this.$emit('input', this.value)
    },
  },
  methods: {
    ...mapMutations({
      toggle(commit) {
        commit(`${this.reference}Toggle`)
      },
      processingToggle: 'processingToggle',
      formHide: 'formHide',
    }),
    messageToggle(payload) {
      this.$store.commit('messageToggle', payload)
    },
    clear() {
      this.$emit('clear')
    },
  }
}
</script>

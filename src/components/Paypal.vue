<template>
  <div>
    <transition name="fade">
      <div v-show="value.price && !errors" :ref="reference" />
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
                    value: this.value.price,
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
              this.submitToContentful({
                company: {
                  'en-US': this.value.company,
                },
                name: {
                  'en-US': `${this.value.firstName} ${this.value.lastName}`,
                },
                phone: {
                  'en-US': this.value.phone,
                },
                email: {
                  'en-US': this.value.email,
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
                  'en-US': this.value.message,
                },
                amount: {
                  'en-US': parseFloat(response.purchase_units[0].amount.value),
                },
                createdTime: {
                  'en-US': new Date(response.create_time),
                },
                payerId: {
                  'en-US': response.payer.payer_id,
                },
                paymentId: {
                  'en-US': response.id
                },
              }, {
                success: 'Thank you for your donation. Your generosity will help Matt continue his treatments and ease the burden caused by the expenses.',
                error: `Your payment was successful but your details were not logged to our database. Please email <a href="mailto:${this.$static.metadata.email}">${this.$static.metadata.email}</a>`,
              })
            })
          },
          onError: function (err) {
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
          message: 'Failed to load Paypal. Please refresh the page',
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

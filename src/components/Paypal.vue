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
import { mapState, mapMutations } from "vuex";

const contentful = require('contentful-management')

const client = contentful.createClient({
  accessToken: process.env.GRIDSOME_CTF_ACCESS_TOKEN
})

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
  computed: {
    ...mapState({
      'processing': state => state.processing,
    }),
  },
  mounted() {
    this.$loadScript(`https://www.paypal.com/sdk/js?client-id=${process.env.GRIDSOME_PAYPAL_CLIENT}&currency=USD&intent=capture&disable-funding=credit`)
      .then(() => {
        window.paypal.Buttons({
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
          onApprove: (data, actions) => {
            this.processingToggle()

            return actions.order.capture().then(response => {
              client.getSpace(process.env.GRIDSOME_CTF_SPACE_ID)
                .then((space) => space.getEnvironment(process.env.GRIDSOME_ENVIRONMENT))
                .then((environment) => environment.createEntry(this.reference, {
                  fields: {
                    company: {
                      'en-US': this.value.company,
                    },
                    firstName: {
                      'en-US': this.value.firstName,
                    },
                    lastName: {
                      'en-US': this.value.lastName,
                    },
                    phone: {
                      'en-US': this.value.phone,
                    },
                    email: {
                      'en-US': this.value.email,
                    },
                    address: {
                      'en-US': '',
                    },
                    city: {
                      'en-US': '',
                    },
                    state: {
                      'en-US': '',
                    },
                    zip: {
                      'en-US': '',
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
                      'en-US': response.id,
                    },
                  }
                }))
                .then((entry) => entry.publish())
                .then(() => {
                  this.$emit('clear')
                  this.processingToggle()
                  this.toggle()
                  this.messageToggle({
                    status: 200,
                    message: 'Thank you for your donation. Your generosity will help Matt continue his treatments and ease the burden caused by the expenses.',
                  })
                })
                .catch(() => {
                  this.processingToggle()
                  this.toggle()
                  this.messageToggle({
                    status: 400,
                    message: `Your payment was successful but your details were not logged to our database. Please email <a href="mailto:${this.$static.metadata.email}">${this.$static.metadata.email}</a>`,
                  })
                })
            })
          },
          onError: function (err) {
            this.processingToggle()
            this.toggle()
            this.messageToggle({
              status: 400,
              message: `Hmm... something went wrong with PayPal. Please email at <a href="mailto:${this.$static.metadata.email}">${this.$static.metadata.email}</a> Please reference error: ${error}`,
            })
          },
        }).render(this.$refs[this.reference])
      })
      .catch(() => {
        this.processingToggle()
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
    }),
    messageToggle(payload) {
      this.$store.commit('messageToggle', payload)
    },
  }
}
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-up-enter-active,
  .slide-up-leave-active {
    transform: translateY(0);
    transition: opacity 0.5s, transform 0.5s;
  }

  .slide-up-enter,
  .slide-up-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  .vts-dialog {
    background: rgba(0, 0, 0, 1);
  }
</style>

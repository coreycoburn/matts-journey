<template>
  <div>
    <transition name="fade">
      <div v-show="value.price && !errors" :ref="reference" />
    </transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

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
                    national_number: this.value.phone
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
            this.toggle()

            return actions.order.capture().then(response => {
              console.log(response)
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
                      'en-US': '',
                    },
                    amount: {
                      'en-US': parseFloat(response.purchase_units[0].amount.value),
                    },
                    createdTime: response.created_time,
                    payerId: {
                      'en-US': response.payer.payer_id,
                    },
                    paymentId: {
                      'en-US': response.id
                    },
                  }
                }))
                .then((entry) => entry.publish())
                .catch(console.error)
            })
          },
          onError: function (err) {
            // Show an error page here, when an error occurs
          },
        }).render(this.$refs[this.reference])
      })
      .catch(() => {
        console.log('failed to load paypal')
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
    }),
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

import { mapMutations } from "vuex"

const contentful = require('contentful-management')

const client = contentful.createClient({
  accessToken: process.env.GRIDSOME_CTF_ACCESS_TOKEN
})

export default {
  methods: {
    ...mapMutations({
      processingToggle: 'processingToggle',
    }),
    submitToContentful(response) {
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
          this.processingToggle()
          this.$emit('clear')
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
    },
  },
}

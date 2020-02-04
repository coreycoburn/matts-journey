import { mapMutations } from "vuex"

const contentful = require('contentful-management')

const client = contentful.createClient({
  accessToken: process.env.GRIDSOME_CTF_ACCESS_TOKEN
})

export default {
  methods: {
    ...mapMutations({
      toggle(commit) {
        commit(`${this.reference}Toggle`)
      },
      formShow: 'formShow',
      messageToggle: 'messageToggle',
    }),
    submitToContentful(fields, message) {
      client.getSpace(process.env.GRIDSOME_CTF_SPACE_ID)
        .then((space) => space.getEnvironment(process.env.GRIDSOME_ENVIRONMENT))
        .then((environment) => environment.createEntry(this.reference, { fields: fields }))
        .then((entry) => entry.publish())
        .then(() => {
          this.processingToggle()
          this.formShow()
          this.clear()
          this.toggle()
          this.messageToggle({
            status: 200,
            message: message.success,
          })
        })
        .catch(() => {
          this.processingToggle()
          this.formShow()
          this.toggle()
          this.messageToggle({
            status: 400,
            message: message.error,
          })
        })
    },
  },
}

import Vuex from 'vuex'
import LoadScript from 'vue-plugin-load-script'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'

export default function (Vue, { appOptions }) {
  Vue.use(Vuex)
  Vue.use(LoadScript)
  Vue.use(Vuelidate)
  Vue.use(VueMask)

  appOptions.store = new Vuex.Store({
    state: {
      processing: false,
      messageDialogShow: false,
      messageText: {
        status: null,
        message: '',
      },
      cashDonationDialogShow: false,
    },
    mutations: {
      processingToggle(state) {
        state.processing = !state.processing
      },
      messageToggle(state, payload) {
        state.messageDialogShow = !state.messageDialogShow

        if (state.messageDialogShow) {
           return state.messageText = payload
        }

        state.messageText = {
          status: null,
          message: '',
        }
      },
      cashDonationToggle(state) {
        state.cashDonationDialogShow = !state.cashDonationDialogShow
      },
    }
  })
}

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
      formShow: true,
      messageDialogShow: false,
      messageText: {
        status: null,
        message: '',
      },
      sponsorDialogShow: true,
      donationDialogShow: false,
      auctionDialogShow: false,
    },
    mutations: {
      processingToggle(state) {
        state.processing = !state.processing
      },
      formShow(state) {
        state.formShow = true
      },
      formHide(state) {
        state.formShow = false
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
      sponsorToggle(state) {
        state.sponsorDialogShow = !state.sponsorDialogShow
      },
      donationToggle(state) {
        state.donationDialogShow = !state.donationDialogShow
      },
      auctionToggle(state) {
        state.auctionDialogShow = !state.auctionDialogShow
      },
    }
  })
}

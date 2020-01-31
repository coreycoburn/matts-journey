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
      donationDialogShow: false,
    },
    mutations: {
      donationToggle(state) {
        state.donationDialogShow = !state.donationDialogShow
      }
    }
  })
}

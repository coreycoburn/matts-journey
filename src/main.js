import Vuex from 'vuex'
import LoadScript from 'vue-plugin-load-script'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'

export default function (Vue, { appOptions, head }) {
  Vue.use(Vuex)
  Vue.use(LoadScript)
  Vue.use(Vuelidate)
  Vue.use(VueMask)

  head.meta.push({
    name: 'keywords',
    content: 'tumor,brain,cancer,fundraiser,event,Yountville,Napa,Matt Appleby',
  })
  head.meta.push({
    name: 'viewport',
    content: 'width=device-width, user-scalable=no',
  })
  head.meta.push({
    property: 'og:site_name',
    content: 'Help Matt Appleby',
  })
  head.meta.push({
    name: 'description',
    content: 'Help Matt Appleby and his family fight offset some of his medical expenses that are not covered by his insurance and to ease the burden caused by his dramatically reduced income.',
  })
  head.meta.push({
    property: 'og:title',
    content: 'Help Matt Appleby',
  })
  head.meta.push({
    property: 'og:description',
    content: 'Help Matt Appleby and his family fight offset some of his medical expenses that are not covered by his insurance and to ease the burden caused by his dramatically reduced income.',
  })
  head.meta.push({
    property: 'og:type',
    content: 'website',
  })
  head.meta.push({
    property: 'og:url',
    content: 'https://www.helpmattappleby.com',
  })
  head.meta.push({
    property: 'og:image',
    content: 'https://www.helpmattappleby.com/images/field_of_hope_logo.jpg',
  })
  head.meta.push({
    name: 'twitter:card',
    content: 'summary',
  })
  head.meta.push({
    name: 'twitter:creator',
    content: '@coreycoburn',
  })
  head.meta.push({
    name: 'twitter:title',
    content: 'Help Matt Appleby',
  })
  head.meta.push({
    name: 'twitter:description',
    content: 'Help Matt Appleby and his family fight offset some of his medical expenses that are not covered by his insurance and to ease the burden caused by his dramatically reduced income.',
  })
  head.meta.push({
    name: 'twitter:image',
    content: 'https://www.helpmattappleby.com/images/field_of_hope_logo.jpg',
  })

  appOptions.store = new Vuex.Store({
    state: {
      processing: false,
      formShow: true,
      messageDialogShow: false,
      messageText: {
        status: null,
        message: '',
      },
      sponsorDialogShow: false,
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

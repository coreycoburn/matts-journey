import Vuex from 'vuex'
import LoadScript from 'vue-plugin-load-script'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'

export default function (Vue, { appOptions, head }) {
  Vue.use(Vuex)
  Vue.use(LoadScript)
  Vue.use(Vuelidate)
  Vue.use(VueMask)

  head.meta.push([
    {
      name: 'keywords',
      content: 'tumor,brain,cancer,fundraiser,event,Yountville,Napa,Matt Appleby',
    },
    {
      name: 'viewport',
      content: 'width=device-width, user-scalable=no',
    },
    {
      property: 'og:site_name',
      content: 'Help Matt Appleby',
    },
    {
      name: 'description',
      content: 'Help Matt Appleby and his family fight offset some of his medical expenses that are not covered by his insurance and to ease the burden caused by his dramatically reduced income.',
    },
    {
      property: 'og:title',
      content: 'Help Matt Appleby',
    },
    {
      property: 'og:description',
      content: 'Help Matt Appleby and his family fight offset some of his medical expenses that are not covered by his insurance and to ease the burden caused by his dramatically reduced income.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://www.helpmattappleby.com',
    },
    {
      property: 'og:image',
      content: 'https://www.helpmattappleby.com/field_of_hope_logo.jpg',
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:creator',
      content: '@coreycoburn',
    },
    {
      name: 'twitter:title',
      content: 'Help Matt Appleby',
    },
    {
      name: 'twitter:description',
      content: 'Help Matt Appleby and his family fight offset some of his medical expenses that are not covered by his insurance and to ease the burden caused by his dramatically reduced income.',
    },
    {
      name: 'twitter:image',
      content: 'https://www.helpmattappleby.com/field_of_hope_logo.jpg',
    },
  ])

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

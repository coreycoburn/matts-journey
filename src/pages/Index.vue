<template>
  <div>
    <div class="container mx-auto flex flex-col-reverse px-6 md:flex-row md:px-0">
      <div class="w-full md:w-1/2">
        <g-image src="~/images/matt_with_baseball.png" alt="Matt with a baseball at a game" />
      </div>
      <div class="flex flex-col-reverse w-full items-center text-blue-500 md:flex-col md:w-1/2">
        <div class="flex flex-row mb-12 items-center">
          <div class="flex w-1/2 justify-start">
            <g-image src="~/images/field_of_hope_logo.jpg" alt="Field of Hope logo" />
          </div>
          <div class="flex w-1/2 justify-end">
            <g-image src="~/images/brain_cancer_awareness_ribbon.jpg" alt="Brain Cancer Awareness ribbon" />
          </div>
        </div>
        <div class="flex flex-col items-center mb-6 md:mb-0">
          <div class="text-4xl text-center font-bold">
            Sunday, February, 23, 2020
          </div>
          <div class="text-2xl mb-3">2:00pm - 5:00pm</div>
          <div>Yountville Community Center</div>
          <div>6516 Washington Street, Yountville, CA</div>
        </div>
      </div>
    </div>
    <div class="bg-blue-500 text-blue-100 py-16">
      <div class="flex flex-col-reverse container mx-auto max-w-5xl px-6 md:px-0 md:flex-row">
        <div class="w-full md:w-2/3 mb-8 mr-6 md:w-2/3">
          <h1 class="text-3xl md:text-4xl">Field of Hope</h1>
          <div class="font-bold mb-4">TICKETS - $40 per person</div>
          <p>
            Come enjoy late afternoon appetizers and sample amazing wines from local wineries.
            There will be speakers, a silent auction and a live Fund-A-Need to help raise much needed funds for Matt and his family during this difficult time.
          </p>
          <p>
            This event is to help Matt and his family offset some of his medical expenses that are not covered by his insurance and to ease the burden caused by his dramatically reduced income.
          </p>
        </div>
        <div class="flex w-full items-center justify-center md:w-1/3">
          <g-image src="~/images/field_of_hope_logo.jpg" class="mr-6 rounded-full border-8 border-gray-400 mb-6 md:mb-0" />
        </div>
      </div>
      <div class="text-center">
        <a href="https://www.eventbrite.com/e/field-of-hope-a-fundraiser-for-matt-appleby-tickets-91956812301" class="bg-gray-200 text-blue-500 shadow uppercase text-3xl font-bold rounded-full px-12 py-4 hover:bg-gray-300">
          Buy Tickets
        </a>
      </div>
    </div>
    <div class="container mx-auto max-w-5xl py-16 px-6 md:px-0">
      <h2>Be an Event Sponsor</h2>
      <p>If you would like to consider a larger commitment to help Matt, we are offering the following Sponsorship Levels:</p>
      <div class="flex flex-col mb-8 md:flex-row">
        <div class="w-full md:w-1/2 mb-6 md:mb-0">
          <div class="flex text-2xl">
            <div class="w-1/2 font-bold underline">Grand Slam</div>
            <div class="w-1/2">$5,000</div>
          </div>
          <div class="flex">
            <div class="w-1/2 font-bold">Home Run</div>
            <div class="w-1/2">$2,500</div>
          </div>
          <div class="flex">
            <div class="w-1/2 font-bold">Triple</div>
            <div class="w-1/2">$1,500</div>
          </div>
          <div class="flex">
            <div class="w-1/2 font-bold">Double</div>
            <div class="w-1/2">$1,000</div>
          </div>
          <div class="flex">
            <div class="w-1/2 font-bold">Base Hit</div>
            <div class="w-1/2">$500</div>
          </div>
        </div>
        <div class="w-full md:w-1/2">
          <div class="font-bold">Sponsorship entitlements:</div>
          <ul class="list-disc ml-5">
            <li>Will receive special recognition at the event.</li>
            <li>Will have their name/logo on display at event and on this website.</li>
            <li>Will include their name on all after event material.</li>
          </ul>
        </div>
      </div>
      <div class="italic bg-gray-200 text-center rounded mb-8">* For Logo & name placement, your commitment must be received no later than Tuesday, February 4th</div>
      <div class="text-center">
        <button class="button">
          Sponsor Event
        </button>
      </div>
    </div>
    <div class="bg-gray-200 py-16">
      <div class="flex container mx-auto max-w-2xl flex-col px-6 md:px-0">
        <h2>Make a Donation</h2>
        <p class="mb-8">You can also assist Matt by making a Cash Donation or provide an item for the Silent Auction.</p>
        <div class="flex flex-col md:flex-row">
          <div class="flex w-full justify-center mb-6 md:w-1/2 md:mb-0">
            <CashDonation reference="cashDonation" />
          </div>
          <div class="flex w-full justify-center md:w-1/2">
            <button class="button">
              Donate Auction Item
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto md:py-16">
      <div class="flex flex-col justify-center md:flex-row">
        <div>
          <g-image src="~/images/matt_is_dopey.jpg" height="800" class="md:rounded-tl-lg md:rounded-bl-lg" alt="Matt at the Disney Dopey Run with all of his medals" />
        </div>
        <div>
          <g-image src="~/images/matt_thumbs_up.jpg" height="800" class="md:rounded-tr-lg md:rounded-br-lg" alt="Matt giving thumbs up in hospital bed" />
        </div>
      </div>
    </div>
    <VDialog :showing="messageDialogShow" @change="messageToggle" transition="slide-up" bg-transition="fade" noScroll :classes="{ content: 'w-full md:w-1/3 rounded-lg' }">
      <div class="p-6">
        <div v-if="messageText.status === 200">
          <div class="flex">
            <h2 class="flex-1 text-green-500">Thank You!</h2>
            <div class="flex-end">
              <button @click="messageToggle" aria-label="close">&times;</button>
            </div>
          </div>
          <div v-html="messageText.message" />
        </div>
        <div v-else>
          <div class="flex">
            <h2 class="flex-1 text-red-500">Something went wrong...</h2>
            <div class="flex-end">
              <button @click="messageToggle" aria-label="close">&times;</button>
            </div>
          </div>
          <div v-html="messageText.message" />
        </div>
      </div>
    </VDialog>
  </div>
</template>

<script>
import CashDonation from '~/components/CashDonation'
import { VDialog } from 'vuetensils'
import {mapMutations, mapState} from "vuex";

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    CashDonation,
    VDialog,
  },
  computed: {
    ...mapState({
      messageDialogShow: state => state.messageDialogShow,
      messageText: state => state.messageText,
    }),
  },
  methods: {
    ...mapMutations({
      messageToggle: 'messageToggle',
    }),
  },
}
</script>

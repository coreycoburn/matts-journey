<template>
  <Layout>
    <div class="container mx-auto flex">
      <div class="w-1/2">
        <g-image src="~/images/matt_with_baseball.png" />
      </div>
      <div class="flex flex-col w-1/2 items-center text-blue-500">
        <div class="flex mb-12">
          <g-image src="~/images/field_of_hope_logo.jpg" class="mr-6" />
          <g-image src="~/images/brain_cancer_awareness_ribbon.jpg" />
        </div>
        <div class="text-4xl font-bold">
          Sunday, February, 23, 2020
        </div>
        <div class="text-2xl mb-3">2:00pm - 5:00pm</div>
        <div>Yountville Community Center</div>
        <div>6516 Washington Street, Yountville, CA</div>
      </div>
    </div>
    <div class="bg-blue-500 text-blue-100 py-16">
      <div class="flex container mx-auto max-w-5xl">
        <div class="w-2/3 mb-8 mr-6">
          <h1>Field of Hope</h1>
          <div class="font-bold mb-4">TICKETS - $40 per person</div>
          <p>
            Come enjoy late afternoon appetizers and sample amazing wines from local wineries.
            There will be speakers, a silent auction and a live Fund-A-Need to help raise much needed funds for Matt and his family during this difficult time.
          </p>
          <p>
            This event is to help Matt and his family offset some of his medical expenses that are not covered by his insurance and to ease the burden caused by his dramatically reduced income.
          </p>
        </div>
        <div class="flex w-1/3 items-center justify-center">
          <g-image src="~/images/field_of_hope_logo.jpg" class="mr-6 rounded-full border-8 border-gray-400" />
        </div>
      </div>
      <div class="text-center">
        <a href="https://www.eventbrite.com/organizer/pricing" class="bg-gray-200 text-blue-500 shadow uppercase text-3xl font-bold rounded-full px-12 py-4 hover:bg-gray-300">
          Buy Tickets
        </a>
      </div>
    </div>
    <div class="container mx-auto max-w-5xl py-16">
      <h1>Be an Event Sponsor</h1>
      <p>If you would like to consider a larger commitment to help Matt, we are offering the following Sponsorship Levels:</p>
      <div class="flex mb-8">
        <div class="w-1/2">
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
        <div class="w-1/2">
          <div class="font-bold">Sponsorship entitlements:</div>
          <ul class="list-disc ml-4">
            <li>Will receive special recognition at the event.</li>
            <li>Will have their name/logo on display at event and on this website.</li>
            <li>Will include their name on all after event material.</li>
          </ul>
        </div>
      </div>
      <div class="italic bg-gray-200 text-center rounded mb-8">* For Logo & name placement, your commitment must be received no later than Tuesday, February 4th</div>
      <div class="text-center">
        <button class="bg-blue-200 shadow text-gray-100 uppercase text-xl font-bold rounded-full px-8 py-2 hover:bg-blue-300">
          Sponsor Event
        </button>
      </div>
    </div>
    <div class="bg-gray-200 py-16">
      <div class="container mx-auto max-w-2xl">
        <h1>Make a Donation</h1>
        <p class="mb-8">You can also assist Matt by making a Cash Donation or provide an item for the Silent Auction.</p>
        <div class="flex">
          <div class="flex w-1/2 justify-center">
            <button class="bg-blue-200 shadow text-gray-100 uppercase text-xl font-bold rounded-full px-8 py-2 hover:bg-blue-300">
              Make Cash Donation
            </button>
          </div>
          <div class="flex w-1/2 justify-center">
            <button class="bg-blue-200 shadow text-gray-100 uppercase text-xl font-bold rounded-full px-8 py-2 hover:bg-blue-300">
              Donation Auction Item
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto py-16">
      <div class="flex justify-center">
        <div>
          <g-image src="~/images/matt_is_dopey.jpg" height="800" class="rounded-tl-lg rounded-bl-lg" />
        </div>
        <div>
          <g-image src="~/images/matt_thumbs_up.jpg" height="800" class="rounded-tr-lg rounded-br-lg" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style>

</style>

<template>
  <div>
    <ClientOnly>
      <VDialog :showing="dialogShow" @change="toggle" transition="slide-up" bg-transition="fade" noScroll :classes="{ content: 'w-full md:w-1/3 rounded-lg' }">
        <div class="p-6">
          <div class="flex">
            <h2 class="flex-1" v-text="title" />
            <div class="flex-end">
              <button @click="toggle" aria-label="close">&times;</button>
            </div>
          </div>
          <slot />
        </div>
        <slot name="footer" />
      </VDialog>
    </ClientOnly>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import { VDialog } from 'vuetensils'

export default {
  props: {
    reference: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    VDialog,
  },
  computed: {
    ...mapState({
      dialogShow(state) {
        return state[`${this.reference}DialogShow`]
      },
    }),
  },
  methods: {
    ...mapMutations({
      toggle(commit) {
        commit(`${this.reference}Toggle`)
      },
    }),
  },
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
</style>

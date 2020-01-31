<template>
  <footer class="bg-gray-200 text-base">
    <div class="flex flex-col container px-6 py-4 text-center md:mx-auto md:flex-row md:text-left">
      <div class="mr-6">&copy; {{ year }} {{ $static.metadata.organization }}</div>
      <div><a :href="`mailto:${$static.metadata.email}`" v-text="$static.metadata.email" /></div>
    </div>
  </footer>
</template>

<static-query>
query {
  metadata {
    organization,
    email,
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>

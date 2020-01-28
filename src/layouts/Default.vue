<template>
  <div class="text-gray-900 text-lg leading-loose">
    <header class="container mx-auto mt-8 mb-16">
      <nav class="text-lg">
        <g-link to="/" class="mr-12">Help Matt</g-link>
        <g-link to="/journey" class="mr-12">Matt's Journey</g-link>
        <g-link to="/brain-cancer-awareness" class="mr-12">Brain Cancer Awareness</g-link>
        <g-link to="/contact" class="mr-12">Contact</g-link>
        <g-link to="/sponsors">Sponsors</g-link>
      </nav>
    </header>
    <slot/>
    <footer class="bg-gray-200 text-base">
      <div class="flex container mx-auto py-4">
        <div class="mr-6">&copy; {{ year }} Matt Appleby Brain Cancer Fund</div>
        <div><a href="mailto:HelpMattAppleby@gmail.com">HelpMattAppleby@gmail.com</a></div>
      </div>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    }
  }
}
</script>

<style>
  h1 {
    @apply text-4xl;
  }
  a {
    @apply text-blue-500;
  }
  p {
    @apply mb-4;
  }
</style>

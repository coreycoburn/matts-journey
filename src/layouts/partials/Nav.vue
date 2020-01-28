<template>
  <nav class="text-lg">
    <g-link to="/" class="mr-12">Help Matt</g-link>
    <g-link to="/journey" class="mr-12">Matt's Journey</g-link>
    <g-link to="/brain-cancer-awareness" class="mr-12">Brain Cancer Awareness</g-link>
    <g-link to="/contact" class="mr-12">Contact</g-link>
    <g-link to="/sponsors">Sponsors</g-link>
  </nav>
</template>

<style>
  a {
    @apply pb-3;
  }
  a.active--exact {
    @apply font-bold border-b-2 border-blue-500;
  }
</style>

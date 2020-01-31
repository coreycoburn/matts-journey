<template>
  <nav class="flex flex-col px-6 text-lg bg-gray-200 shadow py-6 md:bg-transparent md:flex-row md:shadow-none md:py-0">
    <g-link to="/" class="md:pb-3 md:mr-12">Help Matt</g-link>
    <g-link to="/journey" class="md:pb-3 md:mr-12">Matt's Journey</g-link>
    <g-link to="/brain-cancer-awareness" class="md:pb-3 md:mr-12">Brain Cancer Awareness</g-link>
    <g-link to="/contact" class="md:pb-3 md:mr-12">Contact</g-link>
    <g-link to="/sponsors">Sponsors</g-link>
  </nav>
</template>

<style>
  a.active--exact {
    @apply font-bold border-b-2 border-blue-500;
  }
</style>

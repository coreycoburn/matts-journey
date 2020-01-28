<template>
  <div class="container mx-auto">
    <header class="header">
      <nav class="nav">
        <g-link to="/">Help Matt</g-link>
        <g-link to="/journey">Matt's Journey</g-link>
        <g-link to="/brain-cancer-awareness">Brain Cancer Awareness</g-link>
        <g-link to="/contact">Contact</g-link>
        <g-link to="/sponsors">Sponsors</g-link>
      </nav>
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>

</style>

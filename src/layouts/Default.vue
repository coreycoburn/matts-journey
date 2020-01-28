<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <g-link to="/">Help Matt</g-link>
        <g-link to="/journey">Matt's Journey</g-link>
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

<template>
  <div class="container mx-auto max-w-2xl px-6 md:px-0">
    <h1 class="text-3xl md:text-4xl">Thank you for your message</h1>
    <p>
      We have received your message. If you need to reach us directly you may reach us at one of the following numbers:
    </p>
    <ul>
      <li>Email: <a :href="`mailto:${$static.metadata.email}`" v-text="$static.metadata.email" /></li>
      <li><strong>Lisa Tarner:</strong> 707-227-6095</li>
      <li><strong>Diane Bishofberger:</strong> 707-227-2234</li>
      <li><strong>Ruth Appleby:</strong> 707-227-6123</li>
    </ul>
  </div>
</template>

<static-query>
query {
  metadata {
    email,
}
}
</static-query>

<script>
  export default {
    metaInfo: {
      title: 'Message Received',
    }
  }
</script>

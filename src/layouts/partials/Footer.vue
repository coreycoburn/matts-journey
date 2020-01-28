<template>
  <footer class="bg-gray-200 text-base">
    <div class="flex container mx-auto py-4">
      <div class="mr-6">&copy; {{ year }} Matt Appleby Brain Cancer Fund</div>
      <div><a href="mailto:HelpMattAppleby@gmail.com">HelpMattAppleby@gmail.com</a></div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>

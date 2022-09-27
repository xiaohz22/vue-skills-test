<script setup lang="ts">
  import { onMounted, onActivated, onDeactivated } from 'vue';
  onMounted(() => {
    console.log('Posts mounted')
  })

  onActivated(() => {
    console.log('Posts onActivated')
  })

   onDeactivated(() => {
    console.log('Posts onDeactivated')
  })
</script>

<template>
  <div class="tab">
    Posts component
  </div>
</template>
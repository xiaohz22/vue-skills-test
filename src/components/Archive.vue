<script setup lang="ts">
  import { onActivated, onDeactivated, onMounted } from 'vue';
  onMounted(() => {
    console.log('Archive mounted')
  })

  onActivated(() => {
    console.log('Archive onActivated')
  })

   onDeactivated(() => {
    console.log('Archive onDeactivated')
  })
</script>

<template>
  <div class="tab">
    Archive component
  </div>
</template>
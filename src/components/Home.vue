<script setup lang="ts">
  import { onActivated, onDeactivated, onMounted } from 'vue';
  const props = defineProps<{
    test: string
  }>()
  onMounted(() => {
    console.log('Home mounted')
    console.log(props.test, 'props.test')
  })

  onActivated(() => {
    console.log('Home onActivated')
  })

   onDeactivated(() => {
    console.log('Home onDeactivated')
  })
</script>

<template>
  <div class="tab">
    Home component
  </div>
</template>
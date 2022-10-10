<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <router-link to="/v3/v3-skill1">Vue3-skill1</router-link><br />
  <router-link to="/v3/v3-skill2">Vue3-skill2</router-link>
</template>

<script lang="ts" setup>
  
</script>

<style scoped>

</style>

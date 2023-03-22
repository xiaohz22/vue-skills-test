<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
const skillList = ['skill1', 'skill2', 'skill3', 'skill4', 'skill5']
</script>

<template>
  <div v-for="item in skillList">
    <router-link :to="`/v3/v3-${item}`">Vue3-{{ item }}</router-link>
  </div>
  <!-- <router-link to="/v3/v3-skill1">Vue3-skill1</router-link><br />
  <router-link to="/v3/v3-skill2">Vue3-skill2</router-link> -->
</template>

<script lang="ts" setup>
  
</script>

<style scoped>

</style>

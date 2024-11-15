<script setup>
const isFormOpen = ref(false)
definePageMeta({
  colorMode:'light'
})
</script>
<template>
  <div>
  <UButton label="Form" @click="isFormOpen ==true"/>
    <Form v-if="isFormOpen"/>
  </div>
   
</template>
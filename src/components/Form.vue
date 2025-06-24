<template>
  <h2>Form</h2>
  <form>
    <label class="label">
      Priezvisko
      <input class="input" v-model="state.surname">
    </label>
  </form>
</template>

<script setup lang="ts">
import { state } from '../store.ts';

</script>

<style scoped>
</style>
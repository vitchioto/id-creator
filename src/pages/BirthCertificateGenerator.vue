<template>
  <h1>Konfigurácia</h1>
  <Form />
  <Canvas />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { state } from '../storeBC.ts';

import Form from '../components/birthCertificateGenerator/Form.vue';
import Canvas from '../components/birthCertificateGenerator/Canvas.vue';


</script>

<style scoped>
.file {
  justify-content: center;
}
</style>
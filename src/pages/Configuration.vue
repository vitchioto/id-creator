<template>
  <h1>Konfigurácia</h1>
  <div class="file">
    <label class="file-label">
      <input class="file-input" type="file" name="resume" @change="handleImage($event)" accept="image/*" capture />
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label"> Choose a file </span>
      </span>
    </label>
  </div>
  <Form />
  <Canvas />
  <ImageCrop :show="showModal" :image="image" @close="showModal = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Form from '../components/Form.vue';
import Canvas from '../components/Canvas.vue';
import ImageCrop from '../components/ImageCrop.vue';

const image = ref();
const showModal = ref(false);


const handleImage = (event: Event) => {
  showModal.value = true;
  const target = event.target as HTMLInputElement;
  if (target?.files) {
    image.value = URL.createObjectURL(target?.files[0]);
  }
}
</script>

<style scoped>
</style>
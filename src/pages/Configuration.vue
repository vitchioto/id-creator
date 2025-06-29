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
import { state } from '../store.ts';

import Form from '../components/Form.vue';
import Canvas from '../components/Canvas.vue';
import ImageCrop from '../components/ImageCrop.vue';

const image = ref();
const showModal = ref(false);


const handleImage = (event: Event) => {
  console.log(event);
  showModal.value = true;
  image.value = URL.createObjectURL(event.target?.files[0]);
  state.image2 = image.value;
}
</script>

<style scoped>
</style>
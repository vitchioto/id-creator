<template>
  <h1 class="title">Generuj občiansky preukaz</h1>
  <Form />
  <div class="file">
    <label class="file-label">
      <input class="file-input" type="file" name="resume" @change="handleImage($event)" accept="image/*" capture />
      <span class="button">
        <span class="file-label"> Nahraj obrázok </span>
      </span>
    </label>
    <button class="button ml-2" :disabled="!image" aria-label="Upraviť obrázok" @click="showModal = true">Upraviť obrázok</button>
    <button class="button ml-2" :disabled="!image" aria-label="Zmazať obrázok" @click="clearImage()">Zmazať obrázok</button>
  </div>
  <Canvas />
  <ImageCrop :show="showModal" :image="image" @close="showModal = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { state } from '../store.ts';

import Form from '../components/idGenerator/Form.vue';
import Canvas from '../components/idGenerator/Canvas.vue';
import ImageCrop from '../components/idGenerator/ImageCrop.vue';

const image = ref();
const showModal = ref(false);


const handleImage = (event: Event) => {
  showModal.value = true;
  const target = event.target as HTMLInputElement;
  if (target?.files) {
    image.value = URL.createObjectURL(target?.files[0]);
  }
}

const clearImage = () => {
  state.canvas = undefined;
  image.value = undefined;
}
</script>

<style scoped>
.file {
  justify-content: center;
}
</style>
<template>
  <div>
  <canvas id="canvas" width="763" height="1080" />
  </div>
  <div>
    <button class="button" @click="download">Stiahnuť</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import birthCertificateImage from '../../assets/birth_certificate.jpg';
import { state } from '../../storeBC.ts';

let canvas = ref();
let context = ref<CanvasRenderingContext2D>();
let image = ref();
let imageLoaded = ref(false);

watch(state, () => {
  draw();
});

const download = () => {
  const createEl = document.createElement('a');
  createEl.href = canvas.value?.toDataURL();

  // This is the name of our downloaded file
  createEl.download = "id_front";

  // Click the download button, causing a download, and then remove it
  createEl.click();
  createEl.remove();
};

const draw = () => {
  if (!context.value || !imageLoaded.value) return;

  context.value.clearRect(0, 0, 763, 1080);
  context.value.drawImage(image.value, 0,0, 763, 1080, 0,0, 763, 1080);

  context.value.font = "400 14px sans-serif";
  if (state.year) {
    context.value.fillText(state.year.toString(), 277, 251);
  }

  if (state.birthDate) {
    context.value.fillText(state.birthDate, 242, 293);
  }

  if (state.birthNumber) {
    context.value.fillText(state.birthNumber, 608, 333);
  }

  context.value.fillText(state.birthCity, 242, 372);
  context.value.fillText(state.name, 242, 422);
  context.value.fillText(state.surname, 242, 437);

  const sexString = state.sex === 'M' ? 'mužské' : 'ženské';
  context.value.fillText(sexString, 242, 475);

  const step = 14;

  const lines = state.fatherDetails.split('\n');
  lines.forEach((item, index) => {
    context.value?.fillText(item, 242, 512 + (step * index));
  });
  
  const lines2 = state.motherDetails.split('\n');
  lines2.forEach((item, index) => {
    context.value?.fillText(item, 242, 646 + (step * index));
  });

  context.value.fillText(state.nameOfAdministrator, 600, 980);
}

onMounted(() => {
  canvas.value = document.getElementById('canvas') as HTMLCanvasElement;
  context.value = canvas.value.getContext('2d') as CanvasRenderingContext2D;
  image.value = new Image();

  image.value.addEventListener('load', () => {
    imageLoaded.value = true;
    draw();
  });

  image.value.src = birthCertificateImage;
});
</script>

<style scoped>
</style>
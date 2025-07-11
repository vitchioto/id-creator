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
import { formatDateFromBirthNumber } from '../../utility.ts';
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
  createEl.download = "birth_certificate";

  // Click the download button, causing a download, and then remove it
  createEl.click();
  createEl.remove();
};

const draw = () => {
  if (!context.value || !imageLoaded.value) return;

  context.value.clearRect(0, 0, 763, 1080);
  context.value.drawImage(image.value, 0,0, 763, 1080, 0,0, 763, 1080);

  context.value.font = "400 12px sans-serif";
  if (state.year) {
    context.value.fillText(state.year.toString(), 245, 231);
  }

  if (state.birthDate) {
    context.value.fillText(state.birthDate, 225, 273);
  }

  if (state.birthNumber) {
    context.value.fillText(state.birthNumber, 557, 306);
  }

  context.value.fillText(state.birthCity, 225, 330);
  context.value.fillText(state.name, 225, 380);
  context.value.fillText(state.surname, 225, 398);

  const sexString = state.sex === 'M' ? 'mužské' : 'ženské';
  context.value.fillText(sexString, 225, 430);

  const lines = state.fatherDetails.split('\n');

  context.value.fillText(lines[0], 225, 470);
  context.value.fillText(lines[1], 225, 484);
  if (state.fatherBirthNumber) {
    context.value.fillText(formatDateFromBirthNumber(state.fatherBirthNumber), 225, 498);
  }
  context.value.fillText(lines[2], 225, 512);
  context.value.fillText(lines[3], 225, 526);

  if (state.fatherBirthNumber) {
    context.value.fillText(state.fatherBirthNumber, 557, 562);
  }
  
  const lines2 = state.motherDetails.split('\n');

  context.value.fillText(lines2[0], 225, 590);
  context.value.fillText(lines2[1], 225, 604);
  if (state.motherBirthNumber) {
    context.value.fillText(formatDateFromBirthNumber(state.motherBirthNumber), 225, 618);
  }
  context.value.fillText(lines2[2], 225, 632);
  context.value.fillText(lines2[3], 225, 646);

  if (state.motherBirthNumber) {
    context.value.fillText(state.motherBirthNumber, 557, 683);
  }

  context.value.fillText(state.nameOfAdministrator, 510, 880);
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
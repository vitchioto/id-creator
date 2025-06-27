<template>
  <h2>Canvas</h2>
  <canvas id="canvasFront" width="540" height="350" />
  <canvas id="canvasBack" width="540" height="350" />
  <button class="button" @click="downloadFront">Download Front</button>
  <button class="button" @click="downloadBack">Download Back</button>
  {{ state.surname }}
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import idFront from '../assets/id_front.jpg';
import idBack from '../assets/id_back.jpg';
import { state } from '../store.ts';

let canvasFront = ref();
let contextFront = ref<CanvasRenderingContext2D>();
let imageFront = ref();
let canvasBack = ref();
let contextBack = ref<CanvasRenderingContext2D>();
let imageBack = ref();

watch(state, () => {
  drawFront();
  drawBack();
});

const mrzLine1 = computed(() => {
  const birthString = state.birthNumber.replace('/', '');

  return `IDSVK${state.idNumber}<3${birthString}<<<<<`;
});

const mrzLine2 = computed(() => {
  const birthStringParts = state.birthNumber.split('/');
  
  return `${birthStringParts}X${state.sex}`;
});

const mrzLine3 = computed(() => {
  const nameGTs = '<'.repeat(28 - (state.surname.length + state.name.length));
  
  return `${state.surname.toUpperCase()}<<${state.name.toUpperCase()}${nameGTs}`;
});

const downloadFront = () => {
  const createEl = document.createElement('a');
  createEl.href = canvasFront.value?.toDataURL();

  // This is the name of our downloaded file
  createEl.download = "download-this-canvas";

  // Click the download button, causing a download, and then remove it
  createEl.click();
  createEl.remove();
};

const downloadBack = () => {
  const createEl = document.createElement('a');
  createEl.href = canvasBack.value?.toDataURL();

  // This is the name of our downloaded file
  createEl.download = "download-this-canvas";

  // Click the download button, causing a download, and then remove it
  createEl.click();
  createEl.remove();
};

const drawFront = () => {
  if (!contextFront.value) return;

  contextFront.value.clearRect(0, 0, 540, 350);
  contextFront.value.drawImage(imageFront.value, 0,0, 1080, 700, 0,0, 540, 350);

  contextFront.value.font = "400 16px sans-serif";
  contextFront.value.fillText(state.surname, 227, 95);

  contextFront.value.fillText(state.name, 227, 125);

  contextFront.value.fillText(state.birthDate, 227, 155);

  contextFront.value.fillText(state.nationality, 227, 185);

  contextFront.value.fillText(state.idNumber, 227, 215);

  contextFront.value.fillText(state.issuer, 227, 255);

  contextFront.value.fillText(state.sex, 383, 155);

  contextFront.value.fillText(state.birthNumber, 383, 185);

  contextFront.value.fillText(state.issueDate, 383, 215);

  contextFront.value.fillText(state.expirationDate, 383, 255);
}

const drawBack = () => {
  if (!contextBack.value) return;

  contextBack.value.clearRect(0, 0, 540, 350);
  contextBack.value.drawImage(imageBack.value, 0,0, 1080, 700, 0,0, 540, 350);

  contextBack.value.font = "400 14px sans-serif";
  contextBack.value.fillText(state.address, 245, 41);

  contextBack.value.fillText(state.birthSurname, 245, 86);

  contextBack.value.fillText(state.birthPlace, 245, 113);

  contextBack.value.font = "400 20px sans-serif";
  contextBack.value.letterSpacing = "3px";
  contextBack.value.fillText(mrzLine1.value, 30, 250);

  contextBack.value.fillText(mrzLine2.value, 30, 280);

  contextBack.value.fillText(mrzLine3.value, 30, 310);
}

onMounted(() => {
  canvasFront.value = document.getElementById('canvasFront') as HTMLCanvasElement;
  contextFront.value = canvasFront.value.getContext('2d') as CanvasRenderingContext2D;
  imageFront.value = new Image();
  imageFront.value.src = idFront;

  canvasBack.value = document.getElementById('canvasBack') as HTMLCanvasElement;
  contextBack.value = canvasBack.value.getContext('2d') as CanvasRenderingContext2D;
  imageBack.value = new Image();
  imageBack.value.src = idBack;
});
</script>

<style scoped>
</style>
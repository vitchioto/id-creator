<template>
  <div>
  <canvas id="canvasFront" width="1080" height="700" />
  <canvas id="canvasBack" width="1080" height="700" />
  </div>
  <div>
    <button class="button mr-2" @click="downloadFront">Stiahnuť prednú stranu</button>
    <button class="button" @click="downloadBack">Stiahnuť zadnú stranu</button>
  </div>
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

const mrzLastCheckDigit = computed(() => {
  const birthDateParts = state.birthDate.split('.');
  const expirationDateParts = state.expirationDate.split('.');

  if (!expirationDateParts[2]) return '';
  const expirationDateFormatted = `${expirationDateParts[2].substring(2)}${expirationDateParts[1]}${expirationDateParts[0]}`;

  if (!birthDateParts[2]) return '';
  const birthDateFormatted = `${birthDateParts[2].substring(2)}${birthDateParts[1]}${birthDateParts[0]}`;

  const checkString = `${mrzLine1.value.substring(5)}${birthDateFormatted}${calculateControlNumber(birthDateFormatted)}${expirationDateFormatted}${calculateControlNumber(expirationDateFormatted)}`;

  return calculateControlNumber(checkString);
});

const mrzLine1 = computed(() => {
  const birthString = state.birthNumber.replace('/', '');

  return `IDSVK${state.idNumber}<${calculateControlNumber(state.idNumber)}${birthString}<<<<<`;
});

const mrzLine2 = computed(() => {
  const birthDateParts = state.birthDate.split('.');
  const expirationDateParts = state.expirationDate.split('.');

  if (!expirationDateParts[2]) return '';
  const expirationDateFormatted = `${expirationDateParts[2].substring(2)}${expirationDateParts[1]}${expirationDateParts[0]}`;

  if (!birthDateParts[2]) return '';
  const birthDateFormatted = `${birthDateParts[2].substring(2)}${birthDateParts[1]}${birthDateParts[0]}`;
  
  return `${birthDateFormatted}${calculateControlNumber(birthDateFormatted)}${state.sex}${expirationDateFormatted}${calculateControlNumber(expirationDateFormatted)}${state.nationality}<<<<<<<<<<<${mrzLastCheckDigit.value}`;
});

const mrzLine3 = computed(() => {
  const nameGTs = '<'.repeat(28 - (state.surname.length + state.name.length));

  const normalizedSurname = state.surname.toUpperCase().normalize('NFKD').replace(/[^\w]/g, '');
  const normalizedName = state.name.toUpperCase().normalize('NFKD').replace(/[^\w]/g, '');

  return `${normalizedSurname}<<${normalizedName}${nameGTs}`;
});

const downloadFront = () => {
  const createEl = document.createElement('a');
  createEl.href = canvasFront.value?.toDataURL();

  // This is the name of our downloaded file
  createEl.download = "id_front";

  // Click the download button, causing a download, and then remove it
  createEl.click();
  createEl.remove();
};

const downloadBack = () => {
  const createEl = document.createElement('a');
  createEl.href = canvasBack.value?.toDataURL();

  // This is the name of our downloaded file
  createEl.download = "id_back";

  // Click the download button, causing a download, and then remove it
  createEl.click();
  createEl.remove();
};

const drawFront = () => {
  if (!contextFront.value) return;

  contextFront.value.clearRect(0, 0, 1080, 700);
  contextFront.value.drawImage(imageFront.value, 0,0, 1080, 700, 0,0, 1080, 700);
  
  if (state.canvas) {
    contextFront.value.filter = 'grayscale(1)';
    contextFront.value.drawImage(state.canvas, 0,0, state.canvas.width, state.canvas.height, 46, 178, 378, 472); // 165 / 147
    contextFront.value.filter = 'none';
  }

  contextFront.value.font = "400 32px sans-serif";
  contextFront.value.fillText(state.surname, 454, 190);

  contextFront.value.fillText(state.name, 454, 250);

  contextFront.value.fillText(state.birthDate, 454, 310);

  contextFront.value.fillText(state.nationality, 454, 370);

  contextFront.value.fillText(state.idNumber, 454, 430);

  contextFront.value.fillText(state.issuer, 454, 510);

  contextFront.value.fillText(state.sex, 766, 310);

  contextFront.value.fillText(state.birthNumber, 766, 370);

  contextFront.value.fillText(state.issueDate, 766, 430);

  contextFront.value.fillText(state.expirationDate, 766, 510);
}

const drawBack = () => {
  if (!contextBack.value) return;

  contextBack.value.clearRect(0, 0, 1080, 700);
  contextBack.value.drawImage(imageBack.value, 0,0, 1080, 700, 0,0, 1080, 700);

  // if (state.canvas) {
  //   contextBack.value.filter = 'grayscale(1)';
  //   contextBack.value.drawImage(state.canvas, 0,0, state.canvas.width, state.canvas.height, 70, 30, 40, 60); // 165 / 147
  //   contextBack.value.filter = 'none';
  // }

  contextBack.value.font = "400 26px OCR B";
  contextBack.value.letterSpacing = "0px";

  const birthDateParts = state.birthDate.split('.');
  if (birthDateParts[2]) {
    const birthDateFormatted = `${birthDateParts[0]}${birthDateParts[1]}${birthDateParts[2].substring(2)}`;
    contextBack.value.fillText(birthDateFormatted, 147, 184);
  }

  contextBack.value.font = "400 24px sans-serif";

  contextBack.value.fillText(state.addressLine1, 490, 86);
  contextBack.value.fillText(state.addressLine2, 490, 116);

  contextBack.value.fillText(state.birthSurname, 490, 176);

  contextBack.value.fillText(state.birthPlace, 490, 230);

  contextBack.value.font = "400 44px OCR B";
  contextBack.value.letterSpacing = "6px";
  contextBack.value.fillText(mrzLine1.value, 60, 500);

  contextBack.value.fillText(mrzLine2.value, 60, 560);

  contextBack.value.fillText(mrzLine3.value, 60, 620);
}

const calculateControlNumber = (value: string) : number => {
  const pattern = [7, 3, 1];

  const sum = value.split('').reduce((acc, item, index) => {
    if (item === '<') return acc;

    const numericaValue = parseInt(item);
    if (!isNaN(numericaValue)) {
      acc += numericaValue * pattern[index % 3];
    } else {
      acc += (item.charCodeAt(0) - 55) * pattern[index % 3];
    }

    return acc;
  }, 0)

  return sum % 10;
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
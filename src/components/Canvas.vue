<template>
  <h2>Canvas</h2>
  <canvas id="canvas" width="540" height="350" />
  <button class="button" @click="handleClick">Download 2</button>
  {{ state.surname }}
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import idFront from '../assets/id_front.jpg';
import { state } from '../store.ts';

let canvas = ref();
let context = ref<CanvasRenderingContext2D>();

const handleClick = () => {
  const createEl = document.createElement('a');
  createEl.href = canvas.value?.toDataURL();

  // This is the name of our downloaded file
  createEl.download = "download-this-canvas";

  // Click the download button, causing a download, and then remove it
  createEl.click();
  createEl.remove();
};

const draw = () => {
  context?.drawImage(img, 0,0, img.width, img.height, 0,0,img.width/2, img.height/2);

  context.font = "400 16px sans-serif";
  context.fillText("Priezvisko", 226, 95);

  context.fillText("Meno", 226, 125);

  context.fillText("Datum narodenia", 226, 155);

  context.fillText("Obcianstvo", 226, 185);

  context.fillText("Cislo preukazu", 226, 215);

  context.fillText("Vydal", 226, 255);
}

onMounted(() => {
  canvas.value = document.getElementById('canvas') as HTMLCanvasElement;
  context.value = canvas.value.getContext('2d') as CanvasRenderingContext2D;

  const img = new Image();

  img.addEventListener('load', () => {
    ctx?.drawImage(img, 0,0, img.width, img.height, 0,0,img.width/2, img.height/2);

    ctx.font = "400 16px sans-serif";
    ctx.fillText("Priezvisko", 226, 95);

    ctx.fillText("Meno", 226, 125);

    ctx.fillText("Datum narodenia", 226, 155);

    ctx.fillText("Obcianstvo", 226, 185);

    ctx.fillText("Cislo preukazu", 226, 215);

    ctx.fillText("Vydal", 226, 255);
  });

  img.src = idFront;
});
</script>

<style scoped>
</style>
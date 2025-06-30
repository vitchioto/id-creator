<template>
  <div class="modal" :class="{'modal--show': props.show}">
    <div class="modal-background"></div>
    <div class="modal-content pt-4">
      <cropper
		    :src="image"
        :stencil-props="{
          aspectRatio: 0.89,
        }"
		    @change="change"
	    />
      <button class="button mt-2" aria-label="Hotovo" @click="confirm()">Hotovo</button>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { state } from '../store.ts';

const props = defineProps(['show', 'image']);
const emit = defineEmits(['close']);

const canvasRef = ref();

const change = ({ canvas } : { canvas: HTMLCanvasElement }) => {
  canvasRef.value = canvas;
}

const confirm = () => {
  state.canvas = canvasRef.value;
  emit('close');
}
</script>

<style scoped>
.modal--show {
  display: block;
}
</style>
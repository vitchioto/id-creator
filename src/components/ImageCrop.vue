<template>
  <div class="modal" :class="{'modal--show': props.show}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <cropper
		    :src="image"
        :stencil-props="{
          aspectRatio: 0.89,
        }"
		    @change="change"
	    />
    </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
  </div>
</template>

<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { state } from '../store.ts';

const props = defineProps(['show', 'image']);
defineEmits(['close'])

const change = ({ canvas } : { canvas: HTMLCanvasElement }) => {
  state.canvas = canvas;
}
</script>

<style scoped>
.modal--show {
  display: block;
}
</style>
<template>
  <BaseEdge
    :id="id"
    :path="path"
    :style="style"
    @contextmenu.prevent="onContextMenu"
  />
</template>

<script setup>
import { BaseEdge } from '@vue-flow/core'

const props = defineProps({
  id: { type: String, required: true },
  path: { type: String, required: true },
})

const emit = defineEmits(['contextmenu'])

const style = {
  stroke: '#888',
  strokeWidth: 2,
  cursor: 'pointer'
}

const onContextMenu = (event) => {
  emit('contextmenu', event)
}
</script>

<style scoped>
path:hover {
  stroke: #2196F3;
  stroke-width: 3;
}
</style>
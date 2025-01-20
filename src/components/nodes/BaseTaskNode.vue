<template>
  <div class="task-node" :class="[`task-type-${type}`, { selected }]">
    <div class="task-header">
      <span class="task-icon" v-if="icon">{{ icon }}</span>
      <input 
        v-model="nodeData.label" 
        class="header-input"
        @change="updateNode"
      />
    </div>
    <div class="task-body">
      <slot></slot>
    </div>
    <div class="task-handles">
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Handle } from '@vue-flow/core'
import { useStore } from '../../stores/workflow'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  }
})

const store = useStore()
const nodeData = ref({
  label: '',
  type: props.type
})

const updateNode = () => {
  store.updateNode(props.id, nodeData.value)
}

onMounted(() => {
  const node = store.getNode(props.id)
  if (node) {
    nodeData.value = { ...node.data }
  }
})
</script>

<style scoped>
.task-node {
  background: #fff;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  min-width: 200px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.task-header {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  margin-bottom: 8px;
}

.task-icon {
  font-size: 16px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-input {
  border: none;
  font-weight: 500;
  width: 100%;
  background: transparent;
}

.header-input:focus {
  outline: none;
  border-bottom: 1px dashed #666;
}

.task-body {
  font-size: 0.9em;
}

.task-node.selected {
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
}
</style>
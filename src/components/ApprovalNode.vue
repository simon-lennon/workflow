<template>
  <div class="approval-node" :class="{ selected }">
    <div class="approval-header">
      <span class="approval-icon">✓</span>
      <input 
        v-model="nodeData.label" 
        class="header-input" 
        @change="updateNode"
      />
    </div>
    <div class="approval-body">
      <div class="approval-info">
        <div class="info-row">
          <span class="info-label">Approver:</span>
          <input 
            v-model="nodeData.approver" 
            class="info-input"
            placeholder="Enter approver"
            @change="updateNode"
          />
        </div>
        <div class="info-row">
          <span class="info-label">Level:</span>
          <select 
            v-model="nodeData.level" 
            class="level-select"
            @change="updateNode"
          >
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
          </select>
        </div>
      </div>
    </div>
    <div class="approval-handles">
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Handle } from '@vue-flow/core'
import { useStore } from '../stores/workflow'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

const store = useStore()
const nodeData = ref({
  label: '',
  approver: '',
  level: '1'
})

const updateNode = () => {
  store.updateNode(props.id, nodeData.value)
}

onMounted(() => {
  // Get initial node data from store
  const node = store.getNode(props.id)
  if (node) {
    nodeData.value = { ...node.data }
  }
})
</script>

<style scoped>
.approval-node {
  background: #fff;
  border: 2px solid #9c27b0;
  border-radius: 8px;
  padding: 10px;
  min-width: 200px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.approval-header {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  margin-bottom: 8px;
}

.header-input {
  border: none;
  font-weight: bold;
  color: #9c27b0;
  width: 100%;
  background: transparent;
}

.header-input:focus {
  outline: none;
  border-bottom: 1px dashed #9c27b0;
}

.approval-icon {
  background: #9c27b0;
  color: white;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  flex-shrink: 0;
}

.approval-body {
  font-size: 0.9em;
}

.approval-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  color: #666;
  flex-shrink: 0;
  margin-right: 8px;
}

.info-input, .level-select {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.9em;
  width: 120px;
}

.info-input:focus, .level-select:focus {
  outline: none;
  border-color: #9c27b0;
}

.approval-node.selected {
  border-color: #7b1fa2;
  box-shadow: 0 0 0 2px rgba(156, 39, 176, 0.3);
}
</style>
<template>
  <BaseTaskNode 
    :id="id"
    :selected="selected"
    type="approval"
    icon="✓"
  >
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
  </BaseTaskNode>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseTaskNode from './BaseTaskNode.vue'
import { useStore } from '../../stores/workflow'

const props = defineProps({
  id: { type: String, required: true },
  selected: { type: Boolean, default: false }
})

const store = useStore()
const nodeData = ref({
  approver: '',
  level: '1'
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
.task-type-approval {
  border-color: #9c27b0;
}

.task-type-approval .task-icon {
  background: #9c27b0;
  color: white;
  border-radius: 50%;
  font-size: 12px;
}

.approval-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  color: #666;
  font-size: 0.9em;
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
</style>
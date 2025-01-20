<template>
  <BaseTaskNode
    :id="id"
    type="approval"
    :selected="selected"
    :icon="approvalIcon"
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
          class="info-select"
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

const approvalIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#4CAF50" stroke-width="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l3 3 5-5" />
  </svg>
`

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
.approval-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info-label {
  font-size: 0.9em;
  color: #666;
}

.info-input, .info-select {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  width: 140px;
  font-size: 0.9em;
}

.info-input:focus, .info-select:focus {
  outline: none;
  border-color: #4CAF50;
}
</style>
<template>
  <BaseTaskNode
    :id="id"
    type="review"
    :selected="selected"
    :icon="reviewIcon"
  >
    <div class="review-info">
      <div class="info-row">
        <span class="info-label">Reviewer:</span>
        <input 
          v-model="nodeData.reviewer" 
          class="info-input"
          placeholder="Enter reviewer"
          @change="updateNode"
        />
      </div>
      <div class="info-row">
        <span class="info-label">Due Date:</span>
        <input 
          type="date"
          v-model="nodeData.dueDate"
          class="info-input"
          @change="updateNode"
        />
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
  reviewer: '',
  dueDate: ''
})

const reviewIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FF9800" stroke-width="2">
    <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
    <circle cx="12" cy="12" r="3" />
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
.review-info {
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

.info-input {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  width: 140px;
  font-size: 0.9em;
}

.info-input:focus {
  outline: none;
  border-color: #FF9800;
}
</style>
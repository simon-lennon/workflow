<template>
  <BaseTaskNode 
    :id="id"
    :selected="selected"
    type="review"
    icon="📋"
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
          class="date-input"
          @change="updateNode"
        />
      </div>
      <div class="info-row">
        <span class="info-label">Type:</span>
        <select 
          v-model="nodeData.reviewType" 
          class="type-select"
          @change="updateNode"
        >
          <option value="technical">Technical</option>
          <option value="functional">Functional</option>
          <option value="security">Security</option>
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
  reviewer: '',
  dueDate: '',
  reviewType: 'technical'
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
.task-type-review {
  border-color: #ff9800;
}

.task-type-review .task-icon {
  color: #ff9800;
}

.review-info {
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

.info-input, .date-input, .type-select {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.9em;
  width: 120px;
}

.info-input:focus, .date-input:focus, .type-select:focus {
  outline: none;
  border-color: #ff9800;
}
</style>
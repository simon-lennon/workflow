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
      <div class="info-row">
        <span class="info-label">Status:</span>
        <select 
          v-model="nodeData.status" 
          class="info-select"
          @change="updateNode"
        >
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div class="info-row">
        <span class="info-label">Comments:</span>
        <textarea
          v-model="nodeData.comments"
          class="info-textarea"
          placeholder="Add review comments"
          @change="updateNode"
          rows="2"
        ></textarea>
      </div>
    </div>
  </BaseTaskNode>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseTaskNode from './BaseTaskNode.vue'
import { useWorkflowStore } from '../../stores/workflow'

const props = defineProps({
  id: { type: String, required: true },
  selected: { type: Boolean, default: false }
})

const store = useWorkflowStore()
const nodeData = ref({
  reviewer: '',
  dueDate: '',
  status: 'pending',
  comments: ''
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
    nodeData.value = { 
      ...nodeData.value, 
      ...node.data,
      status: node.data.status || 'pending',
      comments: node.data.comments || ''
    }
  }
})
</script>

<style scoped>
.review-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 0.9em;
  color: #666;
  font-weight: 500;
}

.info-input,
.info-select {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 8px;
  width: 100%;
  font-size: 0.9em;
  background-color: white;
}

.info-textarea {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 8px;
  width: 100%;
  font-size: 0.9em;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
}

.info-input:focus,
.info-select:focus,
.info-textarea:focus {
  outline: none;
  border-color: #FF9800;
  box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.1);
}

.info-select {
  cursor: pointer;
}

select.info-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  padding-right: 32px;
}
</style>
<template>
  <BaseTaskNode
    :id="id"
    type="todo"
    :selected="selected"
    :icon="todoIcon"
  >
    <div class="todo-info">
      <div class="info-row">
        <span class="info-label">Assignee:</span>
        <input 
          v-model="nodeData.assignee" 
          class="info-input"
          placeholder="Enter assignee"
          @change="updateNode"
        />
      </div>
      <div class="info-row">
        <span class="info-label">Priority:</span>
        <select 
          v-model="nodeData.priority" 
          class="info-select"
          @change="updateNode"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
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
import { useWorkflowStore } from '@/stores/workflow'

const props = defineProps({
  id: { type: String, required: true },
  selected: { type: Boolean, default: false }
})

const store = useWorkflowStore()
const nodeData = ref({
  assignee: '',
  priority: 'medium',
  dueDate: ''
})

const todoIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#F44336" stroke-width="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
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
.todo-info {
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
  border-color: #F44336;
}

.info-select {
  background-color: white;
}
</style>